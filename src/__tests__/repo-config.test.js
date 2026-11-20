// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Regressão das proteções do CI e do repositório: escrita só no job que publica,
// actions fixadas por SHA, Yarn conferido pelo hash, --check-cache e .gitignore
const RAIZ = fileURLToPath(new URL('../../', import.meta.url));
const ler = (caminho) => readFileSync(`${RAIZ}${caminho}`, 'utf8').replace(/\r\n/g, '\n');

// Tira os comentários, para um texto explicativo não contar como configuração
const semComentarios = (texto) =>
  texto
    .split('\n')
    .map((linha) => linha.replace(/(^|\s)#.*$/, ''))
    .join('\n');

const workflow = ler('.github/workflows/deploy.yml');
const [topo, jobsTexto] = semComentarios(workflow).split(/^jobs:[ \t]*$/m);
// Cada job começa numa linha com dois espaços de recuo, o nome e dois-pontos
const jobs = Object.fromEntries(
  jobsTexto
    .split(/^(?= {2}[\w-]+:[ \t]*$)/m)
    .filter((bloco) => /^ {2}[\w-]+:/.test(bloco))
    .map((bloco) => [bloco.match(/^ {2}([\w-]+):/)[1], bloco]),
);

describe('workflow de deploy', () => {
  it('fixa cada action pelo SHA do commit, com a versão em comentário', () => {
    const usos = workflow.match(/^\s*(?:-\s+)?uses:.*$/gm) ?? [];

    expect(usos).not.toHaveLength(0);
    expect(usos.filter((uso) => !/uses: [\w.-]+\/[\w.-]+@[0-9a-f]{40} # v\d+\.\d+\.\d+$/.test(uso))).toEqual([]);
  });

  it('dá escrita só ao job deploy, e o build não guarda o token', () => {
    expect(topo).toMatch(/^permissions:\n {2}contents: read\n(?! {2}\S)/m);
    expect(Object.keys(jobs).filter((nome) => /:\s*write\b/.test(jobs[nome]))).toEqual(['deploy']);
    expect(jobs.deploy).toMatch(/^ {4}permissions:\n {6}pages: write\n {6}id-token: write\n(?! {6}\S)/m);
    expect(jobs.build).toMatch(/^ {4}permissions:\n {6}contents: read\n {6}pages: read\n(?! {6}\S)/m);
    expect(jobs.build).toMatch(/^ {10}persist-credentials: false$/m);
  });

  it('confere o Yarn pelo hash e o .yarn/cache pelo registro', () => {
    const { packageManager } = JSON.parse(ler('package.json'));

    expect(packageManager).toMatch(/^yarn@\d+\.\d+\.\d+\+sha512\.[0-9a-f]{128}$/);
    // Com a versão na linha de comando (corepack yarn@x.y.z), o Corepack não confere o hash
    expect(Object.values(jobs).join('')).not.toMatch(/corepack\s+yarn@/);
    expect(jobs.build).toMatch(/^ {8}run: corepack yarn install --immutable --check-cache$/m);
  });
});

// O core.excludesFile vazio desliga o gitignore global de quem roda o teste
const git = (cwd, args, input) =>
  spawnSync('git', ['-c', 'core.excludesFile=', ...args], { cwd, input, encoding: 'utf8', timeout: 10000 });

// Sem git, ou fora de um repositório, o teste do .gitignore é pulado
const GIT = git(RAIZ, ['rev-parse', '--is-inside-work-tree']).stdout?.trim() === 'true';

describe.skipIf(!GIT)('.gitignore', () => {
  // Repositório vazio, sem template, só com o .gitignore do projeto: assim o
  // .git/info/exclude e o gitignore global de cada máquina não entram na conta
  let pasta;

  beforeAll(() => {
    pasta = mkdtempSync(join(tmpdir(), 'gitignore-'));
    git(pasta, ['init', '-q', '--template=']);
    copyFileSync(join(RAIZ, '.gitignore'), join(pasta, '.gitignore'));
  });

  afterAll(() => {
    if (pasta) rmSync(pasta, { recursive: true, force: true });
  });

  // Dos caminhos dados, devolve os que o .gitignore ignora (--no-index: só as regras)
  const ignorados = (caminhos) => {
    const r = git(pasta, ['check-ignore', '--no-index', '--stdin', '-z'], caminhos.join('\0'));
    if (r.status !== 0 && r.status !== 1) throw new Error(`git check-ignore falhou: ${r.stderr}`);
    return r.stdout.split('\0').filter(Boolean);
  };

  it('ignora os arquivos de ambiente, o estado da instalação e a pasta .vscode, e nenhum arquivo rastreado', () => {
    expect(
      ignorados([
        '.env',
        '.env.production',
        '.env.local',
        '.env.example',
        '.yarn/install-state.gz',
        '.vscode/extensions.json',
      ]),
    ).toEqual(['.env', '.env.production', '.env.local', '.yarn/install-state.gz', '.vscode/extensions.json']);

    const rastreados = git(RAIZ, ['ls-files', '-z']).stdout.split('\0').filter(Boolean);
    expect(rastreados).not.toHaveLength(0);
    expect(ignorados(rastreados)).toEqual([]);
  });
});

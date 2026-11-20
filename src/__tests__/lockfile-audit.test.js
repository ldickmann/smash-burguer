// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Regressão do .claude/lockfile-audit.py: um advisory devolvido pelo npm não pode sumir
// do relatório por causa do formato da faixa de versões.
const SCRIPT = fileURLToPath(new URL('../../.claude/lockfile-audit.py', import.meta.url));

// O `py -3` vem antes para, no Windows, não cair no atalho da Microsoft Store.
// Sem Python 3, os testes são pulados.
const PYTHON = [['py', '-3'], ['python3'], ['python']].find(([comando, ...args]) => {
  const r = spawnSync(comando, [...args, '--version'], { encoding: 'utf8', timeout: 10000 });
  return r.status === 0 && /^Python 3\./.test(r.stdout);
});

// Carrega o script como módulo e troca a consulta ao registro do npm por uma resposta fixa
const DRIVER = `
import contextlib, importlib.util, io, json, sys

pedido = json.load(sys.stdin)
spec = importlib.util.spec_from_file_location('lockfile_audit', pedido['script'])
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

if pedido['acao'] == 'satisfaz':
    resultados = []
    for v, faixa in pedido['pares']:
        try:
            resultados.append(audit.satisfaz(v, faixa))
        except ValueError:
            resultados.append('erro')
    print(json.dumps(resultados))
else:
    enviado = {}

    def urlopen(requisicao, timeout=None):
        enviado.update(json.loads(requisicao.data))
        return io.BytesIO(json.dumps(pedido['resposta']).encode())

    audit.urllib.request.urlopen = urlopen
    sys.argv = [pedido['script'], pedido['lockfile']]
    saida = io.StringIO()
    with contextlib.redirect_stdout(saida):
        codigo = audit.main()
    print(json.dumps({'codigo': codigo, 'saida': saida.getvalue(), 'enviado': enviado}))
`;

const LOCKFILE = `__metadata:
  version: 6
  cacheKey: 8

"alfa@npm:^1.0.0":
  version: 1.1.0
  resolution: "alfa@npm:1.1.0"
  languageName: node
  linkType: hard

"app@workspace:.":
  version: 0.0.0-use.local
  resolution: "app@workspace:."
  dependencies:
    alfa: ^1.0.0
    beta: ^2.0.0-beta.1
  languageName: unknown
  linkType: soft

"beta@npm:^2.0.0-beta.1":
  version: 2.0.0-beta.1
  resolution: "beta@npm:2.0.0-beta.1"
  languageName: node
  linkType: hard
`;

const advisory = (severity, faixa, id) => ({
  severity,
  vulnerable_versions: faixa,
  url: `https://github.com/advisories/${id}`,
});

describe.skipIf(!PYTHON)('lockfile-audit.py', () => {
  let pasta;

  // -I isola o interpretador e -B evita gravar .claude/__pycache__
  const rodar = (pedido) => {
    const [comando, ...args] = PYTHON;
    const r = spawnSync(comando, [...args, '-I', '-B', '-X', 'utf8', join(pasta, 'driver.py')], {
      input: JSON.stringify({ script: SCRIPT, ...pedido }),
      encoding: 'utf8',
      timeout: 10000,
    });
    if (r.status !== 0) throw new Error(r.error?.message || r.stderr);
    return JSON.parse(r.stdout);
  };
  const satisfaz = (pares) => rodar({ acao: 'satisfaz', pares });
  const auditar = (resposta) => rodar({ acao: 'main', lockfile: join(pasta, 'yarn.lock'), resposta });

  beforeAll(() => {
    pasta = mkdtempSync(join(tmpdir(), 'lockfile-audit-'));
    writeFileSync(join(pasta, 'driver.py'), DRIVER);
    writeFileSync(join(pasta, 'yarn.lock'), LOCKFILE);
  });

  afterAll(() => {
    if (pasta) rmSync(pasta, { recursive: true, force: true });
  });

  it('aceita espaço depois do operador', () => {
    expect(
      satisfaz([
        ['1.1.0', '>=1.0.0 <1.2.3'],
        ['1.1.0', '>= 1.0.0 < 1.2.3'],
        ['1.2.3', '>= 1.0.0 < 1.2.3'],
      ]),
    ).toEqual([true, true, false]);
  });

  // A precedência é a da especificação do semver; como no `npm audit` (includePrerelease),
  // os pré-lançamentos entram nas faixas
  it('ordena pré-lançamentos pela precedência do semver e os inclui nas faixas', () => {
    expect(
      satisfaz([
        ['2.0.0-beta.1', '<2.0.0-beta.3'],
        ['2.0.0-beta.3', '<2.0.0-beta.3'],
        ['1.0.0-beta.11', '>1.0.0-beta.2'],
        ['1.0.0-rc.1', '<1.0.0'],
      ]),
    ).toEqual([true, false, true, true]);
  });

  it('aceita curingas, versões parciais, versão exata e alternativas com ||', () => {
    expect(
      satisfaz([
        ['1.2.5', '1.2.x'],
        ['1.3.0', '1.2.x'],
        ['1.5.0', '<2'],
        ['2.0.0-beta.1', '<2'],
        ['1.2.9', '<=1.2'],
        ['1.2.9', '>1.2'],
        ['6.4.4', '=6.4.4'],
        ['6.4.5', '=6.4.4'],
        ['3.1.3', '>=9.0.0 <9.0.7 || <3.1.4'],
        ['3.1.4', '>=9.0.0 <9.0.7 || <3.1.4'],
      ]),
    ).toEqual([true, false, true, false, true, false, true, false, true, false]);
  });

  it('só levanta erro quando a resposta depende de um formato desconhecido', () => {
    expect(
      satisfaz([
        ['1.2.3', '^1.2.0'],
        ['1.2.3', '~1.2.0'],
        ['1.2.3', '1.0.0 - 2.0.0'],
        ['1.1.0', '>=1.0.0 <1.2.3 || ^2.0.0'],
        ['2.1.0', '>=1.0.0 <1.2.3 || ^2.0.0'],
      ]),
    ).toEqual(['erro', 'erro', 'erro', true, 'erro']);
  });

  it('relata o advisory que não casa com nenhuma versão do lockfile e sai com 1', () => {
    const { codigo, saida, enviado } = auditar({
      alfa: [
        advisory('high', '>= 1.0.0 < 1.2.3', 'GHSA-teste-0001'),
        advisory('moderate', '<1.0.0', 'GHSA-teste-0002'),
        advisory('moderate', '^1.1.0', 'GHSA-teste-0003'),
        advisory('high', '>=1.0.0 <1.2.3 || ^2.0.0', 'GHSA-teste-0005'),
      ],
      beta: [advisory('low', '<2.0.0-beta.3', 'GHSA-teste-0004')],
    });

    expect(enviado).toEqual({ alfa: ['1.1.0'], beta: ['2.0.0-beta.1'] });
    expect(codigo).toBe(1);
    expect(saida).toContain('5 advisories: 2 high, 2 moderate, 1 low');
    expect(saida).toContain('[high] alfa@1.1.0 (vulnerável: >= 1.0.0 < 1.2.3) GHSA-teste-0001\n    via package.json');
    // a alternativa desconhecida não esconde a versão que casou com a outra
    expect(saida).toContain(
      '[high] alfa@1.1.0 (vulnerável: >=1.0.0 <1.2.3 || ^2.0.0) GHSA-teste-0005\n    via package.json',
    );
    expect(saida).not.toContain('alfa (versão não identificada; vulnerável: >=1.0.0 <1.2.3 || ^2.0.0)');
    expect(saida).toContain(
      '[moderate] alfa (versão não identificada; vulnerável: <1.0.0) GHSA-teste-0002\n    versões no lockfile: 1.1.0',
    );
    expect(saida).toContain('[moderate] alfa (versão não identificada; vulnerável: ^1.1.0) GHSA-teste-0003');
    expect(saida).toContain('[low] beta@2.0.0-beta.1 (vulnerável: <2.0.0-beta.3) GHSA-teste-0004\n    via package.json');
  });

  it('sai com 0 quando o servidor não devolve advisory', () => {
    const { codigo, saida } = auditar({});

    expect(codigo).toBe(0);
    expect(saida).toContain('Nenhuma versão vulnerável.');
  });
});

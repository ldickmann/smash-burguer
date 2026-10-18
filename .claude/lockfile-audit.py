#!/usr/bin/env python3
"""Confere cada versão do yarn.lock na base de advisories do npm, como o Dependabot faz.

O `yarn npm audit --all --recursive` do Yarn 3 deixa passar alguns caminhos (em out/2026,
o `minimatch` 9.0.1 fixado pelo `editorconfig` 1.0.4). Este script lê o lockfile inteiro.

Uso: python3 -I .claude/lockfile-audit.py [caminho/do/yarn.lock]
Sai com código 1 se encontrar alguma versão vulnerável.
"""
import collections
import json
import re
import sys
import urllib.request
from pathlib import Path

ADVISORIES_URL = 'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk'
SEVERIDADES = ['critical', 'high', 'moderate', 'low', 'info']


def ler_lockfile(caminho):
    """Devolve as entradas do lockfile e o mapa descritor -> (nome, versão)."""
    entradas, atual, bloco = [], None, None
    for linha in caminho.read_text(encoding='utf-8').splitlines():
        if linha and not linha.startswith(' ') and linha.endswith(':') and '@' in linha:
            descritores = [d.strip() for d in linha[:-1].strip('"').split(',')]
            atual = {'descritores': descritores, 'deps': {}}
            entradas.append(atual)
            bloco = None
        elif atual is not None and linha.startswith('  ') and not linha.startswith('    '):
            chave, _, valor = linha.strip().partition(':')
            bloco = chave
            if chave in ('version', 'resolution'):
                atual[chave] = valor.strip().strip('"')
        elif atual is not None and bloco == 'dependencies' and linha.startswith('    '):
            nome, _, faixa = linha.strip().rpartition(': ')
            atual['deps'][nome.strip('"')] = faixa.strip('"')
    por_descritor = {}
    for e in entradas:
        e['nome'] = re.match(r'^(@?[^@]+)@', e['resolution']).group(1)
        for d in e['descritores']:
            por_descritor[d] = (e['nome'], e['version'])
    return entradas, por_descritor


def versao(v):
    numeros = [int(x) for x in re.findall(r'\d+', v.split('-')[0])[:3]]
    return tuple(numeros + [0] * (3 - len(numeros))) + ((0,) if '-' in v else (1,))


def satisfaz(v, faixa):
    """Checa faixas no formato dos advisories do npm (ex.: '>=9.0.0 <9.0.7 || <3.1.4')."""
    for alternativa in faixa.split('||'):
        condicoes = alternativa.split() or ['*']
        ok = True
        for cond in condicoes:
            if cond == '*':
                continue
            op, alvo = re.match(r'(>=|<=|>|<|=)?(.+)', cond).groups()
            a, b = versao(v), versao(alvo)
            ok &= {'>=': a >= b, '<=': a <= b, '>': a > b, '<': a < b}.get(op, a[:3] == b[:3])
        if ok:
            return True
    return False


def main():
    caminho = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / 'yarn.lock'
    entradas, por_descritor = ler_lockfile(caminho)

    versoes = collections.defaultdict(set)
    for e in entradas:
        if '@npm:' in e['resolution']:
            versoes[e['nome']].add(e['version'])

    pais = collections.defaultdict(set)
    for e in entradas:
        pai = 'package.json' if '@workspace:' in e['resolution'] else f"{e['nome']}@{e['version']}"
        for nome, faixa in e['deps'].items():
            # as entradas virtuais (pacotes com peers) listam as faixas sem o prefixo npm:
            filho = por_descritor.get(f'{nome}@{faixa}') or por_descritor.get(f'{nome}@npm:{faixa}')
            if not filho and len(versoes[nome]) == 1:
                # uma resolution do package.json reescreveu o descritor
                filho = (nome, next(iter(versoes[nome])))
            if filho:
                pais[filho].add(pai)

    pedido = urllib.request.Request(
        ADVISORIES_URL,
        data=json.dumps({k: sorted(v) for k, v in versoes.items()}).encode(),
        headers={'content-type': 'application/json'},
    )
    resposta = json.load(urllib.request.urlopen(pedido, timeout=60))

    achados = []
    for nome, advisories in resposta.items():
        for a in advisories:
            for v in sorted(versoes[nome]):
                if satisfaz(v, a['vulnerable_versions']):
                    achados.append((a['severity'], nome, v, a['vulnerable_versions'], a['url'].rsplit('/', 1)[-1]))
    achados.sort(key=lambda x: (SEVERIDADES.index(x[0]) if x[0] in SEVERIDADES else 9, x[1], x[2]))

    print(f'{len(versoes)} pacotes e {sum(map(len, versoes.values()))} versões em {caminho.name}')
    if not achados:
        print('Nenhuma versão vulnerável.')
        return 0
    contagem = collections.Counter(a[0] for a in achados)
    print(f'{len(achados)} advisories: ' + ', '.join(f'{contagem[s]} {s}' for s in SEVERIDADES if contagem[s]))
    for sev, nome, v, faixa, ghsa in achados:
        via = ', '.join(sorted(pais[(nome, v)])) or '?'
        print(f'[{sev}] {nome}@{v} (vulnerável: {faixa}) {ghsa}\n    via {via}')
    return 1


if __name__ == '__main__':
    sys.exit(main())

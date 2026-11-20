#!/usr/bin/env python3
"""Confere cada versão do yarn.lock na base de advisories do npm, como o Dependabot faz.

O `yarn npm audit --all --recursive` do Yarn 3 deixa passar alguns caminhos (em out/2026,
o `minimatch` 9.0.1 fixado pelo `editorconfig` 1.0.4). Este script lê o lockfile inteiro.

Uso: python3 -I .claude/lockfile-audit.py [caminho/do/yarn.lock]
Sai com código 1 se encontrar alguma versão vulnerável. O servidor só devolve advisories que
afetam alguma das versões enviadas: se a faixa de um deles não casar com nenhuma versão do
lockfile, ou vier num formato que o script não entende, ele entra no relatório assim mesmo,
com a marca "versão não identificada", para ser conferido à mão.
"""
import collections
import itertools
import json
import re
import sys
import urllib.request
from pathlib import Path

ADVISORIES_URL = 'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk'
SEVERIDADES = ['critical', 'high', 'moderate', 'low', 'info']
COMPARADOR = re.compile(
    r'(>=|<=|>|<|=)?v?(\d+|[xX*])(?:\.(\d+|[xX*]))?(?:\.(\d+|[xX*]))?(-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?'
)
OPERACOES = {
    '>=': lambda a, b: a >= b,
    '<=': lambda a, b: a <= b,
    '>': lambda a, b: a > b,
    '<': lambda a, b: a < b,
    '=': lambda a, b: a == b,
}


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
    """Chave de ordenação do semver: 1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0."""
    nucleo, _, pre = v.split('+')[0].partition('-')
    numeros = [int(x) for x in re.findall(r'\d+', nucleo)[:3]]
    numeros += [0] * (3 - len(numeros))
    if not pre:
        return (*numeros, 1, ())
    return (*numeros, 0, tuple((0, int(p), '') if p.isdigit() else (1, 0, p) for p in pre.split('.')))


def comparador(cond):
    """Converte um comparador ('>=1.2.3', '<2.0.0-beta.3', '=6.4.4', '1.2.x', '*') num teste da chave da versão."""
    m = COMPARADOR.fullmatch(cond)
    if not m:
        raise ValueError(f'comparador não reconhecido: {cond!r}')
    op, *partes, pre = m.groups()
    numeros = list(itertools.takewhile(str.isdigit, (p or 'x' for p in partes)))
    if len(numeros) == 3:
        alvo = versao('.'.join(numeros) + (pre or ''))
        return lambda chave: OPERACOES[op or '='](chave, alvo)
    if op not in (None, '=') or pre:
        # '>=1.2', '<1.x' e afins têm regras próprias no semver; melhor avisar do que adivinhar
        raise ValueError(f'comparador não reconhecido: {cond!r}')
    prefixo = tuple(map(int, numeros))
    return lambda chave: chave[:len(prefixo)] == prefixo


def satisfaz(v, faixa):
    """Checa faixas no formato dos advisories do npm (ex.: '>=9.0.0 <9.0.7 || <3.1.4').

    Aceita espaço depois do operador ('>= 1.0.0'), pré-lançamentos e curingas sem operador
    ('1.2.x'). Uma faixa fora desse formato levanta ValueError, em vez de virar False.
    """
    alternativas = [
        [comparador(c) for c in re.sub(r'(>=|<=|>|<|=)\s+', r'\1', alternativa).split()]
        for alternativa in faixa.split('||')
    ]
    chave = versao(v)
    return any(all(teste(chave) for teste in testes) for testes in alternativas)


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
        locais = sorted(versoes.get(nome, ()))
        for a in advisories:
            try:
                afetadas = [v for v in locais if satisfaz(v, a['vulnerable_versions'])]
            except ValueError:
                afetadas = []
            # o servidor só devolve advisories que afetam alguma versão enviada: se a conferência
            # local não casar nenhuma, o advisory entra assim mesmo, sem a versão
            for v in afetadas or [None]:
                achados.append((a['severity'], nome, v, a['vulnerable_versions'], a['url'].rsplit('/', 1)[-1]))
    achados.sort(key=lambda x: (SEVERIDADES.index(x[0]) if x[0] in SEVERIDADES else 9, x[1], x[2] or ''))

    print(f'{len(versoes)} pacotes e {sum(map(len, versoes.values()))} versões em {caminho.name}')
    if not achados:
        print('Nenhuma versão vulnerável.')
        return 0
    contagem = collections.Counter(a[0] for a in achados)
    print(f'{len(achados)} advisories: ' + ', '.join(f'{contagem[s]} {s}' for s in SEVERIDADES if contagem[s]))
    for sev, nome, v, faixa, ghsa in achados:
        if v is None:
            no_lockfile = ', '.join(sorted(versoes.get(nome, ()))) or 'nenhuma'
            print(f'[{sev}] {nome} (versão não identificada; vulnerável: {faixa}) {ghsa}\n    versões no lockfile: {no_lockfile}')
        else:
            via = ', '.join(sorted(pais[(nome, v)])) or '?'
            print(f'[{sev}] {nome}@{v} (vulnerável: {faixa}) {ghsa}\n    via {via}')
    return 1


if __name__ == '__main__':
    sys.exit(main())

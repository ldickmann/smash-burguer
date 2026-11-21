// Lógica das pilhas: quem é desenhável, as camadas no eixo comum e o que vai para a bandeja.
import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useProductsStore } from '@/stores/products';
import productsData from '@/json/products.json';
import { CAMADAS, EXTRA_CAMADA, FORMAS, camadasDe, formaDoExtra, linhasDe, temPilha, useFileira } from '../usePilha';

const foods = productsData.menuItems.foods;
const porId = (id) => foods.find((p) => p.id === id);

describe('usePilha', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('temPilha aceita os hambúrgueres 1 a 6 e recusa a Batata Frita', () => {
    expect(foods.filter(temPilha).map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(temPilha(porId(7))).toBe(false);
    expect(temPilha({ ingredients: [] })).toBe(false);
    expect(temPilha(null)).toBe(false);
  });

  it('camadasDe dá a linha (a) e a posição (b), sem repetidos e com o pão de cima', () => {
    const linhas = linhasDe(foods.filter(temPilha)).map((l) => l.chave);
    const camadas = camadasDe({ ...porId(1), ingredients: [...porId(1).ingredients, 'Queijo'] }, linhas);
    expect(camadas.map((c) => c.forma)).toEqual([
      'pao-base',
      'molho',
      'carne',
      'queijo',
      'bacon',
      'tomate',
      'alface',
      'pao-topo',
    ]);
    expect(camadas.map((c) => c.b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    expect(camadas.map((c) => c.a)).toEqual(['pao-base', 'maionese', 'hamburguer', 'queijo', 'bacon', 'tomate', 'alface', 'pao-topo'].map((l) => linhas.indexOf(l)));
    expect(new Set(camadas.map((c) => c.chave)).size).toBe(camadas.length);
    // Na pilha junta, cada camada sobe sobre a de baixo
    expect(camadas[0].j).toBe(0);
    for (let i = 1; i < camadas.length; i++) expect(camadas[i].j).toBeGreaterThan(camadas[i - 1].j);
  });

  it('linhas é a união ordenada, de baixo para cima, com o rótulo real ou o agrupado', () => {
    const linhas = linhasDe(foods.filter(temPilha));
    expect(linhas.map((l) => l.chave)).toEqual([
      'pao-base',
      'maionese',
      'hamburguer',
      'queijo',
      'bacon',
      'cebola',
      'pepino',
      'pickles',
      'tomate',
      'alface',
      'ketchup',
      'pao-topo',
    ]);
    const rotulo = Object.fromEntries(linhas.map((l) => [l.chave, l.rotulo]));
    expect(rotulo.hamburguer).toBe('Hambúrguer');
    expect(rotulo.cebola).toBe('Cebola');
    expect(rotulo.pepino).toBe('Pepino');
    expect(rotulo['pao-topo']).toBe('Pão de hambúrguer');
  });

  it('uma linha sem nenhum lanche sai do eixo', () => {
    const linhas = linhasDe([porId(1), porId(3)]).map((l) => l.chave);
    expect(linhas).not.toContain('ketchup');
    expect(linhas).not.toContain('cebola');
  });

  it('useFileira traz os seis lanches e a Batata Frita em foraDaPilha', () => {
    const { lanches, foraDaPilha, mostrarEixo } = useFileira();
    expect(lanches.value.map((l) => l.produto.id)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(foraDaPilha.value.map((p) => p.name)).toEqual(['Batata Frita']);
    expect(mostrarEixo.value).toBe(true);
  });

  it('um ingrediente desconhecido move o lanche para foraDaPilha', () => {
    const produtos = useProductsStore();
    const { lanches, foraDaPilha } = useFileira();
    produtos.foods[1].ingredients.push('Molho especial');
    expect(lanches.value.map((l) => l.produto.id)).toEqual([1, 3, 4, 5, 6]);
    expect(foraDaPilha.value.map((p) => p.name)).toEqual(['Smash Burger', 'Batata Frita']);
  });

  it('abaixo de md, cada par usa só as linhas que um dos dois tem', () => {
    const { lanches, linhas } = useFileira();
    expect(linhas.value).toHaveLength(12);
    // Cheese Bacon e Smash Burger: 9 linhas; Veggie e X-Salada: 9; Chicken e Picanha: 10
    expect(lanches.value.map((l) => l.linhasPar)).toEqual([9, 9, 9, 9, 10, 10]);
    const [cheese, smash] = lanches.value;
    const linhaPar = (lanche, forma) => lanche.camadas.find((c) => c.forma === forma).aPar;
    // O pão de cima fecha o par; o vão do Cheese Bacon é a cebola, que só o Smash Burger tem
    expect(linhaPar(cheese, 'pao-topo')).toBe(8);
    expect(linhaPar(smash, 'pao-topo')).toBe(8);
    expect(linhaPar(cheese, 'tomate') - linhaPar(cheese, 'bacon')).toBe(2);
    expect(linhaPar(smash, 'cebola-tiras')).toBe(linhaPar(cheese, 'bacon') + 1);
    // Cada camada fica, no par, na mesma ordem e nunca acima da linha do eixo comum
    for (const lanche of lanches.value) {
      for (const camada of lanche.camadas) expect(camada.aPar).toBeLessThanOrEqual(camada.a);
      expect(new Set(lanche.camadas.map((c) => c.aPar)).size).toBe(lanche.camadas.length);
    }
  });

  it('com número ímpar de lanches, o último fica sozinho com as próprias linhas', () => {
    const produtos = useProductsStore();
    const { lanches } = useFileira();
    produtos.foods.splice(5, 1);
    const ultimo = lanches.value.at(-1);
    expect(lanches.value).toHaveLength(5);
    expect(ultimo.linhasPar).toBe(ultimo.camadas.length);
    expect(ultimo.camadas.map((c) => c.aPar)).toEqual(ultimo.camadas.map((_, i) => i));
  });

  it('mais de seis lanches tira o eixo', () => {
    const produtos = useProductsStore();
    const { mostrarEixo } = useFileira();
    produtos.foods.push({ ...porId(1), id: 99, name: 'Cheese Bacon Duplo' });
    expect(mostrarEixo.value).toBe(false);
  });

  it('todo adicional e todo ingrediente têm forma com medida, e o adicional sem mapa vira molho', () => {
    for (const camada of Object.values(CAMADAS)) expect(FORMAS[camada.forma]).toBeTruthy();
    for (const nome of Object.values(EXTRA_CAMADA)) expect(CAMADAS[nome]).toBeTruthy();
    expect(formaDoExtra('Queijo Cheddar')).toEqual({ forma: 'queijo', cor: 'cheddar' });
    expect(formaDoExtra('Cebola Caramelizada')).toEqual({ forma: 'cebola-tiras', cor: 'cebola-caramelizada' });
    expect(formaDoExtra('Molho da casa')).toEqual({ forma: 'molho', cor: 'maionese' });
  });
});

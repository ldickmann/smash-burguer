// As pilhas da fileira: os ingredientes reais de cada lanche (products.json, editável no painel)
// desenhados em camadas, alinhadas por um eixo comum de ingredientes.
// CAMADAS e EXTRA_CAMADA são cópia do LAYERS e do ADDITIONAL_LAYER de src/components/BurgerStack.vue
// (o isolamento das direções proíbe importar de @/components). As cores são sufixos dos tokens
// --3d-camada-*. `ordem` é a posição de baixo para cima; `linha` é a linha do eixo.
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { TEXTOS } from "./textos";

export const PAO = "Pão de hambúrguer";

export const CAMADAS = {
  [PAO]: { forma: "pao-base", cor: "pao", ordem: 1, linha: "pao-base" },
  Maionese: { forma: "molho", cor: "maionese", ordem: 2, linha: "maionese" },
  "Hambúrguer artesanal": { forma: "carne", cor: "carne", ordem: 3, linha: "hamburguer" },
  "Hambúrguer de picanha": { forma: "carne", cor: "carne", ordem: 3, linha: "hamburguer" },
  "Hambúrguer de frango": { forma: "frango", cor: "frango", ordem: 3, linha: "hamburguer" },
  "Hambúrguer de soja": { forma: "carne", cor: "soja", ordem: 3, linha: "hamburguer" },
  Ovo: { forma: "ovo", cor: "ovo", ordem: 3.5, linha: "ovo" },
  Queijo: { forma: "queijo", cor: "queijo", ordem: 4, linha: "queijo" },
  "Queijo Cheddar": { forma: "queijo", cor: "cheddar", ordem: 4, linha: "queijo" },
  Bacon: { forma: "bacon", cor: "bacon", ordem: 5, linha: "bacon" },
  Cebola: { forma: "cebola-aneis", cor: "cebola", ordem: 6, linha: "cebola" },
  "Cebola caramelizada": { forma: "cebola-tiras", cor: "cebola-caramelizada", ordem: 6, linha: "cebola" },
  Pepino: { forma: "picles", cor: "picles", ordem: 7, linha: "pepino" },
  // No BurgerStack, Pickles e Pepino dividem a ordem 7; aqui cada um tem a própria linha no eixo
  Pickles: { forma: "picles", cor: "picles", ordem: 7.1, linha: "pickles" },
  Tomate: { forma: "tomate", cor: "tomate", ordem: 8, linha: "tomate" },
  Alface: { forma: "alface", cor: "alface", ordem: 9, linha: "alface" },
  Ketchup: { forma: "molho", cor: "ketchup", ordem: 10, linha: "ketchup" },
};

// Medidas de cada forma, em em (acompanham o tamanho da pilha ou do objeto): `w` é a largura em %,
// `h` a altura da face (o topo) e `e` a espessura (o lado). Ficam aqui, e não no SCSS, porque a pilha
// junta soma as espessuras para encaixar cada camada sobre a de baixo.
export const FORMAS = {
  "pao-base": { w: 94, h: 0.55, e: 0.95 },
  "pao-topo": { w: 100, h: 2.15, e: 0 },
  molho: { w: 90, h: 0.4, e: 0.28 },
  carne: { w: 98, h: 0.5, e: 0.95 },
  frango: { w: 100, h: 0.55, e: 0.85 },
  queijo: { w: 106, h: 0.42, e: 0.3 },
  bacon: { w: 104, h: 0.42, e: 0.42 },
  "cebola-aneis": { w: 92, h: 0.7, e: 0 },
  "cebola-tiras": { w: 96, h: 0.42, e: 0.4 },
  picles: { w: 86, h: 0.7, e: 0 },
  tomate: { w: 96, h: 0.45, e: 0.55 },
  alface: { w: 112, h: 0.48, e: 0.42 },
  ovo: { w: 96, h: 0.7, e: 0.22 },
};

// Na pilha junta, cada camada cobre esta fração da face da camada de baixo (o encaixe)
export const ENCAIXE = 0.55;

const arredondar = (valor) => Math.round(valor * 1000) / 1000;

// A metade de cima do pão, que a pilha acrescenta quando o lanche tem pão
const PAO_TOPO = { forma: "pao-topo", cor: "pao", ordem: 99, linha: "pao-topo" };

// As linhas do eixo, de baixo para cima
export const LINHAS = [...Object.values(CAMADAS), PAO_TOPO]
  .reduce((lista, camada) => {
    if (!lista.some((linha) => linha.chave === camada.linha)) lista.push({ chave: camada.linha, ordem: camada.ordem });
    return lista;
  }, [])
  .sort((a, b) => a.ordem - b.ordem);

// Adicional do catálogo → camada (os nomes nem sempre batem com os dos ingredientes)
export const EXTRA_CAMADA = {
  Bacon: "Bacon",
  Ovo: "Ovo",
  Queijo: "Queijo",
  "Queijo Cheddar": "Queijo Cheddar",
  "Cebola Caramelizada": "Cebola caramelizada",
};

// Forma e cor de um adicional; sem camada no mapa, uma gota de molho em maionese
export const formaDoExtra = (nome) => {
  const camada = CAMADAS[EXTRA_CAMADA[nome]];
  return camada ? { forma: camada.forma, cor: camada.cor } : { forma: "molho", cor: "maionese" };
};

const unicos = (lista) => [...new Set(lista)];

/** O lanche é desenhável quando todos os ingredientes têm camada no mapa. */
export const temPilha = (produto) =>
  Array.isArray(produto?.ingredients) &&
  produto.ingredients.length > 0 &&
  produto.ingredients.every((nome) => Object.hasOwn(CAMADAS, nome));

// As camadas de um lanche, de baixo para cima, sem repetidos e com o pão de cima
function camadasBrutas(produto) {
  const nomes = unicos(produto?.ingredients ?? []).filter((nome) => Object.hasOwn(CAMADAS, nome));
  const lista = nomes.map((nome) => ({ nome, ...CAMADAS[nome] }));
  if (nomes.includes(PAO)) lista.push({ nome: PAO, ...PAO_TOPO });
  return lista.sort((a, b) => a.ordem - b.ordem);
}

/**
 * Camadas de um lanche no eixo comum: `a` é a linha (de baixo, a partir de 0); `b`, a posição
 * entre as camadas do próprio lanche (de baixo); `j`, a altura do pé da camada na pilha junta, em em
 * (a soma das espessuras de baixo, menos o encaixe sobre cada face).
 * @param {object} produto
 * @param {string[]} linhas chaves das linhas do eixo, de baixo para cima
 */
export function camadasDe(produto, linhas) {
  let j = 0;
  return camadasBrutas(produto).map((camada, b) => {
    const medida = FORMAS[camada.forma];
    const saida = {
      chave: `${camada.linha}-${camada.nome}`,
      forma: camada.forma,
      cor: camada.cor,
      a: linhas.indexOf(camada.linha),
      b,
      j: arredondar(j),
    };
    j += medida.e + medida.h * (1 - ENCAIXE);
    return saida;
  });
}

// Rótulo de uma linha: o nome real do ingrediente; se a linha junta vários, o começo comum (textos.js)
function rotuloDaLinha(chave, nomes) {
  if (nomes.length === 1) return nomes[0];
  return TEXTOS.linhas[chave] ?? nomes[0];
}

/** A união ordenada das linhas dos lanches, com o rótulo de cada uma. */
export function linhasDe(lanches) {
  const nomesPorLinha = new Map();
  for (const produto of lanches) {
    for (const camada of camadasBrutas(produto)) {
      const nomes = nomesPorLinha.get(camada.linha) ?? [];
      if (!nomes.includes(camada.nome)) nomes.push(camada.nome);
      nomesPorLinha.set(camada.linha, nomes);
    }
  }
  return LINHAS.filter((linha) => nomesPorLinha.has(linha.chave)).map((linha) => ({
    chave: linha.chave,
    rotulo: rotuloDaLinha(linha.chave, nomesPorLinha.get(linha.chave)),
  }));
}

// O eixo de rótulos só cabe com até seis lanches lado a lado
export const MAXIMO_COM_EIXO = 6;

// Abaixo de md, a grade tem duas colunas e não há eixo: cada pilha usa só as linhas do próprio par
// (as que ao menos um dos dois lanches lado a lado tem). Assim, o único vão que sobra é o de um
// ingrediente que o vizinho tem, e a pilha encolhe.
export const COLUNAS_CELULAR = 2;

const chavesDe = (lanches) => linhasDe(lanches).map((linha) => linha.chave);

/**
 * Camadas e linhas de um lanche: `a` no eixo comum e `aPar` nas linhas do par (abaixo de md), com
 * `linhasPar`, o total de linhas do par.
 * @param {object[]} lanches os lanches desenháveis, na ordem da grade
 * @param {string[]} chaves as linhas do eixo comum, de baixo para cima
 */
export function lanchesNaGrade(lanches, chaves) {
  return lanches.map((produto, indice) => {
    const inicio = indice - (indice % COLUNAS_CELULAR);
    const chavesPar = chavesDe(lanches.slice(inicio, inicio + COLUNAS_CELULAR));
    const noPar = camadasDe(produto, chavesPar);
    return {
      produto,
      camadas: camadasDe(produto, chaves).map((camada, posicao) => ({ ...camada, aPar: noPar[posicao].a })),
      linhasPar: chavesPar.length,
    };
  });
}

export function useFileira() {
  const produtos = useProductsStore();

  const comPilha = computed(() => (produtos.foods ?? []).filter(temPilha));
  const foraDaPilha = computed(() => (produtos.foods ?? []).filter((produto) => !temPilha(produto)));
  const linhas = computed(() => linhasDe(comPilha.value));
  const lanches = computed(() =>
    lanchesNaGrade(
      comPilha.value,
      linhas.value.map((linha) => linha.chave)
    )
  );
  const mostrarEixo = computed(() => lanches.value.length > 0 && lanches.value.length <= MAXIMO_COM_EIXO);

  return { lanches, linhas, foraDaPilha, mostrarEixo };
}

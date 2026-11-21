<!-- A tela inicial (hero, a ousadia): o h1 leve no papel e, abaixo, um mosaico de cinco ladrilhos
     chapados, cada um um alvo só, com a contagem calculada, como a tela Iniciar do Metro [F28][F32].
     Cada ladrilho leva a uma área da página, como o painel inicial do hub [F25]. -->
<template>
  <section data-secao="inicio" aria-labelledby="fl-titulo" class="fl-inicio">
    <div class="container">
      <div class="fl-inicio__cabeca">
        <h1 id="fl-titulo" class="fl-inicio__titulo">{{ HERO.titulo }}</h1>
        <div class="fl-inicio__apoio">
          <p class="fl-inicio__texto">{{ HERO.texto }}</p>
          <FlBotao para="/menu">{{ HERO.acao }}</FlBotao>
        </div>
      </div>

      <ul class="fl-mosaico" role="list">
        <li
          v-for="ladrilho in ladrilhos"
          :key="ladrilho.destino"
          class="fl-mosaico__item"
          :class="`fl-mosaico__item--${ladrilho.destino}`"
        >
          <FlLadrilho v-bind="ladrilho" @ativar="irPara" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { faClock, faGlassWater, faIceCream } from "@fortawesome/free-solid-svg-icons";
import { responsiveImage } from "@/composables/useResponsiveImage";
import { formatItemCount } from "@/utils/formatters";
import { HERO, HORARIO, IMAGEM_HERO, RODAPE } from "../../../compartilhado/dados";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import { useHub } from "../useHub";
import FlBotao from "../componentes/FlBotao.vue";
import FlLadrilho from "../componentes/FlLadrilho.vue";

// Cores distribuídas para que dois ladrilhos da mesma cor nunca se encostem (1440, 1024 e 390)
const COR_POR_DESTINO = { foods: "cheddar", drinks: "cebola", desserts: "alface", adicionais: "tinta", loja: "cheddar" };
const ICONE_POR_DESTINO = { drinks: faGlassWater, desserts: faIceCream, adicionais: ["fas", "plus"], loja: faClock };

defineProps({});
defineEmits([]);

const { irPara } = useHub();
const { categorias, adicionais } = useCardapio();

// O recorte do hero (arquivo fixo, não um produto): nada a reservar para produto sumido
const recorte = {
  ...responsiveImage(HERO.imagem, { ...IMAGEM_HERO, sizes: "(min-width: 1024px) 400px, 50vw" }),
  largura: HERO.largura,
  altura: HERO.altura,
};

// Ordem do DOM = ordem visual em todas as larguras; as contagens saem do store a cada render
const ladrilhos = computed(() => {
  const totalAdicionais = adicionais.value.lanche.length + adicionais.value.sobremesa.length;
  const lista = [
    ...categorias.value.map((categoria) => ({
      destino: categoria.chave,
      rotulo: categoria.rotulo,
      contagem: formatItemCount(categoria.quantidade),
    })),
    { destino: "adicionais", rotulo: TEXTOS.adicionais.titulo, contagem: formatItemCount(totalAdicionais) },
    { destino: "loja", rotulo: RODAPE.horario, detalhe: HORARIO },
  ];
  return lista.map((ladrilho, ordem) => ({
    ...ladrilho,
    rotuloAcessivel: ladrilho.detalhe
      ? `${ladrilho.rotulo}: ${ladrilho.detalhe}`
      : `${ladrilho.rotulo}, ${ladrilho.contagem}`,
    cor: COR_POR_DESTINO[ladrilho.destino],
    icone: ICONE_POR_DESTINO[ladrilho.destino] ?? null,
    imagem: ladrilho.destino === "foods" ? recorte : null,
    prioritaria: ladrilho.destino === "foods",
    ordem,
  }));
});
</script>

<style scoped lang="scss">
@use "../scss/secao-inicio";
</style>

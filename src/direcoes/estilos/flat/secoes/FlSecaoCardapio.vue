<!-- O cardápio em pivot: uma categoria por vez, com os produtos reais em lista, o preço e o
     "Adicionar" real [F27][H20]. A aba ativa é a mesma dos ladrilhos da tela inicial (useHub). -->
<template>
  <section data-secao="cardapio" aria-labelledby="fl-cardapio-titulo" class="fl-cardapio container">
    <h2 id="fl-cardapio-titulo" class="fl-cardapio__titulo">{{ TEXTOS.cardapio.titulo }}</h2>
    <p class="fl-cardapio__apoio">{{ FRASE_CARDAPIO }}</p>

    <FlPivot v-model="abaAtiva" :abas="CATEGORIAS" id-titulo="fl-cardapio-titulo" class="fl-cardapio__pivot">
      <template #painel="{ aba }">
        <ul v-if="itensDe(aba.chave).length" class="fl-lista" role="list">
          <FlLinhaProduto
            v-for="produto in itensDe(aba.chave)"
            :key="produto.id"
            :produto="produto"
            :icone="ICONE_POR_CATEGORIA[aba.chave]"
          />
        </ul>
        <p v-else class="fl-cardapio__vazio">{{ TEXTOS.cardapio.vazio }}</p>
      </template>
    </FlPivot>
  </section>
</template>

<script setup>
import { faGlassWater, faIceCream } from "@fortawesome/free-solid-svg-icons";
import { CATEGORIAS, FRASE_CARDAPIO } from "../../../compartilhado/dados";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import { useHub } from "../useHub";
import FlLinhaProduto from "../componentes/FlLinhaProduto.vue";
import FlPivot from "../componentes/FlPivot.vue";

// Reserva da foto que falha: o ícone da categoria
const ICONE_POR_CATEGORIA = { foods: ["fas", "burger"], drinks: faGlassWater, desserts: faIceCream };

defineProps({});
defineEmits([]);

const { abaAtiva } = useHub();
const { categorias } = useCardapio();

// A lista sai do store a cada render: produto excluído some, nome e preço trocados aparecem como estão
const itensDe = (chave) => categorias.value.find((categoria) => categoria.chave === chave)?.itens ?? [];
</script>

<style scoped lang="scss">
@use "../scss/secao-cardapio";
</style>

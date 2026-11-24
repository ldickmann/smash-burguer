<!-- Cardápio em Material 3 Expressive (docs/direcoes/desenho/cardapio.md): o cabeçalho de texto na
     superfície, sem foto atrás (o banner saiu, 6.a), o grupo de categorias com rádios nativos e a região
     da grade, nomeada por um h2 escondido com o rótulo da categoria (6.c). A grade é a do feed sem
     destaque, com os M3CartaoLanche comuns (6.e). O modal Personalizar é desta view: os cards o abrem por
     usePersonalizar(). -->
<template>
  <div class="menu-page">
    <div class="menu-page__cabecalho container">
      <h1>Cardápio</h1>
      <p class="menu-page__frase">{{ FRASE_CARDAPIO }}</p>
    </div>

    <CategoryTabs v-model="categoriaAtual" :options="opcoes" />

    <section class="menu-page__regiao container" aria-labelledby="menu-categoria-titulo">
      <h2 id="menu-categoria-titulo" class="visually-hidden">{{ rotuloAtual }}</h2>

      <!-- Cada categoria mostra todos os itens: sem paginação (SPEC.md §5.3). Os ids se repetem entre
           as categorias: a chave leva a categoria -->
      <ul v-if="produtos.length" class="menu-page__grade" role="list">
        <li v-for="produto in produtos" :key="`${categoriaAtual}-${produto.id}`" class="menu-page__item">
          <M3CartaoLanche :produto="produto" :aberto="aberta === produto.id" @alternar="alternar" />
        </li>
      </ul>

      <!-- A região existe sempre: o vazio que aparece depois de escolher a categoria é anunciado
           (desenho dos componentes base, §5.3) -->
      <div role="status" aria-atomic="true">
        <EmptyState
          v-if="!produtos.length"
          icon="utensils"
          :title="TEXTOS.vazio"
          text="Dê uma olhada nas outras categorias."
        />
      </div>
    </section>
  </div>

  <ModalAdditional :open="isOpen" :product="product" @close="closeModal" @confirm="confirm" />
</template>

<script setup>
import { computed, provide, ref, watch } from "vue";
import { useProductsStore } from "@/stores/products";
import { useProductModal } from "@/composables/useProductModal";
import { useFolhaUnica } from "@/composables/useFolhaUnica";
import { CHAVE_PERSONALIZAR } from "@/composables/usePersonalizar";
import { CATEGORIAS, FRASE_CARDAPIO, TEXTOS } from "@/utils/textosLoja";
import CategoryTabs from "@/components/ui/CategoryTabs.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import M3CartaoLanche from "@/components/M3CartaoLanche.vue";
import ModalAdditional from "@/components/ModalAdditional.vue";

const productsStore = useProductsStore();
const { isOpen, product, openModal, closeModal, confirm } = useProductModal();

// Os cards abrem o modal com personalizar(produto, contexto)
provide(CHAVE_PERSONALIZAR, openModal);

const opcoes = CATEGORIAS.map(({ chave, rotulo }) => ({ value: chave, label: rotulo }));
const categoriaAtual = ref("foods");
const rotuloAtual = computed(() => CATEGORIAS.find((c) => c.chave === categoriaAtual.value)?.rotulo ?? "");
const produtos = computed(() => productsStore[categoriaAtual.value] ?? []);

// Uma folha de ingredientes aberta por vez. A folha guarda o produto.id, que se repete entre as
// categorias: trocar de categoria fecha a folha, sem mover o foco, que fica no rádio (6.f)
const { aberta, alternar, fechar } = useFolhaUnica();
watch(categoriaAtual, () => fechar());
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/menu-page";
</style>

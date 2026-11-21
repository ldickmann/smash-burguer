<!-- Uma linha do pivot: foto quadrada, nome, descrição, preço e "Adicionar", no papel, sem caixa nem
     divisória [F26][F36][F51][H20]. Sem hover na linha: só o botão reage. -->
<template>
  <li class="fl-linha">
    <div class="fl-linha__foto">
      <picture v-if="imagem.src && !imagemFalhou">
        <source v-if="imagem.srcset" type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
        <img
          class="fl-linha__img"
          :src="imagem.src"
          :alt="produto.name"
          width="960"
          height="720"
          loading="lazy"
          decoding="async"
          @error="aoFalharImagem"
        />
      </picture>
      <font-awesome-icon v-else :icon="icone" class="fl-linha__reserva" aria-hidden="true" />
    </div>

    <div class="fl-linha__corpo">
      <h3 class="fl-linha__nome">{{ produto.name }}</h3>
      <p class="fl-linha__descricao">{{ produto.description }}</p>
      <div class="fl-linha__acao">
        <p class="fl-linha__preco tabular">{{ preco }}</p>
        <FlBotaoAdicionar
          v-bind="atributosAdicionar"
          :adicionado="adicionado"
          @ativar="personalizar(produto, contexto)"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
import { useCartaoProduto } from "../../../compartilhado/useCartaoProduto";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import FlBotaoAdicionar from "./FlBotaoAdicionar.vue";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  // Reserva quando a foto falha: o ícone da categoria
  icone: {
    type: [Array, Object],
    default: () => ["fas", "burger"],
  },
});

defineEmits([]);

const personalizar = usePersonalizar();
const { imagem, preco, imagemFalhou, adicionado, contexto, atributosAdicionar } = useCartaoProduto(
  () => props.produto,
  { sizes: "(min-width: 1024px) 128px, 88px" }
);

const aoFalharImagem = () => (imagemFalhou.value = true);
</script>

<style scoped lang="scss">
@use "../scss/linha-produto";
</style>

<!-- Filled card do feed [63][64] (cópia de produção do M3CartaoLanche da Home, SPEC-material §4.1):
     comum (foto 4:3 com canto 28) ou destaque (foto quadrada no cookie, na horizontal a partir de md).
     Sem sombra e sem hover: só os botões reagem. "Adicionar" abre o modal Personalizar real; a metade
     de trás abre a folha de ingredientes do próprio produto. Substitui o ProductCard menu e compact.
     No destaque, a camada dos lobos (§10.3) fica atrás da foto: o prato claro da foto encostava no
     fundo do card, e os lobos de baixo sumiam. A referência não tem a camada (decisão e). -->
<template>
  <article class="m3-cartao" :class="{ 'm3-cartao--destaque': destaque, 'is-aberto': aberto }">
    <div v-if="destaque" class="m3-cartao__cookie">
      <span class="m3-cartao__lobos" aria-hidden="true"></span>
      <M3Foto
        class="m3-cartao__foto"
        :imagem="imagem"
        :alt="produto.name"
        forma="cookie"
        :falhou="imagemFalhou"
        @erro="imagemFalhou = true"
      />
    </div>
    <M3Foto
      v-else
      class="m3-cartao__foto"
      :imagem="imagem"
      :alt="produto.name"
      forma="cartao"
      :falhou="imagemFalhou"
      @erro="imagemFalhou = true"
    />
    <div class="m3-cartao__corpo">
      <h3 class="m3-cartao__nome">{{ produto.name }}</h3>
      <p v-if="produto.description" class="m3-cartao__descricao">{{ produto.description }}</p>
      <p class="m3-cartao__preco tabular">{{ preco }}</p>
      <div class="m3-cartao__acoes">
        <M3BotaoDividido
          class="m3-cartao__dividido"
          :rotulo-menu="ingredientes.length ? `${TEXTOS.ingredientes} de ${produto.name}` : ''"
          :controla="idFolha"
          :expandido="aberto"
          :adicionado="adicionado"
          :atributos-acao="atributosAdicionar"
          :tamanho="destaque ? 'm' : 's'"
          @acao="personalizar(produto, contexto)"
          @alternar="(botao) => emit('alternar', produto.id, botao)"
        />
        <M3FolhaIngredientes v-if="ingredientes.length" :id="idFolha" :itens="ingredientes" :aberto="aberto" />
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { useCartaoProduto } from "@/composables/useCartaoProduto";
import { usePersonalizar } from "@/composables/usePersonalizar";
import { TEXTOS } from "@/utils/textosLoja";
import M3BotaoDividido from "@/components/ui/M3BotaoDividido.vue";
import M3FolhaIngredientes from "@/components/ui/M3FolhaIngredientes.vue";
import M3Foto from "@/components/ui/M3Foto.vue";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  destaque: {
    type: Boolean,
    default: false,
  },
  aberto: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["alternar"]);

const TAMANHOS = {
  destaque: "(min-width: 1280px) 520px, (min-width: 768px) 40vw, 60vw",
  comum: "(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 45vw",
};

const personalizar = usePersonalizar();
const { imagem, preco, imagemFalhou, adicionado, contexto, atributosAdicionar } = useCartaoProduto(
  () => props.produto,
  { sizes: props.destaque ? TAMANHOS.destaque : TAMANHOS.comum }
);

const ingredientes = computed(() =>
  Array.isArray(props.produto.ingredients) ? props.produto.ingredients.filter(Boolean) : []
);
const idFolha = computed(() => `m3-ingredientes-${props.produto.id}`);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/m3-cartao-lanche";
</style>

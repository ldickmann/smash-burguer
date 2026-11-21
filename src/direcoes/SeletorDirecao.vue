<!-- Alternador das direções: fixo no canto, fechado por padrão. Some com ?captura=1, para as capturas. -->
<template>
  <nav v-if="!captura" class="seletor" aria-label="Direções visuais">
    <details ref="detalhes" class="seletor__detalhes" @toggle="aberto = detalhes?.open ?? false">
      <summary ref="resumo" class="seletor__botao">
        Direções<span class="visually-hidden">, agora em {{ nomeAtual }}</span>
      </summary>
      <ul class="seletor__lista" role="list">
        <li>
          <RouterLink class="seletor__link" to="/direcoes">Índice</RouterLink>
        </li>
        <li v-for="direcao in DIRECOES" :key="direcao.slug">
          <RouterLink class="seletor__link" :to="caminhoDirecao(direcao.slug)">
            {{ direcao.nome }}
          </RouterLink>
        </li>
      </ul>
    </details>
  </nav>
</template>

<script setup>
import "./_tokens.scss";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { DIRECOES, caminhoDirecao } from "./direcoes";

const props = defineProps({
  atual: {
    type: String,
    default: "",
  },
});

const route = useRoute();
const detalhes = ref(null);
const resumo = ref(null);
const aberto = ref(false);

const captura = computed(() => route.query.captura === "1");
const nomeAtual = computed(
  () => DIRECOES.find((direcao) => direcao.slug === props.atual)?.nome ?? "o índice"
);

const fechar = ({ devolverFoco = false } = {}) => {
  if (!detalhes.value?.open) return;
  detalhes.value.open = false;
  if (devolverFoco) resumo.value?.focus();
};

const aoTeclar = (event) => {
  if (event.key === "Escape" && aberto.value) fechar({ devolverFoco: true });
};

const aoApontar = (event) => {
  if (aberto.value && !detalhes.value?.contains(event.target)) fechar();
};

watch(() => route.fullPath, () => fechar());

onMounted(() => {
  document.addEventListener("keydown", aoTeclar);
  document.addEventListener("pointerdown", aoApontar);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", aoTeclar);
  document.removeEventListener("pointerdown", aoApontar);
});
</script>

<style scoped lang="scss">
.seletor {
  position: fixed;
  bottom: var(--space-4);
  left: var(--space-4);
  z-index: var(--z-sidebar);
  font-family: var(--dir-fonte);
  font-size: var(--dir-texto-pequeno);
  line-height: 1.3;
}

.seletor__detalhes {
  position: relative;
}

.seletor__botao {
  display: inline-flex;
  align-items: center;
  min-height: var(--target-min);
  padding-inline: var(--space-4);
  border: 2px solid var(--dir-seletor-contorno);
  border-radius: var(--dir-raio-pilula);
  background: var(--dir-seletor-fundo);
  box-shadow: var(--dir-seletor-sombra);
  color: var(--dir-seletor-tinta);
  font-weight: 600;
  list-style: none;
  cursor: pointer;

  &::-webkit-details-marker {
    display: none;
  }
}

.seletor__lista {
  position: absolute;
  bottom: calc(100% + var(--space-2));
  left: 0;
  width: max-content;
  max-width: calc(100vw - 2 * var(--space-4));
  padding: var(--space-1);
  border: 2px solid var(--dir-seletor-contorno);
  border-radius: var(--dir-seletor-raio);
  background: var(--dir-seletor-fundo);
  box-shadow: var(--dir-seletor-sombra);
}

.seletor__link {
  display: flex;
  align-items: center;
  min-height: var(--target-min);
  padding-inline: var(--space-3);
  border-radius: var(--dir-seletor-raio-item);
  color: var(--dir-seletor-tinta-suave);
  text-decoration: none;
  transition: background-color var(--dir-duracao);

  &:hover {
    background: var(--dir-seletor-hover);
    color: var(--dir-seletor-tinta);
  }

  &[aria-current="page"] {
    color: var(--dir-seletor-tinta);
    font-weight: 700;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }
}

// Anel duplo: o anel global usa a cor de foco do estilo, que pode sumir no fundo do alternador
.seletor__botao:focus-visible,
.seletor__link:focus-visible {
  outline: var(--dir-anel) solid var(--dir-anel-claro);
  outline-offset: 1px;
  box-shadow: 0 0 0 var(--dir-anel-halo) var(--dir-anel-escuro);
}
</style>

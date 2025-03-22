<template>
  <div class="pagination-container" v-if="totalPages > 0">
    <ButtonComponent
      :buttons="paginationButtons"
      backgroundColor="#3498db"
      fontColor="#333333"
      fontSize="14px"
      buttonSize="8px 16px"
      borderRadius="4px"
      :gap="10"
      @click="handlePageChange"
    />
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisibleButtons: {
    type: Number,
    default: 4,
  },
});

// Define o emit para comunicar com o componente pai
const emit = defineEmits(["update:page"]);

/**
 * Gera botões de paginação com base na página atual e no total de páginas.
 * Inclui botões de navegação anterior/próximo e ellipsis para páginas intermediárias.
 */
const paginationButtons = computed(() => {
  const buttons = [];

  // Botão para a página anterior
  if (props.currentPage > 1) {
    buttons.push({
      label: "«",
      page: props.currentPage - 1,
      id: "prev",
    });
  }

  // Primeira página
  buttons.push({
    label: "1",
    page: 1,
    active: props.currentPage === 1,
  });

  // Determinar onde começar e terminar os botões de número
  let startPage = Math.max(
    2,
    props.currentPage - Math.floor(props.maxVisibleButtons / 2)
  );
  let endPage = Math.min(props.totalPages - 1, startPage + props.maxVisibleButtons - 3);

  // Ajustar se estiver próximo do início
  if (startPage > 2) {
    buttons.push({ label: "...", disabled: true, id: "ellipsis-start" });
  }

  // Renderizar botões para páginas entre início e fim
  for (let i = startPage; i <= endPage; i++) {
    buttons.push({
      label: i.toString(),
      page: i,
      active: props.currentPage === i,
    });
  }

  // Ajustar se estiver próximo do fim
  if (endPage < props.totalPages - 1) {
    buttons.push({ label: "...", disabled: true, id: "ellipsis-end" });
  }

  // Última página (se houver mais que uma página)
  if (props.totalPages > 1) {
    buttons.push({
      label: props.totalPages.toString(),
      page: props.totalPages,
      active: props.currentPage === props.totalPages,
    });
  }

  // Botão para a próxima página
  if (props.currentPage < props.totalPages) {
    buttons.push({
      label: "»",
      page: props.currentPage + 1,
      id: "next",
    });
  }

  return buttons;
});

/**
 * Manipula o clique em um botão de paginação.
 * Emite o evento update:page para atualizar a página no componente pai.
 * @param {Object} button - O botão que foi clicado
 */
const handlePageChange = (button) => {
  if (!button.disabled && button.page) {
    emit("update:page", button.page);
  }
};

// Observar mudanças no número total de páginas
watch(
  () => props.totalPages,
  (newValue) => {
    // Se a página atual for maior que o total de páginas,
    // redefina para a última página disponível
    if (props.currentPage > newValue) {
      emit("update:page", newValue);
    }
  }
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/pagination-component";
</style>

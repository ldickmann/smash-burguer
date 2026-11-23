<!-- Item do carrinho (desenho do Carrinho, §5.2): bloco da lista segmentada [66][81], com a miniatura
     M3Foto de 64 px na forma que o produto tem na Home (círculo nas bebidas, flor na sobremesa e o cartão
     quadrado nos hambúrgueres, sem o cookie do hero). Na 1ª linha, a foto, o nome, os detalhes e o total;
     na 2ª, o stepper e o "Remover", longe do "+" [H19]. O item não é ação: o foco fica nos controles. -->
<template>
  <li class="cart-item">
    <div class="cart-item__top">
      <M3Foto
        class="cart-item__foto"
        :imagem="miniatura"
        :forma="forma"
        proporcao="1 / 1"
        :falhou="imagemFalhou"
        :icone="['fas', 'utensils']"
        :largura="64"
        :altura="64"
        @erro="imagemFalhou = true"
      />

      <div class="cart-item__info">
        <p class="cart-item__name">{{ item.name }}</p>
        <p v-for="detail in details" :key="detail" class="cart-item__detail">{{ detail }}</p>
      </div>

      <p class="cart-item__total tabular">{{ formatPrice(item.unitPrice * item.quantity) }}</p>
    </div>

    <div class="cart-item__bottom">
      <QuantityStepper
        :model-value="item.quantity"
        :min="1"
        :max="10"
        :label="item.name"
        @update:model-value="$emit('update-quantity', index, $event)"
      />
      <BaseButton
        class="cart-item__remover"
        variant="danger"
        icon-start="trash-can"
        :aria-label="`Remover ${item.name}`"
        data-remove
        @click="$emit('remove', index)"
      >
        Remover
      </BaseButton>
    </div>
  </li>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { describeItem, formatPrice } from "@/utils/formatters";
import { responsiveImage } from "@/composables/useResponsiveImage";
import BaseButton from "@/components/ui/BaseButton.vue";
import M3Foto from "@/components/ui/M3Foto.vue";
import QuantityStepper from "@/components/ui/QuantityStepper.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

defineEmits(["remove", "update-quantity"]);

// Forma da Home por categoria: bebidas no círculo, sobremesas na flor e o resto no cartão
const FORMAS = { drinks: "circulo", desserts: "flor" };
const forma = computed(() => FORMAS[props.item.category] ?? "cartao");

// "Sem tomate, sem cebola", "+2 bacon", "Obs.: bem passado"
const details = computed(() => describeItem(props.item));
const miniatura = computed(() => responsiveImage(props.item.image, { widths: [480], sizes: "64px" }));

// Se a imagem falha, entra o ícone na mesma forma; outra imagem tenta de novo
const imagemFalhou = ref(false);
watch(
  () => props.item.image,
  () => {
    imagemFalhou.value = false;
  }
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/cart-item";
</style>

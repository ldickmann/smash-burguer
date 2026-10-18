<template>
  <li class="cart-item">
    <div class="cart-item__top">
      <picture class="cart-item__thumb">
        <source v-if="thumb.srcset" type="image/webp" :srcset="thumb.srcset" :sizes="thumb.sizes" />
        <img
          class="cart-item__img"
          :src="thumb.src"
          alt=""
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
        />
      </picture>

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
import { computed } from "vue";
import { describeItem, formatPrice } from "@/utils/formatters";
import { responsiveImage } from "@/composables/useResponsiveImage";
import BaseButton from "@/components/ui/BaseButton.vue";
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

// "Sem tomate, sem cebola", "+2 bacon", "Obs.: bem passado"
const details = computed(() => describeItem(props.item));
const thumb = computed(() => responsiveImage(props.item.image, { widths: [480], sizes: "64px" }));
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/cart-item";
</style>

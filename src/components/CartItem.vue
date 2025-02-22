<template>
  <li class="cart-page__item">
    <div class="cart-page__item-info">
      <span class="cart-page__item-name">{{ item.name }}</span>
      <span v-if="item.removedIngredients?.length" class="cart-page__item-customization">
        <strong>Adicionais: </strong>
        <span v-for="(add, index) in item.additionals" :key="index">
          {{ add.quantity }}x {{ add.name
          }}{{ index < item.additionals.length - 1 ? ", " : "" }}
        </span>
      </span>
      <span v-if="item.observation" class="cart-page__item-customization">
        <strong>Obs.: </strong> {{ item.observation }}
      </span>
      <span class="cart-page__item-price">{{ formatPrice(item.finalPrice) }}</span>
    </div>
    <button @click="removeItem" class="cart-page__button cart-page__button--danger">
      {{ removeButtonText }}
    </button>
  </li>
</template>

<script setup>
import { formatPrice } from "@/utils/formatters";

const props = defineProps({
  item: Object,
  index: Number,
  removeButtonText: String,
});

const emit = defineEmits(["remove"]);

const removeButtonItem = "Remover";

const removeItem = () => {
  emit("remove", props.index);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/cart-item";
</style>

<template>
  <ul class="ingredients-list">
    <li v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-item">
      <label :for="`ingredient-${ingredient.id}`">
        <input
          type="checkbox"
          :id="`ingredient-${ingredient.id}`"
          v-model="ingredient.included"
          @change="$emit('update:ingredient', ingredient)"
        />
        {{ ingredient.name }}
      </label>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
    validator(value) {
      return value.every(
        (ingredient) =>
          "id" in ingredient && "name" in ingredient && "included" in ingredient
      );
    },
  },
});

const emit = defineEmits(["update:ingredient"]);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ingredients-list";
</style>

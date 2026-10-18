<template>
  <ul class="ingredients-list" role="list">
    <li v-for="(ingredient, index) in model" :key="ingredient.id" class="ingredients-list__item">
      <label
        :for="`ingrediente-${ingredient.id}`"
        class="ingredients-list__label"
        :class="{ 'is-removed': !ingredient.included }"
      >
        <!-- Marcado = incluído. O v-model do componente é a única fonte de verdade. -->
        <input
          :id="`ingrediente-${ingredient.id}`"
          type="checkbox"
          class="ingredients-list__checkbox"
          :checked="ingredient.included"
          @change="setIncluded(index, $event.target.checked)"
        />
        <span class="ingredients-list__name">{{ ingredient.name }}</span>
        <span v-if="!ingredient.included" class="visually-hidden">(removido)</span>
      </label>
    </li>
  </ul>
</template>

<script setup>
// Lista de { id, name, included } controlada pelo pai com v-model
const model = defineModel({
  type: Array,
  required: true,
  validator(value) {
    return value.every(
      (ingredient) => "id" in ingredient && "name" in ingredient && "included" in ingredient
    );
  },
});

const setIncluded = (index, included) => {
  model.value = model.value.map((ingredient, i) =>
    i === index ? { ...ingredient, included } : ingredient
  );
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ingredients-list";
</style>

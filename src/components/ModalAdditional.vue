<template>
  <!-- Modal Overlay é exibido se a propriedade 'show' for verdadeira -->
  <dialog class="modal-overlay" :open="show" @click.self="closeModal">
    <article class="modal-content">
      <!-- Cabeçalho do Modal com título e botão de fechar -->
      <header class="modal-header">
        <h2>Personalizar Pedido</h2>
        <button
          type="button"
          class="close-button"
          @click="closeModal"
          aria-label="Fechar modal"
        >
          &times;
        </button>
      </header>

      <!-- Corpo do Modal -->
      <main class="modal-body">
        <section class="product-details">
          <img :src="item.image" :alt="item.name" class="product-image" loading="lazy" />
          <div class="product-info">
            <h3>{{ item.name }}</h3>
            <p v-if="item.description" class="description">{{ item.description }}</p>
            <p class="price">{{ formatPrice(calculateTotalPrice) }}</p>
          </div>
        </section>

        <!-- Seção de remoção de ingredientes -->
        <section v-if="showIngredientsSection" class="ingredients-section">
          <h4>Deseja remover algum ingrediente?</h4>
          <IngredientsList
            :ingredients="defaultIngredients"
            @update:ingredient="updateIngredient"
          />
        </section>

        <!-- Seção de quantidade de bebidas -->
        <section v-if="isDrink" class="additionals-section">
          <h4>Quantidade</h4>
          <QuantityControl
            :item="item"
            :quantity="drinkQuantity"
            @update:quantity="updateDrinkQuantity"
          />
        </section>

        <!-- Seção de adicionais -->
        <section v-if="showAdditionals" class="additionals-section">
          <h4>Adicionais</h4>
          <AdditionalsList
            :additionals="getAdditionalsByCategory"
            @update:quantity="updateAdditionalQuantity"
          />
        </section>

        <!-- Seção de observação -->
        <section class="observation-section">
          <FormGroup
            id="observation"
            label="Observação"
            v-model="observation"
            type="textarea"
            placeholder="Alguma observação especial?"
          />
        </section>
      </main>

      <!-- Footer do Modal -->
      <footer class="modal-footer">
        <ButtonComponent :buttons="[cartButton]" @click="addToCart" />
      </footer>
    </article>
  </dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { formatPrice } from "@/utils/formatters";
import { useProductsStore } from "@/stores/products";
import FormGroup from "./FormGroup.vue";
import ButtonComponent from "./ButtonComponent.vue";
import IngredientsList from "./IngredientsList.vue";
import AdditionalsList from "./AdditionalsList.vue";
import QuantityControl from "./QuantityControl.vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: true,
    validator(value) {
      // Validação para garantir que o objeto item tenha as propriedades necessárias
      return ["name", "price", "image"].every((prop) => prop in value);
    },
  },
});

// Emite eventos para para o componente pai para fechar o modal e adicionar o item ao carrinho
const emit = defineEmits(["close", "add-to-cart"]);

const observation = ref(""); // Observação do pedido (usuário)
const drinkQuantity = ref({ quantity: 1 }); // Quantidade de bebidas
const productsStore = useProductsStore();

const isDrink = computed(() => props.item.category === "drinks");
const showIngredientsSection = computed(
  () => !isDrink.value && defaultIngredients.value.length > 0
);
const showAdditionals = computed(() =>
  ["foods", "desserts"].includes(props.item.category)
);

const defaultIngredients = computed(() => {
  if (!props.item.ingredients?.length) return [];

  return props.item.ingredients.map((ingredient, index) => ({
    id: index + 1,
    name: ingredient,
    included: false,
  }));
});

const cartButton = {
  label: "Adicionar ao Pedido",
  id: "add-to-cart",
  props: {
    backgroundColor: "#42b983",
    fontColor: "#ffffff",
    fontSize: "16px",
    buttonSize: "1rem 2rem",
    borderRadius: "8px",
  },
};

const updateIngredient = (ingredient) => {
  ingredient.included = !ingredient.included;
};

const updateDrinkQuantity = (value) => {
  drinkQuantity.value = value;
};

const updateAdditionalQuantity = (additional, newQuantity) => {
  additional.quantity = newQuantity;
};

const calculateTotalPrice = computed(() => {
  if (isDrink.value) {
    return props.item.price * (drinkQuantity.value.quantity || 1);
  }

  const additionalsTotal = getAdditionalsByCategory.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return props.item.price + additionalsTotal;
});

const closeModal = () => {
  observation.value = "";
  drinkQuantity.value.quantity = 1;
  emit("close");
};

const getAdditionalsByCategory = computed(() => {
  const category = props.item.category;
  return category === "foods"
    ? productsStore.foodAdditionals
    : category === "desserts"
    ? productsStore.dessertAdditionals
    : [];
});

const addToCart = () => {
  const customizedItem = {
    ...props.item,
    removedIngredients: !isDrink.value
      ? defaultIngredients.value.filter((ing) => ing.included).map((ing) => ing.name)
      : [],
    additionals: showAdditionals.value
      ? getAdditionalsByCategory.value
          .filter((add) => add.quantity > 0)
          .map(({ name, quantity, price }) => ({ name, quantity, price }))
      : [],
    quantity: isDrink.value ? drinkQuantity.value.quantity : 1,
    observation: observation.value.trim(),
    finalPrice: calculateTotalPrice.value,
  };

  emit("add-to-cart", customizedItem);
  closeModal();
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/modal";
</style>

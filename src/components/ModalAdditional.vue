<template>
  <!-- Modal Overlay é exibido se a propriedade 'show' for verdadeira -->
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="modal-content">
      <!-- Cabeçalho do Modal com título e botão de fechar -->
      <div class="modal-header">
        <h2>Personalizar Pedido</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>

      <!-- Corpo do Modal -->
      <div class="modal-body">
        <div class="product-details">
          <img :src="item.image" :alt="item.name" class="product-image" />
          <div class="product-info">
            <h3>{{ item.name }}</h3>
            <p v-if="item.description" class="description">{{ item.description }}</p>
            <p class="price">{{ formatPrice(calculateTotalPrice) }}</p>
          </div>
        </div>

        <!-- Ingredientes adicionais para itens que não são bebidas -->
        <div
          class="ingredients-section"
          v-if="item.category !== 'drinks' && defaultIngredients.length > 0"
        >
          <h4>Deseja remover algo?</h4>
          <div class="ingredients-list">
            <div
              v-for="ingredient in defaultIngredients"
              :key="ingredient.id"
              class="ingredient-item"
            >
              <input
                type="checkbox"
                :id="'ingredient-' + ingredient.id"
                v-model="ingredient.included"
                class="ingredient-checkbox"
              />
              <label :for="'ingredient-' + ingredient.id">{{ ingredient.name }}</label>
            </div>
          </div>
        </div>

        <!-- Quantidade para Bebidas -->
        <div class="additionals-section" v-if="item.category === 'drinks'">
          <h4>Quantidade</h4>
          <div class="additionals-list">
            <div class="additional-item">
              <span class="additional-name">{{ item.name }}</span>
              <span class="additional-price">{{ formatPrice(item.price) }}</span>
              <div class="quantity-control">
                <button
                  @click="decreaseQuantity(drinkQuantity)"
                  :disabled="drinkQuantity.quantity === 0"
                >
                  -
                </button>
                <span>{{ drinkQuantity.quantity }}</span>
                <button @click="increaseQuantity(drinkQuantity)">+</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Items Adicionais (com checkbox) para Comidas e Sobremesas -->
        <div class="additionals-section" v-if="showAdditionals">
          <h4>Adicionais</h4>
          <div class="additionals-list">
            <div
              v-for="additional in getAdditionalsByCategory"
              :key="additional.id"
              class="additional-item"
            >
              <span class="additional-name">{{ additional.name }}</span>
              <span class="additional-price">{{ formatPrice(additional.price) }}</span>
              <div class="quantity-control">
                <button
                  @click="decreaseQuantity(additional)"
                  :disabled="additional.quantity === 0"
                >
                  -
                </button>
                <span>{{ additional.quantity }}</span>
                <button @click="increaseQuantity(additional)">+</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Campo de Observação -->
        <div class="observation-section">
          <FormGroup
            id="observation"
            label="Observação"
            v-model="observation"
            type="textarea"
            placeholder="Alguma observação especial?"
          />
        </div>
      </div>

      <!-- Rodapé com botão de adicionar pedido -->
      <div class="modal-footer">
        <ButtonComponent
          :buttons="[{ label: 'Adicionar ao Pedido', id: 'add-to-cart' }]"
          backgroundColor="#42b983"
          fontColor="#ffffff"
          fontSize="16px"
          buttonSize="1rem 2rem"
          borderRadius="8px"
          @click="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { formatPrice } from "@/utils/formatters";
import FormGroup from "./FormGroup.vue";
import ButtonComponent from "./ButtonComponent.vue";

const props = defineProps({
  show: Boolean,
  item: {
    type: Object,
    required: true,
    validator(value) {
      // Validação para garantir que o objeto item tenha as propriedades necessárias
      return (
        value.hasOwnProperty("name") &&
        value.hasOwnProperty("price") &&
        value.hasOwnProperty("image")
      );
    },
  },
});

// Emite eventos para para o componente pai para fechar o modal e adicionar o item ao carrinho
const emit = defineEmits(["close", "add-to-cart"]);

const observation = ref(""); // Observação do pedido (usuário)
const drinkQuantity = ref({ quantity: 0 }); // Quantidade de bebidas

// Função computada para mostrar ingredientes adicionais conforme a categoria
const showAdditionals = computed(() => {
  return props.item.category === "foods" || props.item.category === "desserts";
});

const defaultIngredients = computed(() => {
  if (!props.item.ingredients) {
    return [];
  }

  return props.item.ingredients.map((ingredient, index) => ({
    id: index + 1,
    name: ingredient,
    included: false,
  }));
});

const foodAdditionals = ref([
  { id: 1, name: "Bacon", price: 3.5, quantity: 0 },
  { id: 2, name: "Ovo", price: 2.0, quantity: 0 },
  { id: 3, name: "Queijo Cheddar", price: 3.0, quantity: 0 },
  { id: 4, name: "Cebola Caramelizada", price: 2.5, quantity: 0 },
]);

const dessertAdditionals = ref([
  { id: 1, name: "Calda de Chocolate", price: 2.0, quantity: 0 },
  { id: 2, name: "Granulado", price: 1.5, quantity: 0 },
  { id: 3, name: "Leite Condensado", price: 2.5, quantity: 0 },
  { id: 4, name: "Morango", price: 3.0, quantity: 0 },
  { id: 5, name: "Nutella", price: 4.0, quantity: 0 },
  { id: 6, name: "Paçoca", price: 1.5, quantity: 0 },
]);

// Função computada para calcular o preço total do pedido
const calculateTotalPrice = computed(() => {
  if (props.item.category === "drinks") {
    return props.item.price * (drinkQuantity.value.quantity || 1);
  }

  const additionalsTotal = getAdditionalsByCategory.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return props.item.price + additionalsTotal;
});

const increaseQuantity = (item) => {
  item.quantity++;
};

const decreaseQuantity = (item) => {
  if (item.quantity > 0) {
    item.quantity--;
  }
};

const closeModal = () => {
  emit("close");
};

// Função para obter os adicionais pela categoria do item
const getAdditionalsByCategory = computed(() => {
  if (props.item.category === "foods") {
    return foodAdditionals.value;
  }
  if (props.item.category === "desserts") {
    return dessertAdditionals.value;
  }
  return [];
});

// Função para adicionar o item personalizado ao carrinho
const addToCart = () => {
  const customizedItem = {
    ...props.item,
    removedIngredients:
      props.item.category !== "drinks"
        ? defaultIngredients.value.filter((ing) => !ing.included).map((ing) => ing.name)
        : [],
    additionals: showAdditionals.value
      ? getAdditionalsByCategory.value
          .filter((add) => add.quantity > 0)
          .map((add) => ({
            name: add.name,
            quantity: add.quantity,
            price: add.price,
          }))
      : [],
    quantity: props.item.category === "drinks" ? drinkQuantity.value.quantity || 1 : 1,
    observation: observation.value,
    finalPrice: calculateTotalPrice.value,
  };

  emit("add-to-cart", customizedItem);
  closeModal();
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/modal";
</style>

<template>
  <BaseDialog
    :open="open && Boolean(product)"
    :title="product?.name ?? ''"
    title-id="personalizar-titulo"
    @close="$emit('close')"
  >
    <div v-if="product" class="customize">
      <div class="customize__visual">
        <BurgerStack v-if="showStack" :ingredients="ingredients" :additionals="additionals" />
        <picture v-else class="customize__photo">
          <source v-if="photo.srcset" type="image/webp" :srcset="photo.srcset" :sizes="photo.sizes" />
          <img
            class="customize__photo-img"
            :src="photo.src"
            :alt="product.name"
            width="960"
            height="720"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <div class="customize__options">
        <p v-if="product.description" class="customize__description">
          {{ product.description }}
        </p>

        <fieldset
          v-if="showIngredients"
          class="customize__section"
          aria-describedby="ingredientes-ajuda"
        >
          <legend class="customize__title">Ingredientes</legend>
          <p id="ingredientes-ajuda" class="customize__help">Desmarque o que quiser tirar</p>
          <IngredientsList v-model="ingredients" />
        </fieldset>

        <section v-if="showAdditionals" class="customize__section" aria-labelledby="adicionais-titulo">
          <h3 id="adicionais-titulo" class="customize__title">Adicionais</h3>
          <AdditionalsList v-model="additionals" />
        </section>

        <section v-if="isDrink" class="customize__section" aria-labelledby="quantidade-titulo">
          <h3 id="quantidade-titulo" class="customize__title">Quantidade</h3>
          <QuantityStepper v-model="quantity" :min="1" :max="10" :label="product.name" />
        </section>

        <FormGroup
          id="observacao"
          v-model="observation"
          class="customize__section"
          label="Observação"
          type="textarea"
          :rows="3"
          :maxlength="OBSERVATION_MAX"
          placeholder="Ex.: ponto da carne, sem sal…"
          :helper="`${observation.length}/${OBSERVATION_MAX}`"
        />
      </div>
    </div>

    <template #footer>
      <!-- Não há "Cancelar": fechar já cancela -->
      <BaseButton size="lg" block @click="confirm">
        Adicionar · <span class="tabular">{{ formatPrice(total) }}</span>
      </BaseButton>
    </template>
  </BaseDialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { formatPrice } from "@/utils/formatters";
import { useProductsStore } from "@/stores/products";
import { responsiveImage } from "@/composables/useResponsiveImage";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import QuantityStepper from "@/components/ui/QuantityStepper.vue";
import FormGroup from "@/components/FormGroup.vue";
import IngredientsList from "@/components/IngredientsList.vue";
import AdditionalsList from "@/components/AdditionalsList.vue";
import BurgerStack, { isBurger } from "@/components/BurgerStack.vue";

const OBSERVATION_MAX = 140;

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
    default: null,
  },
});

// "confirm" entrega o item já no modelo do carrinho (§10.1)
const emit = defineEmits(["close", "confirm"]);

const productsStore = useProductsStore();

// Estado local: a cada abertura o modal parte do produto como a casa serve
const ingredients = ref([]);
const additionals = ref([]);
const quantity = ref(1);
const observation = ref("");

const isDrink = computed(() => props.product?.category === "drinks");
const showStack = computed(() => isBurger(props.product));
// Ingredientes e adicionais só para hambúrgueres e sobremesas (§5.4)
const isCustomizable = computed(
  () => showStack.value || props.product?.category === "desserts"
);
const showIngredients = computed(() => isCustomizable.value && ingredients.value.length > 0);
const showAdditionals = computed(() => isCustomizable.value);

const photo = computed(() =>
  responsiveImage(props.product?.image, { sizes: "(min-width: 768px) 340px, 92vw" })
);

const catalogAdditionals = (category) => {
  if (category === "foods") return productsStore.foodAdditionals;
  if (category === "desserts") return productsStore.dessertAdditionals;
  return [];
};

const reset = () => {
  const product = props.product;
  if (!product) return;
  ingredients.value = (product.ingredients ?? []).map((name, index) => ({
    id: index + 1,
    name,
    included: true,
  }));
  // Cópias locais com quantidade zero: a store de produtos não é alterada
  additionals.value = (isCustomizable.value ? catalogAdditionals(product.category) : []).map(({ id, name, price }) => ({
    id,
    name,
    price,
    quantity: 0,
  }));
  quantity.value = 1;
  observation.value = "";
};

watch(
  () => [props.open, props.product],
  ([isOpen]) => {
    if (isOpen) reset();
  },
  { immediate: true }
);

const unitPrice = computed(() => {
  const extras = additionals.value.reduce(
    (sum, additional) => sum + additional.price * additional.quantity,
    0
  );
  return (props.product?.price ?? 0) + extras;
});

const total = computed(() => unitPrice.value * quantity.value);

const confirm = () => {
  const product = props.product;
  emit("confirm", {
    productId: product.id,
    category: product.category,
    name: product.name,
    image: product.image,
    unitPrice: unitPrice.value,
    quantity: quantity.value,
    removedIngredients: ingredients.value
      .filter((ingredient) => !ingredient.included)
      .map((ingredient) => ingredient.name),
    additionals: additionals.value
      .filter((additional) => additional.quantity > 0)
      .map(({ name, price, quantity: amount }) => ({ name, price, quantity: amount })),
    observation: observation.value.trim(),
  });
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/modal";
</style>

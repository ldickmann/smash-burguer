<template>
  <BaseDialog
    :open="open"
    :title="mode === 'edit' ? 'Editar produto' : 'Novo produto'"
    title-id="produto-titulo"
    max-width="560px"
    @close="closeModal"
  >
    <form id="produto-form" class="modal-product" novalidate @submit.prevent="handleSubmit">
      <FormGroup
        id="productType"
        v-model="localProduct.category"
        label="Categoria"
        type="select"
        :options="CATEGORY_OPTIONS"
      />
      <FormGroup
        id="name"
        v-model="localProduct.name"
        label="Nome do produto"
        placeholder="Informe o nome"
        required
      />
      <FormGroup
        id="price"
        v-model="localProduct.price"
        label="Preço"
        inputmode="decimal"
        placeholder="Ex.: 25,90"
        required
      />
      <FormGroup
        id="quantity"
        v-model="localProduct.quantity"
        label="Quantidade"
        type="number"
        inputmode="numeric"
        placeholder="Informe a quantidade"
        required
      />
      <FormGroup
        id="description"
        v-model="localProduct.description"
        label="Descrição"
        placeholder="Descrição do produto"
      />

      <!-- Seletor de arquivo com a cara de um botão secundário -->
      <div class="file-picker">
        <span class="file-picker__label">Imagem</span>
        <div class="file-picker__row">
          <label for="image" class="file-picker__button">
            <input
              id="image"
              type="file"
              accept="image/*"
              class="visually-hidden"
              :required="mode === 'add'"
              @change="uploadImage"
            />
            Escolher imagem
          </label>
          <span class="file-picker__name">{{ fileName || "Nenhuma imagem escolhida" }}</span>
        </div>
      </div>
    </form>

    <template #footer>
      <div class="modal-product__actions">
        <BaseButton variant="secondary" @click="cancelAction">Cancelar</BaseButton>
        <BaseButton type="submit" form="produto-form">Salvar</BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useButtonHandlers } from "@/utils/buttonHandlers";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import FormGroup from "@/components/FormGroup.vue";

const CATEGORY_OPTIONS = [
  { value: "foods", label: "Hambúrguer" },
  { value: "desserts", label: "Sobremesa" },
  { value: "drinks", label: "Bebida" },
];

const props = defineProps({
  open: {
    type: Boolean,
    default: true,
  },
  mode: {
    type: String,
    default: "add",
  },
  product: {
    type: Object,
    default: () => ({
      name: "",
      price: "",
      quantity: "",
      description: "",
      image: "",
      category: "foods",
    }),
  },
});

const emit = defineEmits(["close", "submit", "cancel"]);

const { handleImageUpload } = useButtonHandlers();

// Cria uma cópia local do produto para edição
const localProduct = ref({ ...props.product });
const fileName = ref("");

// Atualiza o localProduct caso a prop "product" seja alterada
watch(
  () => props.product,
  (newProduct) => {
    localProduct.value = { ...newProduct };
    fileName.value = "";
  }
);

const closeModal = () => emit("close");

const cancelAction = () => {
  emit("cancel");
  closeModal();
};

const handleSubmit = () => {
  // A lógica de envio (ex.: chamada à API) será tratada no componente pai
  emit("submit", localProduct.value);
  closeModal();
};

const uploadImage = (event) => {
  fileName.value = event.target.files[0]?.name ?? "";
  handleImageUpload(event, localProduct);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_modal-products";
</style>

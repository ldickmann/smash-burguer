<template>
  <BaseDialog
    :open="open"
    :title="mode === 'edit' ? 'Editar produto' : 'Novo produto'"
    title-id="produto-titulo"
    max-width="560px"
    @close="closeModal"
  >
    <form
      id="produto-form"
      ref="formRef"
      class="modal-product"
      novalidate
      @submit.prevent="handleSubmit"
    >
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
        :maxlength="NAME_MAX"
        :error="errors.name"
        required
        @blur="touch('name')"
      />
      <FormGroup
        id="price"
        v-model="localProduct.price"
        label="Preço"
        inputmode="decimal"
        placeholder="Ex.: 25,90"
        :maxlength="7"
        :error="errors.price"
        required
        @blur="touch('price')"
      />
      <FormGroup
        id="quantity"
        v-model="localProduct.quantity"
        label="Quantidade"
        type="number"
        inputmode="numeric"
        placeholder="Opcional"
        :error="errors.quantity"
        @blur="touch('quantity')"
      />
      <FormGroup
        id="description"
        v-model="localProduct.description"
        label="Descrição"
        placeholder="Descrição do produto"
        :maxlength="DESCRIPTION_MAX"
        :error="errors.description"
        @blur="touch('description')"
      />

      <!-- Seletor de arquivo com a cara de um botão secundário -->
      <div class="file-picker" :class="{ 'has-error': imageError }">
        <span class="file-picker__label">Imagem</span>
        <div class="file-picker__row">
          <label for="image" class="file-picker__button">
            <input
              id="image"
              type="file"
              :accept="IMAGE_TYPES.join(',')"
              class="visually-hidden"
              :required="mode === 'add'"
              :aria-invalid="imageError ? 'true' : undefined"
              :aria-describedby="imageDescribedBy"
              @change="uploadImage"
            />
            Escolher imagem
          </label>
          <span class="file-picker__name">{{ fileName || imageStatus }}</span>
        </div>
        <p id="image-ajuda" class="file-picker__help">{{ IMAGE_HELP }}</p>
        <p v-if="imageError" id="image-erro" class="file-picker__error">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" aria-hidden="true" />
          {{ imageError }}
        </p>
      </div>
    </form>

    <template #footer>
      <div class="modal-product__actions">
        <BaseButton variant="secondary" @click="cancelAction">Cancelar</BaseButton>
        <BaseButton type="submit" form="produto-form" :loading="readingImage">Salvar</BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { useFormValidation } from "@/composables/useFormValidation";
import {
  DESCRIPTION_MAX,
  IMAGE_HELP,
  IMAGE_TYPES,
  NAME_MAX,
  emptyProduct,
  formatPriceInput,
  readProductImage,
  toProduct,
  validateProductDescription,
  validateProductName,
  validateProductPrice,
  validateProductQuantity,
} from "@/utils/productForm";
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
    default: emptyProduct,
  },
});

const emit = defineEmits(["close", "submit", "cancel"]);

// Cópia local do produto, com o preço no formato do campo ("25,90")
const toForm = (product) => ({
  ...emptyProduct(),
  ...product,
  price: formatPriceInput(product.price) || String(product.price ?? ""),
  quantity: String(product.quantity ?? ""),
});

const formRef = ref(null);
const localProduct = ref(toForm(props.product));
// Imagem com que o modal abriu: um arquivo recusado volta a ela
const openedImage = ref(localProduct.value.image);
const fileName = ref("");
const imageError = ref("");
const readingImage = ref(false);

const { errors, touch, validateAll, firstInvalid } = useFormValidation(localProduct, {
  name: validateProductName,
  price: validateProductPrice,
  quantity: validateProductQuantity,
  description: validateProductDescription,
});

// Atualiza o localProduct caso a prop "product" seja alterada
watch(
  () => props.product,
  (newProduct) => {
    localProduct.value = toForm(newProduct);
    openedImage.value = localProduct.value.image;
    fileName.value = "";
    imageError.value = "";
  }
);

const imageStatus = computed(() => {
  if (readingImage.value) return "Lendo a imagem…";
  return localProduct.value.image ? "Imagem atual" : "Nenhuma imagem escolhida";
});

const imageDescribedBy = computed(() =>
  imageError.value ? "image-erro image-ajuda" : "image-ajuda"
);

const closeModal = () => emit("close");

const cancelAction = () => {
  emit("cancel");
  closeModal();
};

// A leitura da imagem termina depois do clique em "Salvar" se o arquivo acabou de ser
// escolhido: o envio espera por ela
let pendingRead = Promise.resolve();
let lastUpload = 0;

const uploadImage = (event) => {
  const input = event.target;
  const file = input.files?.[0];
  if (!file) return;

  const upload = ++lastUpload;
  readingImage.value = true;
  fileName.value = "";
  pendingRead = readProductImage(file).then((result) => {
    // Só vale a última escolha
    if (upload !== lastUpload) return;
    readingImage.value = false;
    if (result.error) {
      // O arquivo recusado não entra: volta a imagem com que o modal abriu
      imageError.value = result.error;
      localProduct.value.image = openedImage.value;
      // Permite escolher o mesmo arquivo de novo depois de corrigi-lo
      input.value = "";
      return;
    }
    imageError.value = "";
    fileName.value = file.name;
    localProduct.value.image = result.dataUrl;
  });
};

// Sem imagem, o produto não sai. Na edição, depois de um arquivo recusado, a imagem atual vale
const validateImage = () => {
  if (localProduct.value.image) return true;
  imageError.value = "Escolha uma imagem para o produto.";
  return false;
};

const focusField = async (id) => {
  await nextTick();
  formRef.value?.querySelector(`#${id}`)?.focus();
};

// Um envio por vez: o Enter num campo durante a leitura da imagem não duplica o produto
let submitting = false;

const handleSubmit = async () => {
  if (submitting) return;
  submitting = true;
  try {
    await pendingRead;

    const fieldsValid = validateAll();
    const imageValid = validateImage();
    if (!fieldsValid || !imageValid) {
      focusField(fieldsValid ? "image" : firstInvalid());
      return;
    }

    // Quem abriu o modal fecha depois de salvar; se não salvar (sem espaço para a imagem,
    // por exemplo), o formulário continua aberto e preenchido
    emit("submit", toProduct(localProduct.value));
  } finally {
    submitting = false;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_modal-products";
</style>

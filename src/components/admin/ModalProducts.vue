<template>
  <section class="modal-product">
    <div class="modal-product__container">
      <div class="modal-product__header">
        <h3>{{ mode === "edit" ? "Editar Produto" : "Adicionar Produto" }}</h3>
        <button
          type="button"
          class="close-modal-admin"
          @click="closeModal"
          aria-label="Fechar modal"
        >
          &times;
        </button>
      </div>

      <div class="modal-product__select">
        <label for="productType">Selecione o tipo de produto:</label>
        <select id="productType" v-model="localProduct.category">
          <option value="foods">Hambúrguer</option>
          <option value="desserts">Sobremesa</option>
          <option value="drinks">Bebida</option>
        </select>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nome do Produto:</label>
          <input
            type="text"
            id="name"
            v-model="localProduct.name"
            placeholder="Informe o nome"
            required
          />
        </div>
        <div class="form-group">
          <label for="price">Preço:</label>
          <input
            type="text"
            id="price"
            v-model="localProduct.price"
            placeholder="Informe o preço"
            required
          />
        </div>
        <div class="form-group">
          <label for="quantity">Quantidade:</label>
          <input
            type="number"
            id="quantity"
            v-model="localProduct.quantity"
            placeholder="Informe a quantidade"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Descrição:</label>
          <input
            type="text"
            id="description"
            v-model="localProduct.description"
            placeholder="Descrição do produto"
          />
        </div>
        <div class="form-group">
          <label for="image">Imagem:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            @change="uploadImage"
            :required="mode === 'add'"
          />
        </div>

        <div class="modal-product__buttons">
          <ButtonComponent
            :buttons="[
              {
                label: mode === 'edit' ? 'Salvar Alterações' : 'Confirmar',
                id: 'confirm',
              },
            ]"
            backgroundColor="#3498db"
            @click="handleSubmit"
          />
          <ButtonComponent
            :buttons="[{ label: 'Cancelar', id: 'cancel' }]"
            backgroundColor="#e74c3c"
            @click="cancelAction"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import { useButtonHandlers } from "@/utils/buttonHandlers";
import ButtonComponent from "@/components/ButtonComponent.vue";

const props = defineProps({
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

const { handleImageUpload, handleCloseModal } = useButtonHandlers();

// Cria uma cópia local do produto para edição
const localProduct = ref({ ...props.product });

// Atualiza o localProduct caso a prop "product" seja alterada
watch(
  () => props.product,
  (newProduct) => {
    localProduct.value = { ...newProduct };
  }
);

const closeModal = () => handleCloseModal(emit);

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
  handleImageUpload(event, localProduct);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_modal-products";
// Adapte os estilos conforme sua necessidade
</style>

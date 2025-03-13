<template>
  <section class="modal-add-products">
    <div class="modal-add-products__container">
      <div class="modal-add-products__header">
        <ButtonComponent
          :buttons="[{ label: 'Fechar', id: 'close' }]"
          @click="closeModal"
        />
      </div>

      <div class="modal-add-products__select">
        <label for="productType">Selecione o tipo de produto:</label>
        <select id="productType" v-model="selectedType">
          <option value="foods">Novo Hambúrguer</option>
          <option value="desserts">Nova Sobremesa</option>
          <option value="drinks">Bebida</option>
        </select>
      </div>

      <form @submit.prevent="handleModalButtons">
        <div class="form-group">
          <label for="name">Nome do Produto:</label>
          <input
            type="text"
            id="name"
            v-model="product.name"
            placeholder="Informe o nome"
            required
          />
        </div>
        <div class="form-group">
          <label for="price">Preço:</label>
          <input
            type="text"
            id="price"
            v-model="product.price"
            placeholder="Informe o preço"
            required
          />
        </div>
        <div class="form-group">
          <label for="quantity">Quantidade:</label>
          <input
            type="number"
            id="quantity"
            v-model="product.quantity"
            placeholder="Informe a quantidade"
            required
          />
        </div>
        <!-- Exemplo de campo adicional, se necessário -->
        <div class="form-group">
          <label for="description">Descrição:</label>
          <input
            type="text"
            id="description"
            v-model="product.description"
            placeholder="Descrição do produto"
          />
        </div>
        <div class="form-group">
          <label for="image">Imagem:</label>
          <input type="file" id="image" accept="image/*" required />
        </div>

        <div class="modal-add-products__buttons">
          <ButtonComponent
            :buttons="[
              { id: 'confirm', label: 'Confirmar' },
              { id: 'cancel', label: 'Cancelar' },
            ]"
            :gap="16"
            @click="handleModalButtons"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useButtonHandlers } from "@/utils/buttonHandlers.js";
import { useProductsStore } from "@/stores/products.js";
import ButtonComponent from "@/components/ButtonComponent.vue";

// Define as variáveis dos handlers
const { handleCloseModal, handleFormReset } = useButtonHandlers();

// Variável para armazenar o tipo de produto selecionado
const selectedType = ref("foods");

// Objeto para armazenar os dados do formulário
const product = ref({
  name: "",
  price: "",
  quantity: "",
  description: "",
  // verificar o código para fazer o upload da imagem
  image: "",
});

// Emite somente o evento de fechar o modal
const emit = defineEmits(["close"]);

const productsStore = useProductsStore();

// Método para fechar o modal
const closeModal = () => {
  handleCloseModal(emit);
};

/**
 * Lida com a ação dos botões do formulário.
 * Se o botão for 'confirm', monta o novo produto e o encaminha para o store;
 * Se o botão for 'cancel', reseta os campos do formulário.
 *
 * @param {Object} button - Objeto do botão clicado.
 */
const handleModalButtons = (button) => {
  if (button && button.id === "confirm") {
    const newProduct = {
      type: selectedType.value,
      ...product.value,
      category: selectedType.value,
      // Aqui você pode tratar o campo "image" conforme necessário
    };
    // Chama a ação do store para adicionar o produto
    productsStore.addProduct(newProduct);

    handleFormReset(product);
    handleCloseModal(emit);
  } else if (button && button.id === "cancel") {
    handleFormReset(product);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_modal-add-products";
</style>

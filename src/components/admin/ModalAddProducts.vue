<template>
  <section class="modal-add-products">
    <div class="modal-add-products__container">
      <div class="modal-add-products__header">
        <ButtonComponent
          :buttons="[{ label: 'Fechar', id: 'close' }]"
          backgroundColor="#42b983"
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

      <!-- Formulário para adicionar novo produto -->
      <form @submit.prevent>
        <!-- Form group para o nome do produto -->
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
        <!-- Form group para o preço do produto -->
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
        <!-- Form group para a quantidade do produto -->
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
        <!-- Form group para a descrição geral do produto -->
        <div class="form-group">
          <label for="description">Descrição:</label>
          <input
            type="text"
            id="description"
            v-model="product.description"
            placeholder="Descrição do produto"
          />
        </div>
        <!-- Form group para a imagem do produto -->
        <div class="form-group">
          <label for="image">Imagem:</label>
          <input type="file" id="image" accept="image/*" required @change="imageUpload" />
        </div>

        <!-- Container para os botões do modal -->
        <div class="modal-add-products__buttons">
          <ButtonComponent
            :buttons="[{ label: 'Confirmar', id: 'confirm' }]"
            backgroundColor="#3498db"
            @click="onModalAction"
          />
          <ButtonComponent
            :buttons="[{ label: 'Cancelar', id: 'cancel' }]"
            backgroundColor="#f00"
            @click="onModalAction"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useButtonHandlers } from "@/utils/buttonHandlers.js";
import ButtonComponent from "@/components/ButtonComponent.vue";

// Define as variáveis dos handlers
const { handleCloseModal, handleModalButtons, handleImageUpload } = useButtonHandlers();

// Variável para armazenar o tipo de produto selecionado
const selectedType = ref("foods");

// Objeto para armazenar os dados do formulário
const product = ref({
  name: "",
  price: "",
  quantity: "",
  description: "",
  image: "",
});

// Evento para fechar o modal
const emit = defineEmits(["close"]);

// Método para fechar o modal
const closeModal = () => handleCloseModal(emit);

// Handle para upload de imagem
const imageUpload = (event) => handleImageUpload(event, product);

// Handler para ações dos botões
const onModalAction = (button) => {
  handleModalButtons(button, {
    selectedType,
    product,
    emit,
  });
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_modal-add-products";
</style>

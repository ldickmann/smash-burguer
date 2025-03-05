<template>
  <section class="modal-add-products">
    <!-- Container do modal  -->
    <div class="modal-add-products__container">
      <div class="modal-add-products__header">
        <!-- Botão para fechar o modal | Reutilizando o componente ButtonComponent -->
        <ButtonComponent
          :buttons="[{ label: 'Fechar', id: 'close' }]"
          @click="closeModal"
        />
      </div>

      <!-- Seletor para definir o tipo de produto -->
      <div class="modal-add-products__select">
        <label for="productType">Selecione o tipo de produto:</label>
        <select id="productType" v-model="selectedType">
          <option value="hamburguer">Novo Hambúrguer</option>
          <option value="sobremesa">Nova Sobremesa</option>
          <option value="bebida">Bebida</option>
        </select>
      </div>

      <!-- Formulário para adicionar Novo Hamburguer -->
      <!-- Formulário para adicionar Nova Sobremesa -->
      <!-- Formulário para adicionar Bebida -->

      <!-- Button para adicionar o produto (confirmar) -->
      <!-- Button para adicionar cancelar (cancelar) -->

      <!-- Formulário para adicionar o produto -->
      <form @submit.prevent="handleSubmit">
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

        <!-- Botões: confirmar e cancelar -->
        <div class="modal-add-products__buttons">
          <ButtonComponent
            :buttons="[{ id: 'confirm', label: 'Confirmar' }]"
            @click="handleSubmit"
          />
          <ButtonComponent
            :buttons="[{ id: 'cancel', label: 'Cancelar' }]"
            @click="resetForm"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

/* Variável para armazenar o tipo de produto selecionado */
const selectedType = ref("hamburguer");

const product = ref({
  name: "",
  price: "",
  quantity: "",
});

const emit = defineEmits(["close"]);

// Método para fechar o modal closeModal
const closeModal = () => {
  emit("close");
};

const handleSubmit = () => {
  // Exibe as informações do produto juntamente com o tipo selecionado
  console.log("Produto adicionado:", { type: selectedType.value, ...product.value });
  addProducts();
  resetForm();
};

const addProducts = () => {
  // Lógica para adicionar o produto (ex.: chamada de API ou atualização de estado)
  console.log({ type: selectedType.value, ...product.value });
};

/* Função para resetar o formulário */
const resetForm = () => {
  product.value = { name: "", price: "", quantity: "" };
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_modal-add-products";
</style>

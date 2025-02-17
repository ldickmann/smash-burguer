<template>
  <section class="product-management">
    <div class="management-container">
      <header class="page-header">
        <h2>Gestão de Produtos</h2>
        <ButtonComponent
          :buttons="[{ label: 'Novo Produto', id: 'add' }]"
          backgroundColor="#42b983"
          @click="showAddModal = true"
        />
      </header>
    </div>

    <div class="products-list">
      <AdminCard
        v-for="product in products"
        :key="product.id"
        :title="product.name"
        :loading="loading"
      >
        <template #header-actions>
          <div class="product-actions">
            <ButtonComponent
              :buttons="[{ label: 'Editar', id: 'edit' }]"
              @click="editProduct(product)"
            />
            <ButtonComponent
              :buttons="[{ label: 'Excluir', id: 'delete' }]"
              @click="deleteProduct(product.id)"
            />
          </div>
        </template>

        <div class="product-details">
          <img :src="product.image" :alt="product.name" />
          <p>{{ product.description }}</p>
          <p class="price">R$ {{ product.price.toFixed(2) }}</p>
        </div>
      </AdminCard>
    </div>
  </section>
</template>

<script setup>
import AdminCard from "@/components/admin/AdminCard.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/product-management';
</style>

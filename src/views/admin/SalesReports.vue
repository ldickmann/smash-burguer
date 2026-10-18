<template>
  <div class="sales-reports">
    <h1 class="admin-page__title">Relatórios</h1>

    <div class="sales-reports__grid">
      <AdminCard v-for="kpi in metrics" :key="kpi.id" :title="kpi.label" variant="kpi">
        <p class="kpi__value tabular">{{ kpi.value }}</p>
        <p class="kpi__note">{{ kpi.note }}</p>
      </AdminCard>

      <!-- Card de Produtos Mais Vendidos -->
      <AdminCard title="Produtos mais vendidos" class="sales-reports__top">
        <ol class="top-products">
          <li v-for="product in TOP_PRODUCTS" :key="product.id" class="top-products__item">
            <span class="top-products__row">
              <span>{{ product.name }}</span>
              <span class="top-products__qty tabular">{{ product.quantity }} un.</span>
            </span>
          </li>
        </ol>
      </AdminCard>
    </div>
  </div>
</template>

<script setup>
import { SALES_KPIS, TOP_PRODUCTS } from "@/utils/salesSample";
import AdminCard from "@/components/admin/AdminCard.vue";

// O destaque "Mais vendido" fica no Dashboard; aqui a lista completa
const metrics = SALES_KPIS.filter((kpi) => kpi.id !== "top");
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/admin/sales-reports";
</style>

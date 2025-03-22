<template>
  <main class="sales-reports">
    <div class="reports-container">
      <div class="page-header">
        <h1>
          <font-awesome-icon :icon="['fas', 'chart-line']" />
          Relatórios de Vendas
        </h1>
      </div>

      <div class="container-cards">
        <!-- Card de Vendas Totais -->
        <AdminCard title="Vendas Totais">
          <template #content>
            <div class="metric-card">
              <h3>R$ 12.450,00</h3>
              <p>Últimos 30 dias</p>
            </div>
          </template>
        </AdminCard>

        <!-- Card de Pedidos -->
        <AdminCard title="Total de Pedidos">
          <template #content>
            <div class="metric-card">
              <h3>324</h3>
              <p>Pedidos realizados</p>
            </div>
          </template>
        </AdminCard>

        <!-- Card de Ticket Médio -->
        <AdminCard title="Ticket Médio">
          <template #content>
            <div class="metric-card">
              <h3>R$ 38,42</h3>
              <p>Por pedido</p>
            </div>
          </template>
        </AdminCard>

        <!-- Card de Produtos Mais Vendidos -->
        <AdminCard title="Produtos Mais Vendidos">
          <template #content>
            <ul class="top-products">
              <li v-for="product in topProducts" :key="product.id">
                <span>{{ product.name }}</span>
                <span>{{ product.quantity }} un.</span>
              </li>
            </ul>
          </template>
        </AdminCard>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import AdminCard from "@/components/admin/AdminCard.vue";

const topProducts = ref([
  { id: 1, name: "Smash Burger", quantity: 156 },
  { id: 2, name: "Double Smash", quantity: 98 },
  { id: 3, name: "Chicken Burger", quantity: 87 },
  { id: 4, name: "Coca-Cola", quantity: 234 },
]);
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/admin/sales-reports";
</style>

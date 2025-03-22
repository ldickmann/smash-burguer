<template>
  <section class="order-management">
    <div class="management-container">
      <header class="page-header">
        <h1>Gestão de Pedidos</h1>
        <div class="filters">
          <select v-model="statusFilter">
            <option value="">Todos os Status</option>
            <option value="pending">Pendente</option>
            <option value="preparing">Preparando</option>
            <option value="delivery">Em Entrega</option>
            <option value="completed">Concluído</option>
          </select>
        </div>
      </header>

      <div class="orders-list">
        <AdminCard
          v-for="order in filteredOrders"
          :key="order.id"
          :title="`Pedido #${order.id}`"
        >
          <div class="order-info">
            <div class="customer-details">
              <h3>Cliente</h3>
              <p>{{ order.customerName }}</p>
              <p>{{ order.address }}</p>
              <p>{{ order.phone }}</p>
            </div>

            <div class="order-items">
              <h3>Itens</h3>
              <ul>
                <li v-for="item in order.items" :key="item.id">
                  {{ item.quantity }}x {{ item.name }} - R$ {{ item.price.toFixed(2) }}
                </li>
              </ul>
            </div>

            <div class="order-summary">
              <p class="total">Total: R$ {{ order.total.toFixed(2) }}</p>
              <p class="status" :class="order.status">Status: {{ order.status }}</p>
            </div>
          </div>

          <template #footer>
            <div class="order-actions">
              <ButtonComponent
                :buttons="[{ label: 'Atualizar Status', id: 'update' }]"
                backgroundColor="#42b983"
                @click="updateStatus(order)"
              />
              <ButtonComponent
                :buttons="[{ label: 'Detalhes', id: 'details' }]"
                backgroundColor="#3498db"
                @click="viewDetails(order)"
              />
            </div>
          </template>
        </AdminCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminCard from "@/components/admin/AdminCard.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

// Variavel para filtrar o status dos pedidos
const statusFilter = ref("");

// Dados mockados para simular os pedidos
const orders = ref([
  {
    id: 1,
    customerName: "João da Silva",
    address: "Rua dos Bobos, 0",
    phone: "(11) 99999-9999",
    items: [
      { id: 1, name: "Smash Burger", quantity: 2, price: 25.9 },
      { id: 2, name: "Coca-Cola", quantity: 1, price: 8.0 },
    ],
    total: 59.8,
    status: "pending",
  },
  {
    id: 2,
    customerName: "Maria de Souza",
    address: "Av. Paulista, 123",
    phone: "(11) 98888-8888",
    items: [
      { id: 3, name: "Veggie Burger", quantity: 1, price: 22.9 },
      { id: 4, name: "Suco de Abacaxi", quantity: 1, price: 6.0 },
    ],
    total: 28.9,
    status: "preparing",
  },
]);

// Função para filtrar os pedidos de acordo com o status
const filteredOrders = computed(() => {
  if (!statusFilter.value) return orders.value;
  return orders.value.filter((order) => order.status === statusFilter.value);
});

// Função para atualizar o status do pedido
const updateStatus = (order) => {
  console.log("Atualizando status do pedido", order.id);
  const statusIndex = order.statuses.indexOf(order.status);
  order.status = order.statuses[statusIndex + 1] || order.statuses[0];
};

// Função para visualizar os detalhes do pedido
const viewDetails = (order) => {
  console.log("Visualizando detalhes do pedido", order.id);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/order-management';
</style>

<template>
  <section class="order-management">
    <h1 class="admin-page__title order-management__title">Pedidos</h1>

    <FormGroup
      id="statusFilter"
      v-model="statusFilter"
      class="admin-page__filter"
      label="Status"
      type="select"
      :options="STATUS_FILTERS"
    />

    <ul v-if="filteredOrders.length" class="orders-list" role="list">
      <li v-for="order in filteredOrders" :key="order.id">
        <AdminCard :title="`Pedido #${order.id}`">
          <template #header-actions>
            <span class="status-chip" :class="`status-chip--${order.status}`">
              {{ STATUS_LABELS[order.status] ?? order.status }}
            </span>
          </template>

          <div class="order-info">
            <div class="order-info__block">
              <h3 class="order-info__title">Cliente</h3>
              <p>{{ order.customerName }}</p>
              <p class="order-info__muted">{{ order.address }}</p>
              <p class="order-info__muted tabular">{{ order.phone }}</p>
            </div>

            <div class="order-info__block">
              <h3 class="order-info__title">Itens</h3>
              <ul class="order-info__items" role="list">
                <li v-for="item in order.items" :key="item.id" class="order-info__item">
                  <span><span class="tabular">{{ item.quantity }}×</span> {{ item.name }}</span>
                  <span class="tabular">{{ formatPrice(item.price) }}</span>
                </li>
              </ul>
            </div>

            <p class="order-info__total">
              <span>Total</span>
              <span class="tabular">{{ formatPrice(order.total) }}</span>
            </p>
          </div>

          <template #footer>
            <div class="order-actions">
              <BaseButton variant="secondary" size="sm" @click="updateStatus(order)">
                Atualizar status
              </BaseButton>
              <BaseButton variant="ghost" size="sm" @click="viewDetails(order)">Detalhes</BaseButton>
            </div>
          </template>
        </AdminCard>
      </li>
    </ul>

    <EmptyState
      v-else
      icon="shopping-cart"
      title="Nenhum pedido com esse status"
      text="Escolha outro status no filtro."
    />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { formatPrice } from "@/utils/formatters";
import AdminCard from "@/components/admin/AdminCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import FormGroup from "@/components/FormGroup.vue";

const STATUS_LABELS = {
  pending: "Pendente",
  preparing: "Em preparo",
  delivery: "A caminho",
  completed: "Concluído",
};

const STATUS_FILTERS = [
  { value: "", label: "Todos" },
  ...Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label })),
];

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

// Função para atualizar o status do pedido (comportamento mantido; FLX-09 fora do escopo)
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

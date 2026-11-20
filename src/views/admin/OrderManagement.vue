<template>
  <section class="order-management">
    <h1 ref="titleRef" class="admin-page__title order-management__title" tabindex="-1">Pedidos</h1>

    <FormGroup
      id="statusFilter"
      v-model="statusFilter"
      class="admin-page__filter"
      label="Status"
      type="select"
      :options="STATUS_FILTERS"
    />

    <!-- Busca da barra do painel (?q=): o resultado é anunciado a leitores de tela -->
    <p v-if="query" class="admin-page__search-result" role="status">
      {{ searchSummary }}
      <button type="button" class="link-inline" @click="clearSearch">Limpar busca</button>
    </p>

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
              <BaseButton
                variant="secondary"
                size="sm"
                :disabled="order.status === LAST_STATUS"
                @click="updateStatus(order, $event)"
              >
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
      :title="query ? 'Nenhum pedido encontrado' : 'Nenhum pedido com esse status'"
      :text="query ? 'Confira o texto da busca ou escolha outro status.' : 'Escolha outro status no filtro.'"
    />

    <BaseDialog
      :open="Boolean(detailsOrder)"
      :title="detailsOrder ? `Pedido #${detailsOrder.id}` : ''"
      title-id="pedido-detalhes-titulo"
      max-width="520px"
      @close="detailsOrder = null"
    >
      <div v-if="detailsOrder" class="order-details">
        <dl class="order-details__info">
          <div>
            <dt>Status</dt>
            <dd>
              <span class="status-chip" :class="`status-chip--${detailsOrder.status}`">
                {{ STATUS_LABELS[detailsOrder.status] }}
              </span>
            </dd>
          </div>
          <div>
            <dt>Cliente</dt>
            <dd>{{ detailsOrder.customerName }}</dd>
          </div>
          <div>
            <dt>Endereço</dt>
            <dd>{{ detailsOrder.address }}</dd>
          </div>
          <div>
            <dt>Telefone</dt>
            <dd class="tabular">{{ detailsOrder.phone }}</dd>
          </div>
        </dl>

        <h3 class="order-info__title">Itens</h3>
        <ul class="order-details__items" role="list">
          <li v-for="item in detailsOrder.items" :key="item.id" class="order-details__item">
            <span class="order-details__name"><span class="tabular">{{ item.quantity }}×</span> {{ item.name }}</span>
            <span class="order-details__unit tabular">{{ formatPrice(item.price) }} cada</span>
            <span class="order-details__line tabular">{{ formatPrice(item.price * item.quantity) }}</span>
          </li>
        </ul>

        <p class="order-info__total">
          <span>Total</span>
          <span class="tabular">{{ formatPrice(detailsOrder.total) }}</span>
        </p>
      </div>
      <template #footer>
        <div class="order-details__actions">
          <BaseButton variant="secondary" @click="detailsOrder = null">Fechar</BaseButton>
        </div>
      </template>
    </BaseDialog>
  </section>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatPrice } from "@/utils/formatters";
import { ORDER_STATUSES, STATUS_LABELS, useAdminOrdersStore } from "@/stores/adminOrders";
import { useToastStore } from "@/stores/toast";
import { matchesSearch, searchQueryOf } from "@/utils/search";
import AdminCard from "@/components/admin/AdminCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import FormGroup from "@/components/FormGroup.vue";

const LAST_STATUS = ORDER_STATUSES.at(-1);

const STATUS_FILTERS = [
  { value: "", label: "Todos" },
  ...ORDER_STATUSES.map((value) => ({ value, label: STATUS_LABELS[value] })),
];

const ordersStore = useAdminOrdersStore();
const toast = useToastStore();
const route = useRoute();
const router = useRouter();
const titleRef = ref(null);

// O filtro fica no endereço (?status=pending), para os contadores da barra abrirem a
// tela já filtrada. Valor fora da lista vale como "Todos". A busca da barra (?q=) continua
const statusFilter = computed({
  get: () => (ORDER_STATUSES.includes(route.query.status) ? route.query.status : ""),
  set: (status) => router.replace({ query: { ...route.query, status: status || undefined } }),
});

// Busca pelo número do pedido, pelo cliente e pelos itens
const query = computed(() => searchQueryOf(route.query.q));

const filteredOrders = computed(() =>
  ordersStore.orders.filter(
    (order) =>
      (!statusFilter.value || order.status === statusFilter.value) &&
      matchesSearch(
        query.value.replace(/^#/, ""),
        String(order.id),
        order.customerName,
        ...order.items.map((item) => item.name)
      )
  )
);

const searchSummary = computed(() => {
  const count = filteredOrders.value.length;
  const found = count === 1 ? "1 pedido" : `${count} pedidos`;
  return `${found} para “${query.value}”.`;
});

const clearSearch = () => {
  router.replace({ query: { ...route.query, q: undefined } });
};

// Leva o pedido ao próximo status; o aviso anuncia a mudança também para leitores de tela.
// O botão sai da lista filtrada ou fica desabilitado em "Concluído": aí o foco vai para o título
const updateStatus = async (order, event) => {
  const button = event?.currentTarget;
  const status = ordersStore.advanceStatus(order.id);
  if (!status) return;
  toast.show({ message: `Pedido #${order.id}: ${STATUS_LABELS[status]}.` });
  await nextTick();
  if (button && (!button.isConnected || button.disabled)) titleRef.value?.focus();
};

// "Detalhes" abre o pedido num diálogo; ao fechar, o foco volta ao botão
const detailsOrder = ref(null);
const viewDetails = (order) => {
  detailsOrder.value = order;
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/order-management';
</style>

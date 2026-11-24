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

    <!-- Busca da barra do painel (?q=): a região existe antes da mensagem (vazia sem busca), para o
         leitor de tela anunciar o resultado; o "Limpar busca" fica fora dela -->
    <div class="admin-page__busca">
      <p class="admin-page__search-result" role="status" aria-atomic="true">{{ query ? searchSummary : "" }}</p>
      <BaseButton v-if="query" variant="ghost" size="sm" @click="clearSearch">Limpar busca</BaseButton>
    </div>

    <ul v-if="filteredOrders.length" class="orders-list" role="list">
      <li v-for="order in filteredOrders" :key="order.id">
        <AdminCard :title="`Pedido #${order.id}`">
          <template #header-actions>
            <M3RotuloStatus :tom="tomDoStatus(order.status)">
              {{ STATUS_LABELS[order.status] ?? order.status }}
            </M3RotuloStatus>
          </template>

          <div class="order-info">
            <div class="order-info__block">
              <h3 class="order-info__title">Cliente</h3>
              <p class="order-info__name">{{ order.customerName }}</p>
              <p class="order-info__muted">{{ order.address }}</p>
              <p class="order-info__muted tabular">{{ order.phone }}</p>
            </div>

            <div class="order-info__block">
              <h3 class="order-info__title">Itens</h3>
              <ul class="order-info__items" role="list">
                <li v-for="item in order.items" :key="item.id" class="order-info__item">
                  <span class="order-info__item-name"><span class="tabular">{{ item.quantity }}×</span> {{ item.name }}</span>
                  <!-- O unitário, com "cada", como no diálogo: o card não calcula o total da linha -->
                  <span class="order-info__item-price tabular">{{ formatPrice(item.price) }} cada</span>
                </li>
              </ul>
            </div>

            <p class="order-info__total">
              <span class="order-info__total-label">Total</span>
              <span class="order-info__total-value tabular">{{ formatPrice(order.total) }}</span>
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

    <!-- Com busca, o vazio fica fora da região: a linha da busca já diz "0 pedidos para …". Sem busca,
         ele fica numa região que existe sempre, para ser anunciado depois da escolha do status
         (desenho dos componentes base, §5.3) -->
    <EmptyState
      v-if="query && !filteredOrders.length"
      icon="shopping-cart"
      title="Nenhum pedido encontrado"
      text="Confira o texto da busca ou escolha outro status."
    />
    <div role="status" aria-atomic="true">
      <EmptyState
        v-if="!query && !filteredOrders.length"
        icon="shopping-cart"
        title="Nenhum pedido com esse status"
        text="Escolha outro status no filtro."
      />
    </div>

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
              <M3RotuloStatus :tom="tomDoStatus(detailsOrder.status)">
                {{ STATUS_LABELS[detailsOrder.status] ?? detailsOrder.status }}
              </M3RotuloStatus>
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
          <span class="order-info__total-label">Total</span>
          <span class="order-info__total-value tabular">{{ formatPrice(detailsOrder.total) }}</span>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
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
import M3RotuloStatus from "@/components/ui/M3RotuloStatus.vue";

const LAST_STATUS = ORDER_STATUSES.at(-1);

// Tom do rótulo por status (só apresentação): "Em preparo" e "A caminho" no mesmo info, porque o texto
// os distingue; status fora da lista não chega à tela (a store o tira), e cairia no info
const TONS = { pending: "aviso", preparing: "info", delivery: "info", completed: "sucesso" };
const tomDoStatus = (status) => TONS[status] ?? "info";

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

// O aviso fica no pé e a reserva dele no scroll-padding, mas o foco que não se move não rola: o botão
// focado pelo teclado (que vê o anel) rola para cima do aviso. Quem toca ou clica não vê o anel, e a
// página pularia: a última entrada decide (como no CartView e no ProfileView)
let ultimaPorPonteiro = false;
const marcarPonteiro = () => {
  ultimaPorPonteiro = true;
};
const marcarTeclado = () => {
  ultimaPorPonteiro = false;
};
onMounted(() => {
  document.addEventListener("pointerdown", marcarPonteiro, true);
  document.addEventListener("keydown", marcarTeclado, true);
});
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", marcarPonteiro, true);
  document.removeEventListener("keydown", marcarTeclado, true);
});

// Leva o pedido ao próximo status; o aviso anuncia a mudança também para leitores de tela.
// O botão sai da lista filtrada ou fica desabilitado em "Concluído": aí o foco vai para o título.
// Se ele continua focado, a view o rola para fora de baixo do aviso (só pelo teclado). O jsdom não tem
// scrollIntoView
const updateStatus = async (order, event) => {
  const button = event?.currentTarget;
  const status = ordersStore.advanceStatus(order.id);
  if (!status) return;
  toast.show({ message: `Pedido #${order.id}: ${STATUS_LABELS[status]}.` });
  await nextTick();
  if (button && (!button.isConnected || button.disabled)) {
    titleRef.value?.focus();
    return;
  }
  if (ultimaPorPonteiro) return;
  document.activeElement?.scrollIntoView?.({ block: "nearest" });
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

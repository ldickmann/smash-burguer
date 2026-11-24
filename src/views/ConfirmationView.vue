<!-- Confirmação (desenho do Carrinho, §5.9): uma pilha de dois segmentos numa coluna central [66][8]. A
     faixa primary-container diz o estado (o check, o h1 e o número e a forma do pedido numa dl) e se
     cola ao resumo somente leitura. Sem prensa, disco nem foto: não repete o hero da Home. Nada se move.
     Os dados do pedido dentro da faixa são desvio registrado da SPEC-material §5.7. -->
<template>
  <div class="confirmation-page container">
    <div v-if="order" class="confirmation-page__coluna">
      <div class="confirmation-page__pilha">
        <div class="confirmation-page__status">
          <font-awesome-icon
            :icon="['fas', 'circle-check']"
            class="confirmation-page__icone"
            aria-hidden="true"
          />
          <h1 ref="titleRef" class="confirmation-page__title" tabindex="-1">Pedido recebido</h1>
          <dl class="confirmation-page__dados">
            <div>
              <dt>Pedido</dt>
              <dd class="tabular">#{{ order.id }}</dd>
            </div>
            <div>
              <dt>Forma de pagamento</dt>
              <dd>{{ order.paymentMethod }}</dd>
            </div>
          </dl>
        </div>

        <OrderSummary :items="order.items" variant="readonly" class="confirmation-page__resumo" />
      </div>

      <div class="confirmation-page__acoes">
        <BaseButton size="lg" to="/menu">Voltar ao cardápio</BaseButton>
        <BaseButton variant="secondary" size="lg" to="/profile#seus-pedidos">Ver meus pedidos</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import BaseButton from "@/components/ui/BaseButton.vue";
import OrderSummary from "@/components/OrderSummary.vue";

const userStore = useUserStore();
const titleRef = ref(null);

const order = computed(() =>
  (userStore.orderHistory ?? []).find((item) => item.id === userStore.lastOrderId)
);

// O título recebe o foco ao montar
onMounted(() => titleRef.value?.focus());
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/confirmation";
</style>

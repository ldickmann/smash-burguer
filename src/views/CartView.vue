<!-- Carrinho (desenho do Carrinho, §3 e §5.1 a §5.5): o h1 na superfície; a lista numa bandeja
     surface-container-low de cantos concêntricos, nomeada por um h2 escondido; o resumo num contêiner
     da página, com os CTAs de quem entrou ou do visitante. Sem itens, o EmptyState. -->
<template>
  <div class="cart-page container">
    <h1 ref="titleRef" class="cart-page__title" tabindex="-1">Seu carrinho</h1>

    <EmptyState
      v-if="!cartStore.items.length"
      icon="shopping-cart"
      title="Seu carrinho está vazio"
      text="Escolha um burger no cardápio para começar."
    >
      <template #action>
        <BaseButton to="/menu">Ver cardápio</BaseButton>
      </template>
    </EmptyState>

    <div v-else class="cart-page__layout">
      <section class="cart-page__lista" aria-labelledby="itens-titulo">
        <h2 id="itens-titulo" class="visually-hidden">Itens do carrinho</h2>
        <ul ref="listRef" class="cart-page__itens" role="list">
          <CartItem
            v-for="(item, index) in cartStore.items"
            :key="`${item.productId}-${item.category}-${index}`"
            :item="item"
            :index="index"
            @update-quantity="cartStore.updateQuantity"
            @remove="removeItem"
          />
        </ul>
      </section>

      <OrderSummary :items="cartStore.items" variant="cart" class="cart-page__resumo">
        <template #cta>
          <template v-if="userStore.isAuthenticated">
            <BaseButton size="lg" block to="/payment">Finalizar pedido</BaseButton>
            <BaseButton variant="ghost" block to="/menu">Continuar comprando</BaseButton>
          </template>

          <!-- Visitante: links para entrar ou criar conta, voltando ao pagamento -->
          <template v-else>
            <p class="cart-page__notice">Entre para finalizar seu pedido.</p>
            <BaseButton size="lg" block :to="{ path: '/login', query: { redirect: '/payment' } }">
              Entrar e finalizar
            </BaseButton>
            <BaseButton
              variant="secondary"
              block
              :to="{ path: '/register', query: { redirect: '/payment' } }"
            >
              Criar conta
            </BaseButton>
          </template>
        </template>
      </OrderSummary>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/userStore";
import { useToastStore } from "@/stores/toast";
import BaseButton from "@/components/ui/BaseButton.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import CartItem from "@/components/CartItem.vue";
import OrderSummary from "@/components/OrderSummary.vue";

const cartStore = useCartStore();
const userStore = useUserStore();
const toastStore = useToastStore();

const titleRef = ref(null);
const listRef = ref(null);

const removeButtons = () => listRef.value?.querySelectorAll("[data-remove]") ?? [];

// A reserva do aviso no scroll-padding protege o foco de quem usa o teclado, que vê o anel. Quem toca ou
// clica não vê o anel, e o foco rolado faria a página pular: a última entrada decide se a página rola
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
const focar = (elemento) => elemento?.focus({ preventScroll: ultimaPorPonteiro });

// Tira o item na hora e oferece "Desfazer" por 5 s, devolvendo-o à mesma posição
const removeItem = async (index) => {
  const removed = cartStore.removeItem(index);
  if (!removed) return;

  toastStore.show({
    message: `${removed.name} removido.`,
    variant: "info",
    duration: 5000,
    action: {
      label: "Desfazer",
      icon: "rotate-left",
      // O botão "Desfazer" some com o aviso: o foco vai ao "Remover" do item devolvido, e não ao body
      onClick: async () => {
        cartStore.restoreItem(removed, index);
        await nextTick();
        focar(removeButtons()[Math.min(index, cartStore.items.length - 1)]);
      },
    },
  });

  // O botão que tinha o foco sumiu: o foco vai para o "Remover" vizinho ou para o título
  await nextTick();
  const buttons = removeButtons();
  const next = buttons[Math.min(index, buttons.length - 1)];
  focar(next ?? titleRef.value);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/cart-page";
</style>

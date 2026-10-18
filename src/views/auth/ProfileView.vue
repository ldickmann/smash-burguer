<template>
  <div class="profile-page container">
    <header class="profile-page__header">
      <h1 class="profile-page__title">Sua conta</h1>
      <BaseButton variant="ghost" icon-start="sign-out-alt" @click="handleLogout">Sair</BaseButton>
    </header>

    <div class="profile-page__layout">
      <section class="profile-page__card" aria-labelledby="seus-dados">
        <h2 id="seus-dados" class="profile-page__section-title">Seus dados</h2>

        <form class="profile-page__form" novalidate @submit.prevent="handleUpdateProfile">
          <FormGroup id="firstName" v-model="userInfo.firstName" label="Nome" autocomplete="given-name" />
          <FormGroup id="lastName" v-model="userInfo.lastName" label="Sobrenome" autocomplete="family-name" />
          <FormGroup id="email" v-model="userInfo.email" label="E-mail" type="email" autocomplete="email" />
          <FormGroup
            id="phone"
            v-model="userInfo.phone"
            label="Celular"
            type="tel"
            mask="phone"
            inputmode="tel"
            autocomplete="tel-national"
          />
          <FormGroup
            id="CEP"
            v-model="userInfo.CEP"
            label="CEP"
            mask="cep"
            inputmode="numeric"
            autocomplete="postal-code"
            :error="cep.error.value"
            :helper="cep.loading.value ? 'Buscando endereço…' : 'Rua, bairro, cidade e UF vêm do CEP.'"
            :loading="cep.loading.value"
          />
          <!-- Preenchidos pelo CEP -->
          <FormGroup id="street" v-model="userInfo.address.street" label="Rua" readonly />
          <FormGroup id="neighborhood" v-model="userInfo.address.neighborhood" label="Bairro" readonly />
          <div class="profile-page__row">
            <FormGroup id="city" v-model="userInfo.address.city" label="Cidade" readonly />
            <FormGroup id="state" v-model="userInfo.address.state" label="UF" readonly />
          </div>

          <BaseButton type="submit" variant="secondary" :loading="saving">
            {{ saving ? "Salvando…" : "Salvar alterações" }}
          </BaseButton>
        </form>
      </section>

      <section class="profile-page__card" aria-labelledby="seus-pedidos">
        <h2 id="seus-pedidos" class="profile-page__section-title">Seus pedidos</h2>

        <ul v-if="orders.length" class="profile-orders" role="list">
          <li v-for="order in orders" :key="order.id" class="profile-order">
            <div class="profile-order__head">
              <p class="profile-order__number">Pedido <span class="tabular">#{{ order.id }}</span></p>
              <span class="profile-order__status">{{ order.status }}</span>
            </div>
            <p class="profile-order__meta">
              <time :datetime="order.date" class="tabular">{{ formatDate(order.date) }}</time>
              · {{ formatItemCount(countItems(order)) }} ·
              <span class="tabular">{{ formatPrice(order.total) }}</span>
            </p>
            <details class="profile-order__details">
              <summary class="profile-order__summary">Ver itens</summary>
              <OrderSummary :items="order.items" variant="readonly" :show-title="false" />
            </details>
          </li>
        </ul>

        <EmptyState v-else icon="burger" title="Você ainda não fez pedidos">
          <template #action>
            <BaseButton to="/menu">Ver cardápio</BaseButton>
          </template>
        </EmptyState>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useToastStore } from "@/stores/toast";
import { useAuthHandlers } from "@/handlers/authHandlers";
import { useCepLookup } from "@/composables/useCepLookup";
import { formatItemCount, formatPrice } from "@/utils/formatters";
import FormGroup from "@/components/FormGroup.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import OrderSummary from "@/components/OrderSummary.vue";

const userStore = useUserStore();
const toastStore = useToastStore();
const { handleLogout } = useAuthHandlers();
const cep = useCepLookup();

// Carrega os dados do usuário (a rota exige sessão)
const userData = userStore.user ?? {};
const userInfo = ref({
  firstName: userData.firstName || "",
  lastName: userData.lastName || "",
  email: userData.email || "",
  phone: userData.phone || "",
  CEP: userData.CEP || "",
  address: {
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    ...(userData.address || {}),
  },
});

const saving = ref(false);

// O pedido mais recente primeiro
const orders = computed(() =>
  [...(userStore.orderHistory ?? [])].sort((a, b) => new Date(b.date) - new Date(a.date))
);

const countItems = (order) => order.items.reduce((total, item) => total + item.quantity, 0);

// dd/mm/aaaa, hh:mm
const formatDate = (date) =>
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(
    new Date(date)
  );

// Novo CEP: o endereço vem da consulta e os campos de endereço são só leitura
watch(
  () => userInfo.value.CEP,
  async (value, previous) => {
    if (value === previous) return;
    const address = await cep.lookup(value);
    if (address) {
      Object.assign(userInfo.value.address, address);
    } else if (cep.error.value) {
      Object.assign(userInfo.value.address, { street: "", neighborhood: "", city: "", state: "" });
    }
  }
);

const handleUpdateProfile = async () => {
  saving.value = true;
  try {
    await userStore.updateProfile(userInfo.value);
    toastStore.show({ message: "Dados salvos.", variant: "success" });
  } catch {
    toastStore.show({ message: "Não foi possível salvar. Tente de novo.", variant: "error" });
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/profile";
</style>

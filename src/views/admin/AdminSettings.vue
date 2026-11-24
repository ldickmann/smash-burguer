<template>
  <section class="admin-settings">
    <h1 class="admin-page__title admin-settings__title">Configurações</h1>

    <AdminCard title="Dados do painel" class="admin-settings__card">
      <p class="admin-settings__text">
        Os produtos criados, editados ou excluídos e o status dos pedidos ficam salvos neste
        navegador. Restaurar volta aos dados publicados com o site.
      </p>
      <template #footer>
        <div class="admin-settings__actions">
          <BaseButton variant="secondary" icon-start="rotate-left" @click="pending = 'catalog'">
            Restaurar cardápio original
          </BaseButton>
          <BaseButton variant="secondary" icon-start="rotate-left" @click="pending = 'orders'">
            Restaurar pedidos de exemplo
          </BaseButton>
        </div>
      </template>
    </AdminCard>

    <!-- Confirmação destrutiva: alertdialog com a descrição ligada e o foco no "Cancelar" -->
    <BaseDialog
      :open="Boolean(pending)"
      :title="pending ? RESETS[pending].title : ''"
      title-id="restaurar-titulo"
      max-width="480px"
      role="alertdialog"
      aria-describedby="restaurar-texto"
      @close="pending = null"
    >
      <p v-if="pending" id="restaurar-texto" class="admin-settings__dialog-text">{{ RESETS[pending].text }}</p>
      <template #footer>
        <div class="admin-settings__actions admin-settings__actions--fim">
          <BaseButton variant="secondary" autofocus @click="pending = null">Cancelar</BaseButton>
          <BaseButton variant="danger" icon-start="rotate-left" @click="confirmReset">Restaurar</BaseButton>
        </div>
      </template>
    </BaseDialog>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useProductsStore } from "@/stores/products";
import { useAdminOrdersStore } from "@/stores/adminOrders";
import { useToastStore } from "@/stores/toast";
import AdminCard from "@/components/admin/AdminCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";

const productsStore = useProductsStore();
const ordersStore = useAdminOrdersStore();
const toast = useToastStore();

const RESETS = {
  catalog: {
    title: "Restaurar o cardápio original?",
    text: "Os produtos criados no painel saem, e os editados ou excluídos voltam como eram. Não é possível desfazer.",
    done: "Cardápio original restaurado.",
    run: () => productsStore.resetCatalog(),
  },
  orders: {
    title: "Restaurar os pedidos de exemplo?",
    text: "Os pedidos voltam aos de exemplo, com o status do começo. Não é possível desfazer.",
    done: "Pedidos de exemplo restaurados.",
    run: () => ordersStore.resetOrders(),
  },
};

// Qual restauração espera a confirmação
const pending = ref(null);

const confirmReset = () => {
  const reset = RESETS[pending.value];
  pending.value = null;
  reset.run();
  toast.show({ message: reset.done });
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/admin/admin-settings";
</style>

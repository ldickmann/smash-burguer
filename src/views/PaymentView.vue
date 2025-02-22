<template>
  <section class="section-profile">
    <div class="profile-container">
      <div class="profile-content">
        <h1 class="profile-title">Meu Perfil</h1>

        <div class="profile-info">
          <div class="user-details">
            <h2>Informações Pessoais</h2>
            <form @submit.prevent="updateUserInfo">
              <FormGroup
                id="fullName"
                label="Nome Completo"
                v-model="userInfo.fullName"
                required
                type="text"
              />

              <FormGroup
                id="phone"
                label="Celular"
                v-model="userInfo.phone"
                required
                type="tel"
              />

              <FormGroup
                id="address"
                label="Endereço"
                v-model="userInfo.address"
                required
                type="textarea"
              />

              <button type="submit" class="save-button">Salvar Alterações</button>
            </form>
          </div>

          <!-- Histórico de Pedidos -->
          <div class="order-history">
            <h2>Histórico de Pedidos</h2>
            <div v-if="orderHistory.length" class="orders-list">
              <!-- ... código do histórico de pedidos ... -->
            </div>
            <p v-else class="no-orders">Nenhum pedido realizado ainda.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import FormGroup from "@/components/FormGroup.vue";

const router = useRouter();
const userStore = useUserStore();

const userInfo = ref({
  fullName: "",
  phone: "",
  address: "",
});
const orderHistory = ref([]);

onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.push("/login");
    return;
  }

  // Carregar dados do usuário
  const userData = userStore.user;
  if (userData) {
    userInfo.value = {
      fullName: userData.fullName || "",
      phone: userData.phone || "",
      address: userData.address || "",
    };
  }

  orderHistory.value = userStore.orderHistory || [];
});

const updateUserInfo = async () => {
  try {
    await userStore.updateProfile(userInfo.value);
    alert("Perfil atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    alert("Erro ao atualizar perfil");
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/payment";
</style>

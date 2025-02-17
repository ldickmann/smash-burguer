<template>
  <section class="profile-section">
    <div class="profile-container">
      <div class="profile-content">
        <h1 class="profile-title">Meu Perfil</h1>

        <div class="profile-info">
          <!-- Informações Pessoais -->
          <div class="profile-personal">
            <h2>Informações Pessoais</h2>
            <form @submit.prevent="handleUpdateProfile">
              <FormGroup
                id="fullName"
                label="Nome Completo"
                v-model="userInfo.fullName"
                type="text"
                required
                :error="formErrors.fullName"
              />

              <FormGroup
                id="email"
                label="E-mail"
                v-model="userInfo.email"
                type="email"
                required
                :error="formErrors.email"
              />

              <FormGroup
                id="phone"
                label="Celular"
                v-model="userInfo.phone"
                type="tel"
                required
                :error="formErrors.phone"
              />

              <FormGroup
                id="address"
                label="Endereço"
                v-model="userInfo.address"
                type="input"
                required
                :error="formErrors.address"
              />

              <ButtonComponent
                :buttons="[{ label: 'Salvar Alterações', id: 'save' }]"
                backgroundColor="#42b983"
                fontColor="#ffffff"
                fontSize="16px"
                buttonSize="0.75rem 1.5rem"
                borderRadius="6px"
              />
            </form>
          </div>

          <!-- Histórico de Pedidos -->
          <div class="profile-orders">
            <h2>Histórico de Pedidos</h2>
            <div v-if="orderHistory.length > 0" class="orders-list">
              <div v-for="order in orderHistory" :key="order.id" class="order-item">
                <div class="order-header">
                  <span class="order-date">{{ formatDate(order.date) }}</span>
                  <span class="order-status">{{ order.status }}</span>
                </div>
                <div class="order-details">
                  <div v-for="item in order.items" :key="item.id" class="order-product">
                    <span>{{ item.name }}</span>
                    <span>{{ formatPrice(item.price) }}</span>
                  </div>
                </div>
                <div class="order-total">
                  <span>Total:</span>
                  <strong>{{ formatPrice(order.total) }}</strong>
                </div>
              </div>
            </div>
            <div v-else class="no-orders">
              <p>Você ainda não realizou nenhum pedido</p>
              <router-link to="/menu" class="menu-link">Ver Cardápio</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AlertComponent v-if="showAlert" :message="alertMessage" />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { formatPrice } from "@/utils/formatters";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

const router = useRouter();
const userStore = useUserStore();

const userInfo = ref({
  fullName: "",
  email: "",
  phone: "",
  address: "",
});

const formErrors = ref({});
const orderHistory = ref([]);
const showAlert = ref(false);
const alertMessage = ref("");

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
      email: userData.email || "",
      phone: userData.phone || "",
      address: userData.address || "",
    };
  }

  orderHistory.value = userStore.orderHistory || [];
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

const handleUpdateProfile = async () => {
  try {
    await userStore.updateProfile(userInfo.value);
    alertMessage.value = "Perfil atualizado com sucesso!";
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    alertMessage.value = "Erro ao atualizar perfil";
    showAlert.value = true;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/profile";
</style>

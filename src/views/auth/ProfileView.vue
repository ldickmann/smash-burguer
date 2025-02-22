<template>
  <section class="profile-section">
    <div class="profile-container">
      <div class="profile-content">
        <h1 class="profile-title">Meu Perfil</h1>

        <!-- Container com forms de informações pessoais e histórico de pedidos -->
        <div class="profile-info">
          <div class="profile-personal">
            <h2>Informações Pessoais</h2>
            <form @submit.prevent="handleUpdateProfile">
              <FormGroup
                id="firstName"
                label="Primeiro Nome"
                v-model="userInfo.firstName"
                type="text"
                required
                :error="formErrors.fullName"
              />
              <FormGroup
                id="lastName"
                label="Sobrenome"
                v-model="userInfo.lastName"
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
                mask="phone"
                required
                :error="formErrors.phone"
              />
              <FormGroup
                id="CEP"
                label="CEP"
                v-model="userInfo.CEP"
                type="text"
                mask="cep"
                required
                :error="formErrors.CEP"
                @input="handleCEPInput"
              />
              <FormGroup
                id="street"
                label="Rua"
                v-model="userInfo.address.street"
                type="text"
                required
                :error="formErrors.street"
                :disabled="true"
              />
              <FormGroup
                id="neighborhood"
                label="Bairro"
                v-model="userInfo.address.neighborhood"
                type="text"
                required
                :error="formErrors.neighborhood"
                :disabled="true"
              />
              <FormGroup
                id="city"
                label="Cidade"
                v-model="userInfo.address.city"
                type="text"
                required
                :error="formErrors.city"
                :disabled="true"
              />
              <FormGroup
                id="state"
                label="Estado"
                v-model="userInfo.address.state"
                type="text"
                required
                :error="formErrors.state"
                :disabled="true"
              />
            </form>
            <ButtonComponent
              class="button-save-profile"
              :buttons="[{ label: 'Salvar Alterações', id: 'save' }]"
              backgroundColor="#42b983"
              fontColor="#ffffff"
              fontSize="16px"
              buttonSize="0.75rem 1.5rem"
              borderRadius="6px"
              :gap="0"
              @click="handleUpdateProfile"
            />
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

          <!-- Botão de Logout -->
          <ButtonComponent
            :buttons="[{ label: 'Sair', id: 'logout' }]"
            backgroundColor="#ff0000"
            fontColor="#ffffff"
            fontSize="16px"
            buttonSize="0.75rem 1.5rem"
            borderRadius="6px"
            :gap="0"
            @click="handleLogout"
          />
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
import { validateCEP } from "@/utils/validators";
import { useAuthHandlers } from "@/handlers/authHandlers";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

const router = useRouter();
const userStore = useUserStore();
const { handleLogout } = useAuthHandlers();

const userInfo = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  CEP: "",
  address: {
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  },
});

const formErrors = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  CEP: "",
  street: "",
  neighborhood: "",
  city: "",
  state: "",
});

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
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      CEP: userData.CEP || "",
      address: userData.address || {
        street: "",
        neighborhood: "",
        city: "",
        state: "",
      },
    };
  }

  orderHistory.value = userStore.orderHistory || [];
});

const handleCEPInput = async () => {
  formErrors.value.CEP = "";

  const cleanCEP = userInfo.value.CEP.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cleanCEP.length === 8) {
    try {
      const result = await validateCEP(cleanCEP);
      console.log("Resultado da validação:", result); // Debug

      if (result.isValid && result.address) {
        // Atualiza os campos de endereço de forma reativa
        Object.assign(userInfo.value.address, {
          street: result.address.street || "",
          neighborhood: result.address.neighborhood || "",
          city: result.address.city || "",
          state: result.address.state || "",
        });

        formErrors.value.CEP = ""; // Limpa erro se existir
      } else {
        formErrors.value.CEP = "CEP não encontrado";
        resetAddressFields();
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      formErrors.value.CEP = "Erro ao buscar CEP";
      resetAddressFields();
    }
  }
};

// Limpa os campos de endereço quando o CEP é alterado pelo usuário
const resetAddressFields = () => {
  Object.assign(userInfo.value.address, {
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

// Atualiza o perfil do usuário - Verificar pois tem que ser feito na API
const handleUpdateProfile = async () => {
  try {
    await userStore.updateProfile(userInfo.value);
    alertMessage.value = "Perfil atualizado com sucesso!";
    showAlert.value = true;
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

<template>
  <div class="profile-page container">
    <header class="profile-page__header">
      <h1 class="profile-page__title">Sua conta</h1>
      <BaseButton variant="ghost" icon-start="sign-out-alt" @click="handleLogout">Sair</BaseButton>
    </header>

    <div class="profile-page__layout">
      <section class="profile-page__secao" aria-labelledby="seus-dados">
        <h2 id="seus-dados" class="profile-page__section-title">Seus dados</h2>

        <form ref="formRef" class="profile-page__form" novalidate @submit.prevent="handleUpdateProfile">
          <FormGroup
            id="firstName"
            v-model="userInfo.firstName"
            label="Nome"
            autocomplete="given-name"
            :error="errors.firstName"
            required
            @blur="touch('firstName')"
          />
          <FormGroup
            id="lastName"
            v-model="userInfo.lastName"
            label="Sobrenome"
            autocomplete="family-name"
            :error="errors.lastName"
            required
            @blur="touch('lastName')"
          />
          <FormGroup
            id="email"
            v-model="userInfo.email"
            label="E-mail"
            type="email"
            autocomplete="email"
            :error="errors.email"
            required
            @blur="touch('email')"
          />
          <FormGroup
            id="phone"
            v-model="userInfo.phone"
            label="Celular"
            type="tel"
            mask="phone"
            inputmode="tel"
            autocomplete="tel-national"
            :error="errors.phone"
            required
            @blur="touch('phone')"
          />
          <FormGroup
            id="CEP"
            v-model="userInfo.CEP"
            label="CEP"
            mask="cep"
            inputmode="numeric"
            autocomplete="postal-code"
            :error="cepError"
            :helper="cep.loading.value ? 'Buscando endereço…' : 'Consultamos o CEP no ViaCEP para preencher rua, bairro, cidade e UF.'"
            :loading="cep.loading.value"
            live
            required
            @blur="touch('CEP')"
          />
          <!-- Preenchidos pelo CEP; com CEP único da cidade, rua e bairro ficam para a pessoa -->
          <FormGroup
            id="street"
            v-model="userInfo.address.street"
            :label="manual.street ? 'Rua e número' : 'Rua'"
            :readonly="!manual.street"
            :required="manual.street"
            :error="streetError"
            @blur="validateStreet"
          />
          <FormGroup
            id="neighborhood"
            v-model="userInfo.address.neighborhood"
            label="Bairro"
            :readonly="!manual.neighborhood"
          />
          <div class="profile-page__row">
            <FormGroup id="city" v-model="userInfo.address.city" label="Cidade" readonly />
            <FormGroup id="state" v-model="userInfo.address.state" label="UF" readonly />
          </div>

          <BaseButton type="submit" variant="secondary" block :loading="saving">
            {{ saving ? "Salvando…" : "Salvar alterações" }}
          </BaseButton>
        </form>

        <div class="profile-delete">
          <p class="profile-delete__text">
            Excluir a conta apaga deste navegador seus dados, o histórico de pedidos e o carrinho.
          </p>
          <BaseButton variant="danger" icon-start="trash-can" @click="deleteOpen = true">
            Excluir conta
          </BaseButton>
        </div>
      </section>

      <section class="profile-page__secao" aria-labelledby="seus-pedidos">
        <h2 id="seus-pedidos" class="profile-page__section-title">Seus pedidos</h2>

        <ul v-if="orders.length" class="profile-orders" role="list">
          <li v-for="order in orders" :key="order.id" class="profile-order">
            <!-- O total na linha do número; data, contagem e status em parágrafos, sem "·" (regra 7.g) -->
            <div class="profile-order__head">
              <p class="profile-order__number">Pedido <span class="tabular">#{{ order.id }}</span></p>
              <p class="profile-order__total tabular">{{ formatPrice(order.total) }}</p>
            </div>
            <div class="profile-order__meta">
              <p><time :datetime="order.date" class="tabular">{{ formatDate(order.date) }}</time></p>
              <p>{{ formatItemCount(countItems(order)) }}</p>
              <!-- Rótulo de status, e não chip: não é controle (sem foco, camada nem cursor) -->
              <M3RotuloStatus class="profile-order__status" tom="info">{{ order.status }}</M3RotuloStatus>
            </div>
            <details class="profile-order__details">
              <summary class="profile-order__summary">
                <font-awesome-icon
                  :icon="['fas', 'chevron-right']"
                  class="profile-order__chevron profile-order__chevron--fechado"
                  aria-hidden="true"
                />
                <font-awesome-icon
                  :icon="['fas', 'chevron-down']"
                  class="profile-order__chevron profile-order__chevron--aberto"
                  aria-hidden="true"
                />
                Ver itens
              </summary>
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

    <!-- Confirmação destrutiva: alertdialog com a descrição ligada, e o foco abre no "Cancelar", a ação
         menos destrutiva. O erro da exclusão aparece dentro do diálogo, numa região de alerta que existe
         desde a abertura: com o modal aberto, o aviso ficaria atrás do fundo (desenho dos componentes
         base, §5.2) -->
    <BaseDialog
      :open="deleteOpen"
      title="Excluir conta?"
      title-id="excluir-conta-titulo"
      max-width="480px"
      role="alertdialog"
      aria-describedby="excluir-conta-texto"
      @close="closeDeleteDialog"
    >
      <p id="excluir-conta-texto">
        Seus dados, o histórico de pedidos e o carrinho serão apagados deste navegador. Não é possível
        desfazer.
      </p>
      <div class="profile-delete__anuncio" role="alert" aria-atomic="true">
        <div v-if="erroExclusao" class="profile-delete__erro">
          <span class="profile-delete__erro-icone" aria-hidden="true">
            <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
          </span>
          <p>{{ erroExclusao }}</p>
        </div>
      </div>
      <template #footer>
        <div class="profile-delete__actions">
          <BaseButton variant="secondary" :disabled="deleting" autofocus @click="closeDeleteDialog">
            Cancelar
          </BaseButton>
          <BaseButton variant="danger" :loading="deleting" @click="confirmDelete">
            {{ deleting ? "Excluindo…" : "Excluir conta" }}
          </BaseButton>
        </div>
      </template>
    </BaseDialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useToastStore } from "@/stores/toast";
import { useAuthHandlers } from "@/handlers/authHandlers";
import { useCepLookup } from "@/composables/useCepLookup";
import { useManualAddress } from "@/composables/useManualAddress";
import { useFormValidation } from "@/composables/useFormValidation";
import { formatItemCount, formatPrice } from "@/utils/formatters";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateCEPFormat,
  validateCEP,
} from "@/utils/validators";
import FormGroup from "@/components/FormGroup.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import M3RotuloStatus from "@/components/ui/M3RotuloStatus.vue";
import OrderSummary from "@/components/OrderSummary.vue";

const userStore = useUserStore();
const toastStore = useToastStore();
const { handleLogout, handleDeleteAccount } = useAuthHandlers();
const cep = useCepLookup();

const addressOf = (data) => ({ street: "", neighborhood: "", city: "", state: "", ...data });
const digitsOf = (value) => String(value ?? "").replace(/\D/g, "");

// Carrega os dados do usuário (a rota exige sessão)
const userData = userStore.user ?? {};
const userInfo = ref({
  firstName: userData.firstName || "",
  lastName: userData.lastName || "",
  email: userData.email || "",
  phone: userData.phone || "",
  CEP: userData.CEP || "",
  address: addressOf(userData.address),
});

// Mesmas regras do cadastro
const { errors, touch, validateAll, firstInvalid } = useFormValidation(userInfo, {
  firstName: validateFirstName,
  lastName: validateLastName,
  email: validateEmail,
  phone: validatePhone,
  CEP: validateCEPFormat,
});

const formRef = ref(null);
const saving = ref(false);

// A reserva do aviso no scroll-padding protege o foco de quem usa o teclado, que vê o anel. Quem toca ou
// clica não vê o anel, e o foco rolado faria a página pular: a última entrada decide (como no CartView)
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
const deleteOpen = ref(false);
const deleting = ref(false);
// Erro da exclusão, mostrado dentro do diálogo; limpo ao abrir, ao fechar e antes de tentar de novo
const erroExclusao = ref("");
watch(deleteOpen, () => {
  erroExclusao.value = "";
});

// CEP a que pertence o endereço da tela ("" enquanto não há endereço para o CEP atual)
const addressCep = ref(
  Object.values(userInfo.value.address).some(Boolean) ? digitsOf(userInfo.value.CEP) : ""
);
const addressMatchesCep = () =>
  Boolean(addressCep.value) && addressCep.value === digitsOf(userInfo.value.CEP);

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

// Endereço salvo de um CEP sem rua (CEP único da cidade): a rua foi digitada, e continua
// editável. O endereço salvo não diz de onde a rua veio, então a tela consulta o CEP salvo ao
// abrir; sem resposta, os campos ficam só leitura (a não ser que a rua esteja vazia)
const { manual, streetError, setFromLookup, validateStreet } = useManualAddress(
  () => userInfo.value.address
);
if (addressCep.value && !userInfo.value.address.street) setFromLookup(userInfo.value.address);

onMounted(async () => {
  const savedCep = addressCep.value;
  if (!savedCep) return;
  const result = await validateCEP(savedCep);
  // O CEP pode ter mudado na tela enquanto a consulta corria
  if (result.isValid && addressCep.value === savedCep && addressMatchesCep()) {
    setFromLookup(result.address);
  }
});

// Consulta o CEP e põe o endereço na tela, se o campo ainda tiver esse CEP quando a resposta chegar
const lookupCep = async (value) => {
  const address = await cep.lookup(value);
  if (!address || userInfo.value.CEP !== value) return;
  userInfo.value.address = addressOf(address);
  addressCep.value = digitsOf(value);
  setFromLookup(address);
};

// Novo CEP: o endereço anterior sai na hora e o novo vem da consulta (campos só leitura,
// a não ser os que o CEP não trouxer)
watch(
  () => userInfo.value.CEP,
  (value, previous) => {
    if (value === previous) return;
    userInfo.value.address = addressOf();
    addressCep.value = "";
    setFromLookup(null);
    lookupCep(value);
  }
);

const cepError = computed(() => errors.CEP || cep.error.value);

const focusFirstError = async () => {
  await nextTick();
  const field =
    firstInvalid() ?? (!addressMatchesCep() ? "CEP" : streetError.value ? "street" : null);
  if (field) formRef.value?.querySelector(`#${field}`)?.focus();
};

// Com o aviso na tela (de sucesso ou de erro, no mesmo lugar), o botão focado pelo teclado rola para
// fora de baixo dele (a reserva fica no scroll-padding). O jsdom não tem scrollIntoView
// O aviso de erro não expira: o envio seguinte o tira antes de mostrar o resultado novo, para o
// "Dados salvos." não aparecer ao lado de um erro que já não vale
let avisoDeErro = null;
const avisar = async (aviso) => {
  if (avisoDeErro !== null) toastStore.dismiss(avisoDeErro);
  const id = toastStore.show(aviso);
  avisoDeErro = aviso.variant === "error" ? id : null;
  if (ultimaPorPonteiro) return;
  await nextTick();
  document.activeElement?.scrollIntoView?.({ block: "nearest" });
};

// Envio em andamento, inclusive a espera pela consulta do CEP: um segundo envio é ignorado
let submitting = false;

const handleUpdateProfile = async () => {
  if (submitting) return;
  submitting = true;
  try {
    // Uma consulta do CEP em andamento termina antes da validação (e a que falhou é refeita)
    if (!addressMatchesCep()) await lookupCep(userInfo.value.CEP);

    // A validação e a cópia dos dados (dentro do updateProfile) acontecem no mesmo instante
    const isValid = validateAll();
    const hasStreet = validateStreet();
    if (!isValid || !addressMatchesCep() || !hasStreet) {
      await focusFirstError();
      return;
    }

    saving.value = true;
    await userStore.updateProfile(userInfo.value);
    await avisar({ message: "Dados salvos.", variant: "success" });
  } catch {
    await avisar({ message: "Não foi possível salvar. Tente de novo.", variant: "error" });
  } finally {
    saving.value = false;
    submitting = false;
  }
};

const closeDeleteDialog = () => {
  if (!deleting.value) deleteOpen.value = false;
};

const confirmDelete = async () => {
  erroExclusao.value = "";
  deleting.value = true;
  const result = await handleDeleteAccount();
  deleting.value = false;

  if (result?.error) {
    erroExclusao.value = result.error;
    return;
  }
  deleteOpen.value = false;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/profile";
</style>

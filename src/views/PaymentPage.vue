<template>
  <section class="section-payment">
    <div class="payment-container">
      <div class="payment-steps">
        <h1 class="payment-title">Finalizar Pedido</h1>

        <!-- Step 1: Order Confirmation -->
        <div v-if="currentStep === 1" class="order-confirmation">
          <h2>Confirme seu Pedido</h2>
          <div class="cart-items">
            <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
              <span class="item-name">{{ item.name }}</span>
              <div class="item-details">
                <span class="item-quantity">Qtd: {{ item.quantity }}</span>
                <span class="item-price">{{ formatPrice(item.price) }}</span>
              </div>
            </div>
          </div>
          <div class="total">
            <strong>Total:</strong>
            <span>{{ formatPrice(total) }}</span>
          </div>
          <button class="confirm-button" @click="nextStep">Confirmar Pedido</button>
        </div>

        <!-- Step 2: Payment Method Selection -->
        <div v-if="currentStep === 2" class="payment-method">
          <h2>Forma de Pagamento</h2>
          <div class="payment-options">
            <div
              v-for="method in paymentMethods"
              :key="method.id"
              class="payment-option"
              :class="{ selected: selectedPaymentMethod === method.id }"
              @click="selectPaymentMethod(method.id)"
            >
              <img :src="method.icon" :alt="method.name" />
              <span>{{ method.name }}</span>
            </div>
          </div>
          <div class="buttons">
            <button class="back-button" @click="previousStep">Voltar</button>
            <button
              class="next-button"
              @click="nextStep"
              :disabled="!selectedPaymentMethod"
            >
              Continuar
            </button>
          </div>
        </div>

        <!-- Step 3: Payment Details -->
        <div v-if="currentStep === 3" class="payment-details">
          <h2>Detalhes do Pagamento</h2>

          <!-- PIX Payment Form -->
          <form
            v-if="selectedPaymentMethod === 'pix'"
            class="payment-form"
            @submit.prevent="generatePixKey"
          >
            <div class="form-group">
              <label for="fullName">Nome Completo</label>
              <input type="text" id="fullName" v-model="pixData.fullName" required />
            </div>

            <div class="form-group">
              <label for="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                v-model="pixData.cpf"
                maxlength="14"
                @input="formatCPF"
                placeholder="000.000.000-00"
                required
              />
            </div>

            <div v-if="pixKeyGenerated" class="pix-key-container">
              <h3>Chave PIX Gerada</h3>
              <div class="pix-qrcode">
                <img :src="pixQRCode" alt="QR Code PIX" />
              </div>
              <div class="pix-key">
                <span>{{ pixKey }}</span>
                <button type="button" class="copy-button" @click="copyPixKey">
                  Copiar Chave
                </button>
              </div>
              <p class="pix-instructions">
                Use a chave PIX acima para realizar o pagamento através do seu banco
              </p>
            </div>

            <div class="buttons">
              <button type="button" class="back-button" @click="previousStep">
                Voltar
              </button>
              <button v-if="!pixKeyGenerated" type="submit" class="pay-button">
                Gerar Chave PIX
              </button>
              <button
                v-else
                type="button"
                class="confirm-button"
                @click="confirmPixPayment"
              >
                Confirmar Pagamento
              </button>
            </div>
          </form>

          <!-- Credit/Debit Card Form -->
          <form v-else class="payment-form" @submit.prevent="confirmCardPayment">
            <div class="form-group">
              <label for="cardName">Nome no Cartão</label>
              <input type="text" id="cardName" v-model="cardData.name" required />
            </div>

            <div class="form-group">
              <label for="cardNumber">Número do Cartão</label>
              <input
                type="text"
                id="cardNumber"
                v-model="cardData.number"
                @input="formatCardNumber"
                maxlength="19"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="expiryDate">Validade</label>
                <input
                  type="text"
                  id="expiryDate"
                  v-model="cardData.expiry"
                  @input="formatExpiryDate"
                  placeholder="MM/AA"
                  maxlength="5"
                  required
                />
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  v-model="cardData.cvv"
                  maxlength="3"
                  required
                />
              </div>
            </div>

            <div class="buttons">
              <button type="button" class="back-button" @click="previousStep">
                Voltar
              </button>
              <button type="submit" class="pay-button">
                Pagar {{ formatPrice(total) }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useCartStore } from "../store/cart";
import { formatPrice } from "@/utils/formatters";

const router = useRouter();
const cartStore = useCartStore();

const currentStep = ref(1);
const selectedPaymentMethod = ref(null);

// PIX data
const pixData = ref({
  fullName: "",
  cpf: "",
});
const pixKeyGenerated = ref(false);
const pixKey = ref("");
const pixQRCode = ref("");

// Card data
const cardData = ref({
  name: "",
  number: "",
  expiry: "",
  cvv: "",
});

const paymentMethods = [
  { id: "credit", name: "Cartão de Crédito", icon: "/icons/credit-card.svg" },
  { id: "debit", name: "Cartão de Débito", icon: "/icons/debit-card.svg" },
  { id: "pix", name: "PIX", icon: "/icons/pix.svg" },
];

const total = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const nextStep = () => {
  currentStep.value++;
};

const previousStep = () => {
  currentStep.value--;
};

const selectPaymentMethod = (methodId) => {
  selectedPaymentMethod.value = methodId;
  pixKeyGenerated.value = false;
};

const formatCPF = (event) => {
  let value = event.target.value.replace(/\D/g, "");
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    pixData.value.cpf = value;
  }
};

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, "");
  value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  cardData.value.number = value;
};

const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, "");
  if (value.length >= 2) {
    value = value.substring(0, 2) + "/" + value.substring(2);
  }
  cardData.value.expiry = value;
};

const generatePixKey = async () => {
  // Simulating PIX key generation
  const randomKey = Math.random().toString(36).substring(2, 15);
  pixKey.value = `SMASHBURGER${randomKey}`;
  pixQRCode.value = "/images/qr-code-example.png"; // Replace with actual QR code
  pixKeyGenerated.value = true;
};

const copyPixKey = () => {
  navigator.clipboard.writeText(pixKey.value);
  alert("Chave PIX copiada!");
};

const confirmPixPayment = () => {
  alert("Pagamento PIX confirmado!");
  cartStore.clearCart();
  router.push("/confirmation");
};

const confirmCardPayment = () => {
  alert("Pagamento com cartão aprovado!");
  cartStore.clearCart();
  router.push("/confirmation");
};
</script>

<style lang="scss">
@use "@/assets/styles/pages/_payment.scss";
</style>

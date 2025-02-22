// Arquivo global para manipulação de botões
import router from "@/router";
import { useUserStore } from "@/stores/userStore";

export function useButtonHandlers() {
  // Importando store de usuário para lidar com a atualizaçao de dados do usuário
  const userStore = useUserStore();

  const handleButtonClick = (button) => {
    if (button.id === "cart-button") {
      router.push("/cart");
    }
  };

  const handleLogin = (button) => {
    if (button.id === "login-button") {
      router.push("/login");
    }
  };

  const handleRegister = (button) => {
    if (button.id === "register-button") {
      router.push("/register");
    }
  };

  const handleConfirmPayment = () => {
    // Atualizar para direcionar para rota de pagamento da API, quando codificar a API
    // router.push(`/payment/${selectedPaymentMethod.value}`);
    router.push("/confirmation");
  };

  return {
    handleButtonClick,
    handleLogin,
    handleRegister,
    handleConfirmPayment,
  };
}

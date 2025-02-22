// Arquivo global para manipulação de botões
import router from "@/router";

export function useButtonHandlers() {
  const handleButtonClick = (button) => {
    if (button.id === "cart-button") {
      router.push("/cart");
    }
  };

  const handleConfirmPayment = () => {
    // Atualizar para direcionar para rota de pagamento da API, quando codificar a API
    // router.push(`/payment/${selectedPaymentMethod.value}`);
    router.push("/confirmation");
  };

  return {
    handleButtonClick,
    handleConfirmPayment,
  };
}

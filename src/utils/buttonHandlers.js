// Arquivo global para manipulação de botões
import router from "@/router";
import { useProductsStore } from "@/stores/products.js";

export function useButtonHandlers() {
  const productsStore = useProductsStore();

  // Handlers de navegação
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

  // Handlers do componente ProductManagement.vue para editar produtos
  const handleEditProduct = (product) => {
    console.log("Editar produto", product);
  };

  // Handlers do componente ProductManagement.vue para excluir produtos
  const handleDeleteProduct = (productId) => {
    console.log("Produto excluído", productId);
  };

  // Handlers do componente ModalAddProduct.vue para fechar o modal
  const handleCloseModal = (emit) => {
    emit("close");
  };

  // Handlers do componente ModalAddProduct.vue para resetar o formulário
  const handleFormReset = (product) => {
    product.value = { name: "", price: "", quantity: "", description: "", image: "" };
  };

  const handleImageUpload = (event, product) => {
    const file = event.target.files[0];
    if (file) {
      // Simula upload convertendo para URL
      const reader = new FileReader();
      reader.onload = (e) => {
        product.value.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    handleButtonClick,
    handleConfirmPayment,
    handleEditProduct,
    handleDeleteProduct,
    handleCloseModal,
    handleFormReset,
    handleImageUpload,
  };
}

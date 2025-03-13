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

  // Handlers do componente ProductManagement.vue para editar produtos
  const handleEditProduct = (product) => {
    console.log("Editar produto", product);
  };

  // Handlers do componente ProductManagement.vue para excluir produtos
  const handleDeleteProduct = (productId) => {
    console.log("Produto excluído", productId);
  };

  // Handlers do componente ModalAddProduct.vue para adicionar produtos
  const handleProductAdded = (productsRef, newProduct) => {
    const id = productsRef.value.length + 1;
    const productObject = {
      id,
      description: newProduct.description || "",
      price: parseFloat(newProduct.price),
      image: "/images/foods/default-food.jpg", // Imagem padrão
      ingredients: [],
      category: newProduct.type,
    };
    productsRef.value.push(productObject);
  };

  // Handlers do componente ModalAddProduct.vue para fechar o modal
  const handleCloseModal = (emit) => {
    emit("close");
  };

  // Handlers do componente ModalAddProduct.vue para resetar o formulário
  const handleFormReset = (product) => {
    product.value = { name: "", price: "", quantity: "" };
  };

  // Handlers do component ModalAddProduct.vue
  const handleSubmitHandler = (selectedType, product, emit) => {
    const newProduct = {
      type: selectedType.value,
      ...product.value,
    };
    console.log("Novo produto", newProduct);
    emit("product-added", newProduct);
    handleFormReset(product);
    handleCloseModal(emit);
  };

  return {
    handleButtonClick,
    handleConfirmPayment,
    handleEditProduct,
    handleDeleteProduct,
    handleProductAdded,
    handleCloseModal,
    handleFormReset,
    handleSubmitHandler,
  };
}

// Handlers do formulário de produto do admin (ModalProducts.vue)
export function useButtonHandlers() {
  // Reseta o formulário de produto
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
    handleFormReset,
    handleImageUpload,
  };
}

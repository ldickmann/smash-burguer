// Fluxo "Adicionar" compartilhado pela Home e pelo Cardápio (SPEC §5.4, "Ao confirmar").
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { useAnnouncer } from "@/composables/useAnnouncer";
import { formatItemCount } from "@/utils/formatters";

export function useProductModal() {
  const cartStore = useCartStore();
  const { announce } = useAnnouncer();

  const isOpen = ref(false);
  const product = ref(null);
  // Contexto do card que abriu o modal (o flip do botão)
  let origin = null;

  const openModal = (item, context = null) => {
    product.value = item;
    origin = context;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  const confirm = (cartItem) => {
    // 1. Adiciona ao carrinho
    cartStore.addItem(cartItem);
    // 2. Fecha o diálogo; o BaseDialog devolve o foco ao botão "Adicionar" do card
    closeModal();
    // 3. O botão faz o flip; 4. o odômetro do CartBadge gira sozinho
    origin?.markAdded?.();
    // 5. Anúncio para leitor de tela
    announce(
      `${cartItem.name} adicionado ao carrinho. ${formatItemCount(cartStore.itemCount)} no carrinho.`
    );
  };

  return { isOpen, product, openModal, closeModal, confirm };
}

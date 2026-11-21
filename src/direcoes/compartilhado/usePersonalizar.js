// Abre o modal Personalizar real a partir de qualquer seção de uma Home de direção.
// A MolduraDirecao faz o provide; as seções chamam usePersonalizar() e recebem
// `personalizar(produto, contexto)`, o openModal do useProductModal. Nenhuma seção calcula
// preço nem chama o cartStore: quem adiciona ao carrinho é o próprio modal.
import { inject } from "vue";

export const CHAVE_PERSONALIZAR = Symbol("personalizar");

export function usePersonalizar() {
  const personalizar = inject(CHAVE_PERSONALIZAR, null);
  if (!personalizar) {
    throw new Error("usePersonalizar() precisa ser chamado dentro da MolduraDirecao.");
  }
  return personalizar;
}

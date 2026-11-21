// Abre o modal Personalizar real a partir de qualquer seção ou card (cópia de
// src/direcoes/compartilhado/usePersonalizar.js). Na produção, o provide fica nas views que
// renderizam o ModalAdditional (HomeView e MenuView): `provide(CHAVE_PERSONALIZAR, openModal)`, o
// openModal do useProductModal. Quem chama usePersonalizar() recebe `personalizar(produto, contexto)`;
// nenhuma seção calcula preço nem chama o cartStore: quem adiciona ao carrinho é o próprio modal.
import { inject } from "vue";

export const CHAVE_PERSONALIZAR = Symbol("personalizar");

export function usePersonalizar() {
  const personalizar = inject(CHAVE_PERSONALIZAR, null);
  if (!personalizar) {
    throw new Error(
      "usePersonalizar() precisa ser chamado dentro de uma view que faz o provide(CHAVE_PERSONALIZAR) do modal (HomeView ou MenuView)."
    );
  }
  return personalizar;
}

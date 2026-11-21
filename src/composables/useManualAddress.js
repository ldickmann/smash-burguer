// Endereço que a consulta do CEP não completou. Cidades pequenas têm um CEP só, e o ViaCEP
// devolve rua e bairro vazios: a pessoa preenche o que faltou, e a rua passa a ser
// obrigatória (sem ela, o pagamento não tem para onde entregar).
import { ref, watch } from "vue";

/**
 * @param {() => object|null} getAddress - o endereço do formulário
 */
export function useManualAddress(getAddress) {
  // Campos que a pessoa preenche porque o CEP não trouxe
  const manual = ref({ street: false, neighborhood: false });
  const streetError = ref("");

  /** Marca os campos que faltaram na resposta da consulta (ou nenhum, sem resposta). */
  const setFromLookup = (address) => {
    manual.value = {
      street: Boolean(address) && !address.street,
      neighborhood: Boolean(address) && !address.neighborhood,
    };
    streetError.value = "";
  };

  /** Com a rua a preencher, ela não pode ficar vazia. */
  const validateStreet = () => {
    const missing = manual.value.street && !String(getAddress()?.street ?? "").trim();
    streetError.value = missing ? "Informe a rua e o número." : "";
    return !missing;
  };

  // Depois do primeiro erro, a rua é conferida a cada digitação, como os outros campos: se o
  // erro só sumisse no blur, o botão de envio mudaria de lugar no meio do clique
  watch(
    () => getAddress()?.street,
    () => {
      if (streetError.value) validateStreet();
    }
  );

  return { manual, streetError, setFromLookup, validateStreet };
}

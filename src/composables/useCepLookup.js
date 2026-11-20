// Consulta de CEP no ViaCEP com estado de carregamento (cadastro e perfil).
import { ref } from "vue";
import { validateCEP } from "@/utils/validators";

export function useCepLookup() {
  const loading = ref(false);
  const error = ref("");
  const address = ref(null);
  let lastQuery = "";
  // Consulta em andamento do `lastQuery`, devolvida a quem pedir o mesmo CEP
  let pending = null;

  const run = async (digits) => {
    const result = await validateCEP(digits);

    // Outro CEP (ou um CEP incompleto) tomou o lugar deste: a resposta é descartada
    if (lastQuery !== digits) return null;

    pending = null;
    loading.value = false;
    address.value = result.isValid ? result.address : null;
    error.value = result.isValid ? "" : result.message;
    return address.value;
  };

  /**
   * @param {string} cep - CEP com ou sem máscara
   * @returns {Promise<object|null>} o endereço desse CEP, ou null
   */
  const lookup = (cep) => {
    const digits = String(cep ?? "").replace(/\D/g, "");
    if (digits.length !== 8) {
      lastQuery = "";
      pending = null;
      loading.value = false;
      address.value = null;
      error.value = "";
      return Promise.resolve(null);
    }
    if (digits === lastQuery) {
      if (pending) return pending;
      if (address.value) return Promise.resolve(address.value);
    }

    // Até a resposta chegar, nenhum endereço vale para o CEP novo
    lastQuery = digits;
    address.value = null;
    error.value = "";
    loading.value = true;
    pending = run(digits);
    return pending;
  };

  return { loading, error, address, lookup };
}

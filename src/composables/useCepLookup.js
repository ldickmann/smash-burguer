// Consulta de CEP no ViaCEP com estado de carregamento (cadastro e perfil).
import { ref } from "vue";
import { validateCEP } from "@/utils/validators";

export function useCepLookup() {
  const loading = ref(false);
  const error = ref("");
  const address = ref(null);
  let lastQuery = "";

  /**
   * @param {string} cep - CEP com ou sem máscara
   * @returns {Promise<object|null>} endereço ou null
   */
  const lookup = async (cep) => {
    const digits = String(cep ?? "").replace(/\D/g, "");
    if (digits.length !== 8) {
      lastQuery = "";
      address.value = null;
      error.value = "";
      return null;
    }
    if (digits === lastQuery && address.value) return address.value;

    lastQuery = digits;
    loading.value = true;
    error.value = "";
    const result = await validateCEP(digits);
    loading.value = false;

    // Uma consulta mais nova já começou: esta resposta é descartada
    if (lastQuery !== digits) return null;

    address.value = result.isValid ? result.address : null;
    error.value = result.isValid ? "" : result.message;
    return address.value;
  };

  return { loading, error, address, lookup };
}

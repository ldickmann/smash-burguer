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
  // Número da consulta mais recente: só a resposta dela muda o estado
  let latest = 0;

  const run = async (digits, id) => {
    const result = await validateCEP(digits);

    // Uma consulta mais nova tomou o lugar desta. Se for do mesmo CEP (digitado de novo),
    // quem esperava por esta recebe a resposta da nova; se for de outro CEP, recebe null
    if (id !== latest) return lastQuery === digits ? (pending ?? address.value) : null;

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
      latest += 1;
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
    latest += 1;
    lastQuery = digits;
    address.value = null;
    error.value = "";
    loading.value = true;
    pending = run(digits, latest);
    return pending;
  };

  return { loading, error, address, lookup };
}

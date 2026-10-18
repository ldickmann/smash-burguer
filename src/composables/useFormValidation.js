// Validação de formulário (SPEC §5.8): depois do primeiro blur, o campo é revalidado a
// cada digitação e o erro some assim que o valor fica válido.
import { reactive, watch } from "vue";

/**
 * @param {import('vue').Ref<object>} form - ref com os valores do formulário
 * @param {Record<string, (value: any, form: object) => { isValid: boolean, message: string }>} rules
 */
export function useFormValidation(form, rules) {
  const fields = Object.keys(rules);
  const errors = reactive(Object.fromEntries(fields.map((field) => [field, ""])));
  const touched = reactive({});

  const validateField = (field) => {
    const result = rules[field](form.value[field], form.value);
    errors[field] = result.isValid ? "" : result.message;
    return result.isValid;
  };

  const touch = (field) => {
    touched[field] = true;
    validateField(field);
  };

  fields.forEach((field) => {
    watch(
      () => form.value[field],
      () => {
        if (touched[field]) validateField(field);
      }
    );
  });

  // No envio todos os campos contam como tocados
  const validateAll = () =>
    fields
      .map((field) => {
        touched[field] = true;
        return validateField(field);
      })
      .every(Boolean);

  // Primeiro campo com erro, para receber o foco
  const firstInvalid = () => fields.find((field) => errors[field]);

  return { errors, touch, validateField, validateAll, firstInvalid };
}

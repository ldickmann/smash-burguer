// Formulário de produto do admin (ModalProducts.vue): valores iniciais, validação dos campos,
// leitura da imagem e conversão para o modelo do cardápio.

export const NAME_MAX = 60;
export const DESCRIPTION_MAX = 160;
export const QUANTITY_MAX = 9999;

// A imagem vira data URL e é copiada para o carrinho e o histórico, que ficam no
// localStorage: o limite deixa folga para a cota. A maior foto do cardápio tem ~160 kB
export const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const IMAGE_MAX_BYTES = 300 * 1024;
export const IMAGE_HELP = "PNG, JPEG ou WebP, com até 300 kB.";

/** Produto em branco, para o "Novo produto". */
export const emptyProduct = () => ({
  category: "foods",
  name: "",
  price: "",
  quantity: "",
  description: "",
  image: "",
});

const priceInput = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

/**
 * Preço do cardápio no formato do campo: 25.9 vira "25,90".
 * @param {unknown} price
 * @returns {string}
 */
export const formatPriceInput = (price) =>
  typeof price === "number" && Number.isFinite(price) ? priceInput.format(price) : "";

/**
 * Preço digitado no campo: "25,90", "25.90" ou "25". Sem separador de milhar.
 * @param {unknown} text
 * @returns {number} o preço, ou NaN se o texto não for um preço
 */
export const parsePrice = (text) => {
  const value = String(text ?? "").trim();
  if (!/^\d{1,4}([.,]\d{1,2})?$/.test(value)) return NaN;
  return Number(value.replace(",", "."));
};

const valid = { isValid: true, message: "" };
const invalid = (message) => ({ isValid: false, message });

export const validateProductName = (name) => {
  const value = String(name ?? "").trim();
  if (!value) return invalid("Informe o nome do produto.");
  if (value.length > NAME_MAX) return invalid(`Use até ${NAME_MAX} caracteres.`);
  return valid;
};

export const validateProductPrice = (price) => {
  if (!String(price ?? "").trim()) return invalid("Informe o preço.");
  const value = parsePrice(price);
  if (Number.isNaN(value)) return invalid("Use só números, como 25,90.");
  if (value <= 0) return invalid("O preço precisa ser maior que zero.");
  return valid;
};

// Opcional: os produtos do cardápio não têm quantidade
export const validateProductQuantity = (quantity) => {
  const value = String(quantity ?? "").trim();
  if (!value) return valid;
  if (!/^\d+$/.test(value) || Number(value) > QUANTITY_MAX) {
    return invalid(`Use um número inteiro de 0 a ${QUANTITY_MAX}.`);
  }
  return valid;
};

export const validateProductDescription = (description) =>
  String(description ?? "").trim().length > DESCRIPTION_MAX
    ? invalid(`Use até ${DESCRIPTION_MAX} caracteres.`)
    : valid;

/**
 * Valores do formulário convertidos para o modelo do cardápio. Só chamar depois da validação.
 * A quantidade vazia fica de fora.
 * @param {object} form
 * @returns {{ category: string, name: string, price: number, quantity?: number, description: string, image: string }}
 */
export const toProduct = (form) => {
  const quantity = String(form.quantity ?? "").trim();
  return {
    category: form.category,
    name: form.name.trim(),
    price: parsePrice(form.price),
    ...(quantity && { quantity: Number(quantity) }),
    description: String(form.description ?? "").trim(),
    image: form.image,
  };
};

// Assinatura (primeiros bytes) de cada tipo aceito. O tipo informado pelo navegador vem
// da extensão do arquivo; a assinatura confere o conteúdo
const ascii = (bytes, start, end) => String.fromCharCode(...bytes.slice(start, end));
const SIGNATURES = {
  "image/png": (bytes) =>
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((byte, index) => bytes[index] === byte),
  "image/jpeg": (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  "image/webp": (bytes) => ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 12) === "WEBP",
};

// Os 12 primeiros bytes de uma data URL em base64
const headerBytes = (dataUrl, type) => {
  const prefix = `data:${type};base64,`;
  if (typeof dataUrl !== "string" || !dataUrl.startsWith(prefix)) return [];
  try {
    return [...atob(dataUrl.slice(prefix.length, prefix.length + 16))].map((char) =>
      char.charCodeAt(0)
    );
  } catch {
    return [];
  }
};

/**
 * Lê a imagem escolhida no formulário. Aceita só PNG, JPEG e WebP de até 300 kB, com o
 * conteúdo batendo com o tipo.
 * @param {File} file
 * @returns {Promise<{ dataUrl: string } | { error: string }>} nunca rejeita
 */
export const readProductImage = (file) =>
  new Promise((resolve) => {
    if (!IMAGE_TYPES.includes(file?.type)) {
      resolve({ error: "Escolha uma imagem PNG, JPEG ou WebP." });
      return;
    }
    if (file.size > IMAGE_MAX_BYTES) {
      resolve({ error: "A imagem precisa ter até 300 kB." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (SIGNATURES[file.type](headerBytes(dataUrl, file.type))) {
        resolve({ dataUrl });
      } else {
        resolve({ error: "O arquivo não é uma imagem PNG, JPEG ou WebP." });
      }
    };
    reader.onerror = () => resolve({ error: "Não foi possível ler a imagem. Tente de novo." });
    reader.readAsDataURL(file);
  });

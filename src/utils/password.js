// Hash das senhas guardadas no navegador. Sem back-end, o cadastro fica no localStorage;
// com o hash, quem ler o localStorage não vê a senha, que a pessoa pode usar em outros
// sites. PBKDF2-SHA256 do WebCrypto, com sal aleatório e 600 mil iterações (recomendação
// da OWASP para o PBKDF2-HMAC-SHA256).
//
// Formato guardado: "pbkdf2-sha256$<iterações>$<sal em base64>$<hash em base64>".
// Um valor sem esse prefixo é uma senha em texto puro de antes do hash: ela ainda entra,
// e quem chamou regrava o cadastro com o hash (needsUpgrade).

const PREFIX = "pbkdf2-sha256";
const ITERATIONS = 600000;
const SALT_BYTES = 16;
const HASH_BITS = 256;

const encoder = new TextEncoder();

const toBase64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const fromBase64 = (text) => Uint8Array.from(atob(text), (char) => char.charCodeAt(0));

const derive = async (password, salt, iterations) => {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  return crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    key,
    HASH_BITS
  );
};

/** O valor guardado já é um hash deste módulo? */
export const isPasswordHash = (stored) =>
  typeof stored === "string" && stored.startsWith(`${PREFIX}$`);

/**
 * @param {string} password
 * @returns {Promise<string>} o hash no formato guardado
 */
export const hashPassword = async (password) => {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await derive(String(password), salt, ITERATIONS);
  return `${PREFIX}$${ITERATIONS}$${toBase64(salt)}$${toBase64(hash)}`;
};

// Comparação sem sair no primeiro byte diferente
const sameBytes = (a, b) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) diff |= a[index] ^ b[index];
  return diff === 0;
};

/**
 * Confere a senha digitada com o valor guardado.
 * @param {string} password - a senha digitada
 * @param {unknown} stored - o valor do cadastro: hash, ou texto puro de antes do hash
 * @returns {Promise<{ ok: boolean, needsUpgrade: boolean }>}
 */
export const verifyPassword = async (password, stored) => {
  if (typeof password !== "string" || typeof stored !== "string" || !stored) {
    return { ok: false, needsUpgrade: false };
  }
  if (!isPasswordHash(stored)) {
    // Cadastro de antes do hash: confere o texto e pede a troca pelo hash
    return { ok: stored === password, needsUpgrade: stored === password };
  }

  const [, iterationsText, saltText, hashText] = stored.split("$");
  const iterations = Number(iterationsText);
  if (!Number.isSafeInteger(iterations) || iterations < 1) return { ok: false, needsUpgrade: false };
  try {
    const expected = fromBase64(hashText);
    const actual = new Uint8Array(await derive(password, fromBase64(saltText), iterations));
    const ok = sameBytes(actual, expected);
    return { ok, needsUpgrade: ok && iterations < ITERATIONS };
  } catch {
    // Hash editado à mão e ilegível
    return { ok: false, needsUpgrade: false };
  }
};

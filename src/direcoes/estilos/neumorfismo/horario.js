// Dias abertos lidos do texto de HORARIO ("Terça a sexta, das 13h à 01h"), para a leitura em poços
// da seção de contato. Módulo puro. Lê só "<dia> a <dia>" no começo do texto, com ou sem acento e
// com ou sem "-feira"; o que não entender devolve null, e a semana não aparece (o texto continua).

const DIAS = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

const semAcento = (texto) => texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const PADRAO = new RegExp(`^\\s*(${DIAS.join("|")})(?:-feira)?\\s+a\\s+(${DIAS.join("|")})(?:-feira)?\\b`);

/**
 * @param {string} texto
 * @returns {number[] | null} índices de 0 (segunda) a 6 (domingo), na ordem da semana
 */
export function diasAbertos(texto) {
  if (typeof texto !== "string") return null;
  const achado = semAcento(texto).match(PADRAO);
  if (!achado) return null;
  const inicio = DIAS.indexOf(achado[1]);
  const fim = DIAS.indexOf(achado[2]);
  // "Sábado a terça" dá a volta pelo domingo
  const quantidade = ((fim - inicio + 7) % 7) + 1;
  return Array.from({ length: quantidade }, (_, i) => (inicio + i) % 7).sort((a, b) => a - b);
}

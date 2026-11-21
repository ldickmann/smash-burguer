// Turno da cozinha lido do texto de HORARIO ("Terça a sexta, das 13h à 01h"), para a faixa das
// 24 horas da seção "turno". Módulo puro (o Node também lê). Nada é escrito à mão: as horas e os
// rótulos são recortes do próprio texto. O que não entender devolve null, e a faixa some (o texto fica).

const PADRAO = /(\d{1,2})h\D+?(\d{1,2})h/;

/**
 * @param {string} texto
 * @returns {{ abre: number, fecha: number, rotuloAbre: string, rotuloFecha: string } | null}
 *   `rotuloAbre` e `rotuloFecha` são os algarismos como estão no texto ("13" e "01")
 */
export function lerTurno(texto) {
  if (typeof texto !== "string") return null;
  const achado = texto.match(PADRAO);
  if (!achado) return null;
  const abre = Number(achado[1]);
  const fecha = Number(achado[2]);
  if (abre > 23 || fecha > 23 || abre === fecha) return null;
  return { abre, fecha, rotuloAbre: achado[1], rotuloFecha: achado[2] };
}

// A faixa vai de meio-dia a meio-dia, em 24 colunas: a coluna 1 é das 12h às 13h
const COLUNAS = 24;
export const colunaDa = (hora) => ((hora - 12 + COLUNAS) % COLUNAS) + 1;

/**
 * Posições na grade de 24 colunas (linhas de grade de 1 a 25).
 * @param {{ abre: number, fecha: number }} turno
 * @returns {{ trechos: Array<{ inicio: number, fim: number }>, meiaNoite: boolean, rotuloAbre: { inicio: number, fim: number }, rotuloFecha: { inicio: number, fim: number } }}
 */
export function posicoesFaixa({ abre, fecha }) {
  const inicio = colunaDa(abre);
  const duracao = (fecha - abre + COLUNAS) % COLUNAS;
  const fimLinear = inicio + duracao;
  // O turno que passa do meio-dia seguinte dá a volta: dois trechos
  const trechos =
    fimLinear <= COLUNAS + 1
      ? [{ inicio, fim: fimLinear }]
      : [
          { inicio, fim: COLUNAS + 1 },
          { inicio: 1, fim: fimLinear - COLUNAS },
        ];
  // A meia-noite é a linha 13 (começo da coluna das 0h); o corte só aparece se ela fica acesa por dentro
  const meiaNoite = trechos.some((t) => t.inicio < 13 && t.fim > 13);
  // O rótulo de abrir ocupa 4 colunas a partir do início; o de fechar, 4 colunas terminando no fim
  const fimFecha = trechos[trechos.length - 1].fim;
  const caber = (a, b) => ({ inicio: Math.max(1, Math.min(a, COLUNAS + 1 - 4)), fim: Math.max(5, Math.min(b, COLUNAS + 1)) });
  return {
    trechos,
    meiaNoite,
    rotuloAbre: caber(inicio, inicio + 4),
    rotuloFecha: caber(fimFecha - 4, fimFecha),
  };
}

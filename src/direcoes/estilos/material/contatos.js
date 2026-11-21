// Itens da seção "onde": horário, endereço, WhatsApp e e-mail, montados só com os textos reais de
// dados.js (e os rótulos do textos.js). Módulo puro.
import { CONTATOS, EMAIL, ENDERECO, HORARIO, RODAPE, TELEFONE } from "../../compartilhado/dados.js";

/**
 * O contato com rótulo vira título (o rótulo) e apoio (o valor real sozinho: endereço, telefone ou
 * e-mail, sem o "·" do texto de CONTATOS). Sem valor próprio, o apoio é o texto do contato; sem
 * rótulo, o texto real fica inteiro no título (é o caso de uma chave desconhecida).
 * @param {{ email: string, whatsapp: string }} textos
 * @returns {Array<{ chave: string, titulo: string, apoio: string, href: string, externo: boolean, icone: Array|object|null }>}
 */
export function itensOnde(
  textos,
  {
    contatos = CONTATOS,
    horario = HORARIO,
    rodape = RODAPE,
    valores = { endereco: ENDERECO, whatsapp: TELEFONE, email: EMAIL },
    iconeHorario = null,
  } = {}
) {
  const rotulos = { endereco: rodape.endereco, whatsapp: textos.whatsapp, email: textos.email };
  const itens = [{ chave: "horario", titulo: rodape.horario, apoio: horario, href: "", externo: false, icone: iconeHorario }];
  for (const contato of contatos) {
    const rotulo = rotulos[contato.chave];
    itens.push({
      chave: contato.chave,
      titulo: rotulo || contato.texto,
      apoio: rotulo ? (valores[contato.chave] ?? contato.texto) : "",
      href: contato.href ?? "",
      externo: Boolean(contato.externo),
      icone: contato.icone ?? null,
    });
  }
  return itens;
}

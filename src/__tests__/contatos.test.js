// Cópia dos casos de src/direcoes/estilos/material/__tests__/contatos.test.js para a cópia de
// produção (src/utils/contatos.js), que lê os textos de src/utils/textosLoja.js.
import { describe, expect, it } from 'vitest';
import { itensOnde } from '@/utils/contatos';
import { CONTATOS, EMAIL, ENDERECO, HORARIO, RODAPE, TELEFONE, TEXTOS } from '@/utils/textosLoja';

const porChave = (itens) => Object.fromEntries(itens.map((i) => [i.chave, i]));

describe('itensOnde', () => {
  it('monta horário, endereço, WhatsApp e e-mail, nessa ordem, com os textos reais', () => {
    const itens = itensOnde(TEXTOS);
    expect(itens.map((i) => i.chave)).toEqual(['horario', 'endereco', 'whatsapp', 'email']);
    const { horario, endereco, email } = porChave(itens);
    // Na produção os ícones vão por nome (plugin do Font Awesome): o relógio é o regular
    expect(horario).toMatchObject({ titulo: RODAPE.horario, apoio: HORARIO, href: '', icone: ['far', 'clock'] });
    const real = porChave(CONTATOS);
    expect(endereco).toMatchObject({ titulo: RODAPE.endereco, apoio: ENDERECO, href: real.endereco.href, externo: true });
    expect(email).toMatchObject({ titulo: TEXTOS.email, apoio: EMAIL, href: real.email.href, externo: false });
  });

  it('o WhatsApp mostra o rótulo no título e o telefone sozinho no apoio, sem o "·"', () => {
    const { whatsapp } = porChave(itensOnde(TEXTOS));
    const real = CONTATOS.find((c) => c.chave === 'whatsapp');
    expect(whatsapp).toMatchObject({ titulo: TEXTOS.whatsapp, apoio: TELEFONE, href: real.href, externo: true });
    expect(`${whatsapp.titulo} ${whatsapp.apoio}`).not.toContain('·');
  });

  it('chave desconhecida: o título é o texto e o apoio fica vazio', () => {
    const contatos = [{ chave: 'telegram', texto: 'Telegram', href: 'https://t.me/x', externo: true, icone: ['fas', 'phone'] }];
    const [, item] = itensOnde(TEXTOS, { contatos });
    expect(item).toMatchObject({ chave: 'telegram', titulo: 'Telegram', apoio: '', externo: true });
  });

  it('contato sem valor próprio, href nem ícone não quebra: o apoio é o texto do contato', () => {
    const [, item] = itensOnde(TEXTOS, { contatos: [{ chave: 'email', texto: 'x@y.z' }], valores: {} });
    expect(item).toMatchObject({ titulo: TEXTOS.email, apoio: 'x@y.z', href: '', externo: false, icone: null });
  });
});

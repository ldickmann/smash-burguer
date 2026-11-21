// textosLoja.js: a cópia de produção de src/direcoes/compartilhado/dados.js (SPEC-material §4.1),
// fonte única dos textos da loja, sem o carrossel (SECAO) e sem as redes sociais (§5.10). O teste
// não importa o original: nada fora de src/direcoes/ importa de lá (producao-isolamento.test.js).
import { describe, expect, it } from 'vitest';
import * as textos from '@/utils/textosLoja';

describe('textosLoja', () => {
  it('traz os textos reais da loja', () => {
    expect(textos.MARCA).toBe('Smash Burger');
    expect(textos.FRASE_CARDAPIO).toBe('Escolha, personalize e peça.');
    expect(textos.HORARIO).toBe('Terça a sexta, das 13h à 01h');
    expect(textos.ENDERECO).toBe('Rua Beira da Praia - Navegantes, SC');
    expect(textos.EMAIL).toBe('contato@smashburger.com.br');
    expect(textos.HERO).toMatchObject({ titulo: 'Smash na chapa, entregue quente', acao: 'Ver cardápio' });
    expect(textos.CATEGORIAS.map((c) => c.rotulo)).toEqual(['Hambúrgueres', 'Bebidas', 'Sobremesas']);
    expect(textos.CONTATOS.map((c) => c.chave)).toEqual(['endereco', 'whatsapp', 'email']);
    expect(textos.NOVA_ABA).toBe(' (abre em nova aba)');
  });

  it('sem o carrossel e sem as redes sociais', () => {
    expect(textos).not.toHaveProperty('SECAO');
    expect(textos).not.toHaveProperty('REDES');
    expect(textos.RODAPE).not.toHaveProperty('redes');
    expect(textos.RODAPE).toMatchObject({ endereco: 'Endereço', horario: 'Horário' });
  });

  it('direitos nas três partes do texto de hoje, sem "·" nem "—" (§10.2)', () => {
    expect(textos.DIREITOS).toEqual(['© 2026 Smash Burger', 'Sabiá Operações', 'Desenvolvido por Lucas Elias Dickmann']);
    // Uma fonte só: a linha antiga, com os separadores, sai do RODAPE
    expect(textos.RODAPE).not.toHaveProperty('copyright');
  });

  it('a microcopy da Home, revisada (§8.2): só o título da seção "onde" muda', () => {
    expect(textos.TEXTOS).toEqual({
      ingredientes: 'Ingredientes',
      vazio: 'Nada nesta categoria por enquanto',
      adicional: 'adicional',
      adicionais: 'adicionais',
      ondeTitulo: 'Horário e contato',
      email: 'E-mail',
      whatsapp: 'WhatsApp',
    });
  });
});

import { describe, it, expect } from 'vitest';
import {
  IMAGE_MAX_BYTES,
  formatPriceInput,
  parsePrice,
  readProductImage,
  toProduct,
  validateProductDescription,
  validateProductName,
  validateProductPrice,
  validateProductQuantity,
} from '../utils/productForm';

const PNG_HEADER = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0x0d];
const JPEG_HEADER = [0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0, 1];
const WEBP_HEADER = [...'RIFF'].map((c) => c.charCodeAt(0)).concat([0x24, 0, 0, 0], [...'WEBP'].map((c) => c.charCodeAt(0)));

// Arquivo com o cabeçalho dado, completado com zeros até `size` bytes
const fileOf = (header, type, size = 64, name = 'foto') => {
  const bytes = new Uint8Array(size);
  bytes.set(header.slice(0, size));
  return new File([bytes], name, { type });
};

describe('preço do formulário de produto', () => {
  it.each([
    ['25,90', 25.9],
    ['25.90', 25.9],
    ['25', 25],
    [' 7,5 ', 7.5],
    ['9999,99', 9999.99],
  ])('"%s" vira %s', (text, price) => {
    expect(parsePrice(text)).toBe(price);
  });

  it.each(['', 'abc', '25,999', '1.234,56', '-5', 'R$ 25', '10000', '25,'])('"%s" não é preço', (text) => {
    expect(parsePrice(text)).toBeNaN();
  });

  it('valida: vazio, texto e zero são recusados com a mensagem certa', () => {
    expect(validateProductPrice('').message).toBe('Informe o preço.');
    expect(validateProductPrice('vinte').message).toBe('Use só números, como 25,90.');
    expect(validateProductPrice('0,00').message).toBe('O preço precisa ser maior que zero.');
    expect(validateProductPrice('25,90').isValid).toBe(true);
  });

  it('o preço do cardápio aparece no campo com vírgula e duas casas', () => {
    expect(formatPriceInput(25.9)).toBe('25,90');
    expect(formatPriceInput(22.5)).toBe('22,50');
    expect(formatPriceInput(1234.5)).toBe('1234,50');
    expect(formatPriceInput('25,90')).toBe('');
  });
});

describe('campos do formulário de produto', () => {
  it('nome é obrigatório e tem até 60 caracteres', () => {
    expect(validateProductName('   ').isValid).toBe(false);
    expect(validateProductName('a'.repeat(61)).isValid).toBe(false);
    expect(validateProductName('X-Bacon').isValid).toBe(true);
  });

  it('quantidade é opcional, inteira, de 0 a 9999', () => {
    expect(validateProductQuantity('').isValid).toBe(true);
    expect(validateProductQuantity('0').isValid).toBe(true);
    expect(validateProductQuantity('9999').isValid).toBe(true);
    expect(validateProductQuantity('10000').isValid).toBe(false);
    expect(validateProductQuantity('1.5').isValid).toBe(false);
  });

  it('descrição tem até 160 caracteres', () => {
    expect(validateProductDescription('').isValid).toBe(true);
    expect(validateProductDescription('a'.repeat(161)).isValid).toBe(false);
  });

  it('converte para o modelo do cardápio: preço em número, textos sem espaço nas pontas e quantidade vazia de fora', () => {
    const form = { category: 'drinks', name: ' Mate ', price: '6,50', quantity: '', description: ' Gelado ', image: 'data:image/png;base64,AA==' };

    expect(toProduct(form)).toEqual({
      category: 'drinks',
      name: 'Mate',
      price: 6.5,
      description: 'Gelado',
      image: 'data:image/png;base64,AA==',
    });
    expect(toProduct({ ...form, quantity: '12' }).quantity).toBe(12);
  });
});

describe('imagem do produto', () => {
  it.each([
    ['PNG', PNG_HEADER, 'image/png'],
    ['JPEG', JPEG_HEADER, 'image/jpeg'],
    ['WebP', WEBP_HEADER, 'image/webp'],
  ])('aceita %s com o conteúdo do tipo', async (_, header, type) => {
    const result = await readProductImage(fileOf(header, type));

    expect(result.error).toBeUndefined();
    expect(result.dataUrl.startsWith(`data:${type};base64,`)).toBe(true);
  });

  it.each([
    ['HTML', 'text/html'],
    ['SVG', 'image/svg+xml'],
    ['GIF', 'image/gif'],
    ['sem tipo', ''],
  ])('recusa %s pelo tipo', async (_, type) => {
    const result = await readProductImage(fileOf(PNG_HEADER, type));

    expect(result).toEqual({ error: 'Escolha uma imagem PNG, JPEG ou WebP.' });
  });

  it('recusa acima de 300 kB e aceita no limite', async () => {
    const over = await readProductImage(fileOf(PNG_HEADER, 'image/png', IMAGE_MAX_BYTES + 1));
    const atLimit = await readProductImage(fileOf(PNG_HEADER, 'image/png', IMAGE_MAX_BYTES));

    expect(over).toEqual({ error: 'A imagem precisa ter até 300 kB.' });
    expect(atLimit.dataUrl).toBeDefined();
  });

  it('recusa arquivo com o tipo de imagem e outro conteúdo', async () => {
    const html = new TextEncoder().encode('<html><script>alert(1)</script></html>');
    const results = await Promise.all([
      readProductImage(new File([html], 'falsa.png', { type: 'image/png' })),
      readProductImage(fileOf(PNG_HEADER, 'image/jpeg')),
      readProductImage(new File([], 'vazia.webp', { type: 'image/webp' })),
    ]);

    for (const result of results) {
      expect(result).toEqual({ error: 'O arquivo não é uma imagem PNG, JPEG ou WebP.' });
    }
  });
});

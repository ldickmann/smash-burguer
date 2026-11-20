import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCepLookup } from '../composables/useCepLookup';

const streets = { '88370000': 'Rua Beira da Praia', '01001000': 'Praça da Sé' };

// ViaCEP simulado: cada consulta só responde quando o teste chama respond(cep),
// que responde a consulta mais antiga ainda pendente desse CEP
const stubViaCep = () => {
  const queue = {};
  const fetchMock = vi.fn(
    (url) =>
      new Promise((resolve) => {
        const cep = url.match(/ws\/(\d{8})\//)[1];
        (queue[cep] ??= []).push(() =>
          resolve({ json: async () => ({ logradouro: streets[cep], bairro: 'Centro', localidade: 'Cidade', uf: 'SC' }) })
        );
      })
  );
  vi.stubGlobal('fetch', fetchMock);
  return { fetchMock, respond: (cep) => queue[cep].shift()() };
};

describe('useCepLookup', () => {
  beforeEach(() => {
    // O validateCEP escreve a resposta no console
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('o endereço do CEP anterior não vale enquanto o novo está sendo consultado', async () => {
    const { fetchMock, respond } = stubViaCep();
    const cep = useCepLookup();

    const first = cep.lookup('88370-000');
    respond('88370000');
    expect(await first).toMatchObject({ street: 'Rua Beira da Praia' });

    const second = cep.lookup('01001000');
    expect(cep.address.value).toBeNull();
    expect(cep.loading.value).toBe(true);

    // Pedir o mesmo CEP durante a consulta devolve a mesma resposta, sem outra requisição
    const again = cep.lookup('01001-000');
    expect(fetchMock).toHaveBeenCalledTimes(2);

    respond('01001000');
    expect(await second).toMatchObject({ street: 'Praça da Sé' });
    expect(await again).toMatchObject({ street: 'Praça da Sé' });
    expect(cep.loading.value).toBe(false);
  });

  it('a resposta atrasada de um CEP antigo é descartada e não encerra o carregamento do novo', async () => {
    const { respond } = stubViaCep();
    const cep = useCepLookup();

    const old = cep.lookup('88370000');
    const current = cep.lookup('01001000');
    respond('88370000');

    expect(await old).toBeNull();
    expect(cep.address.value).toBeNull();
    expect(cep.loading.value).toBe(true);

    respond('01001000');
    expect(await current).toMatchObject({ street: 'Praça da Sé' });
    expect(cep.loading.value).toBe(false);
  });

  it('um CEP incompleto descarta a consulta em andamento', async () => {
    const { respond } = stubViaCep();
    const cep = useCepLookup();

    const pending = cep.lookup('88370000');
    expect(await cep.lookup('8837000')).toBeNull();
    expect(cep.loading.value).toBe(false);

    respond('88370000');
    expect(await pending).toBeNull();
    expect(cep.address.value).toBeNull();
    expect(cep.loading.value).toBe(false);
  });

  it('o mesmo CEP digitado de novo: a resposta da primeira consulta não encerra a segunda', async () => {
    const { fetchMock, respond } = stubViaCep();
    const cep = useCepLookup();

    const first = cep.lookup('88370000');
    await cep.lookup('8837000');
    const second = cep.lookup('88370000');
    expect(fetchMock).toHaveBeenCalledTimes(2);

    respond('88370000'); // a primeira consulta responde
    await new Promise((resolve) => setTimeout(resolve));
    expect(cep.loading.value).toBe(true);
    expect(cep.address.value).toBeNull();

    respond('88370000'); // a segunda
    expect(await second).toMatchObject({ street: 'Rua Beira da Praia' });
    expect(await first).toMatchObject({ street: 'Rua Beira da Praia' });
    expect(cep.loading.value).toBe(false);
  });
});

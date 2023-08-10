import { currencyFormat } from './currencyFormat';

describe('currencyFormat', () => {
  test('formats the value as currency', () => {
    const result = currencyFormat({
      currency: 'USD',
      locale: 'en-US',
      numberOfDecimals: 2,
      value: 1234.56,
    });

    expect(result).toEqual('$1,234.56');
  });

  test('formats the value with the specified number of decimals', () => {
    const result = currencyFormat({
      currency: 'EUR',
      locale: 'de-DE',
      numberOfDecimals: 3,
      value: 1234.5678,
    });

    expect(result).toEqual('1.234,568 €');
  });

  test('formats the value with the specified locale', () => {
    const result = currencyFormat({
      currency: 'ARS',
      locale: 'es-AR',
      numberOfDecimals: 0,
      value: 1234,
    });

    expect(result).toEqual('$ 1.234');
  });
});

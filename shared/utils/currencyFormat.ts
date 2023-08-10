type CurrencyFormat = {
  value: number;
  currency: string;
  locale: string;
  numberOfDecimals?: number;
};

export function currencyFormat({
  currency,
  locale,
  numberOfDecimals,
  value,
}: CurrencyFormat) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: numberOfDecimals,
  }).format(value);
}

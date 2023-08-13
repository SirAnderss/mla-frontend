type CurrencyFormat = {
  value: number;
  currency: string;
  locale: string;
  numberOfDecimals?: number;
};

/**
 *
 * @param currency - Currency code
 * @param locale - Locale code
 * @param numberOfDecimals - Number of decimals to display
 * @param value - Value to be formatted
 * @description This function is used to transform number to currency format
 * @returns string
 */
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

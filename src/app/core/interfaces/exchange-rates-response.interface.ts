import { ExchangeRatesBaseResponse } from './exchange-rates-base-response.interface';
import { ExchangeRates } from './exchange-rates.interface';

export interface ExchangeRatesResponse extends ExchangeRatesBaseResponse {
  conversion_rates: ExchangeRates;
}

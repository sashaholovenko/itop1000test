import { ExchangeRatesBaseResponse } from "./exchange-rates-base-response.interface";

export interface PairConversionResponse extends ExchangeRatesBaseResponse {
  target_code: string;
  conversion_rate: number;
}

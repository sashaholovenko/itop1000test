import { Injectable } from '@angular/core';
import { ExchangeRatesResponse } from '../interfaces/exchange-rates-response.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  public getExchangeRate(
    exchangeRates: Observable<ExchangeRatesResponse>,
    currency: string
  ): Observable<number> {
    return exchangeRates.pipe(
      map((rates: ExchangeRatesResponse) => rates.conversion_rates[currency])
    );
  }
}

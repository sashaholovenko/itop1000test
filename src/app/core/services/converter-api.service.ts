import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ExchangeRatesResponse } from '../interfaces/exchange-rates-response.interface';
import { PairConversionResponse } from '../interfaces/pair-conversion-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ConverterApiService {
  private readonly BASE_URL = 'https://v6.exchangerate-api.com/v6/';
  private readonly API_KEY = '897d2b6d95fe92e7d055c80f';

  constructor(private http: HttpClient) {}

  public getExchangeRates(base: string): Observable<ExchangeRatesResponse> {
    return this.http
      .get<ExchangeRatesResponse>(
        `${this.BASE_URL}/${this.API_KEY}/latest/${base}`
      )
      .pipe(shareReplay(1));
  }

  public getPairConversionRate(
    base: string,
    target: string
  ): Observable<PairConversionResponse> {
    return this.http.get<PairConversionResponse>(
      `${this.BASE_URL}/${this.API_KEY}/pair/${base}/${target}`
    );
  }
}

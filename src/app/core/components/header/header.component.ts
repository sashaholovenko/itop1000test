import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConverterApiService } from '../../services/converter-api.service';
import { ConverterService } from '../../services/converter.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRatesResponse } from '../../interfaces/exchange-rates-response.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private UAHConversions = this.api.getExchangeRates('UAH');

  constructor(
    private api: ConverterApiService,
    private converter: ConverterService
  ) {}

  public getExchangeRate(currency: string): Observable<number> {
    return this.converter.getExchangeRate(this.UAHConversions, currency);
  }
}

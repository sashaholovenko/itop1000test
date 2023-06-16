import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseFormService {
  private baseCurrencyAmount$$ = new BehaviorSubject(1);
  public baseCurrencyAmount$ = this.baseCurrencyAmount$$.asObservable();

  public updateBaseCurrencyAmount(
    targetCurrencyAmount: number,
    conversionRate: number
  ): void {
    const baseCurrencyAmount = targetCurrencyAmount / conversionRate;
    this.baseCurrencyAmount$$.next(baseCurrencyAmount);
  }
}

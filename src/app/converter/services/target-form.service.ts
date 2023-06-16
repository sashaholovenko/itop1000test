import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TargetFormService {
  private targetCurrencyAmount$$ = new BehaviorSubject(1);
  public targetCurrenctAmount$ = this.targetCurrencyAmount$$.asObservable();

  public updateTargetCurrencyAmount(
    baseCurrencyAmount: number,
    conversionRate: number
  ): void {
    const targetCurrencyAmount = baseCurrencyAmount * conversionRate;
    this.targetCurrencyAmount$$.next(targetCurrencyAmount);
  }
}

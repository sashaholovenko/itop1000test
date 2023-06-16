import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, first, map, switchMap, take, tap } from 'rxjs';
import { PairConversionResponse } from 'src/app/core/interfaces/pair-conversion-response.interface';
import { ConverterApiService } from 'src/app/core/services/converter-api.service';
import { TargetFormService } from '../../services/target-form.service';
import { BaseFormService } from '../../services/base-form.service';

type FormType = 'base' | 'target';

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterPageComponent {
  private conversionRate = 1;
  public currencyTypes = {
    base: 'USD',
    target: 'USD',
  };

  public targetCurrencyAmount$ = this.targetFormService.targetCurrenctAmount$;
  public baseCurrencyAmount$ = this.baseFormService.baseCurrencyAmount$;

  constructor(
    private api: ConverterApiService,
    private targetFormService: TargetFormService,
    private baseFormService: BaseFormService
  ) {}

  public updateCurrencyType(
    baseCurrencyType: string,
    targetCurrencyType: string,
    type: FormType
  ): void {
    this.currencyTypes.base = baseCurrencyType;
    this.currencyTypes.target = targetCurrencyType;

    this.api
      .getPairConversionRate(baseCurrencyType, targetCurrencyType)
      .pipe(
        map(
          (pairConversion: PairConversionResponse) =>
            pairConversion.conversion_rate
        ),
        tap(conversionRate => (this.conversionRate = conversionRate)),
        switchMap(() => this.getObservableByFormType(type)),
        tap(amount => this.updateCurrencyAmountByFormType(type, amount)),
        first()
      )
      .subscribe();
  }

  public updateBaseCurrencyAmount(targetCurrencyAmount: number): void {
    this.baseFormService.updateBaseCurrencyAmount(
      targetCurrencyAmount,
      this.conversionRate
    );
  }

  public updateTargetCurrencyAmount(baseTargetAmount: number): void {
    this.targetFormService.updateTargetCurrencyAmount(
      baseTargetAmount,
      this.conversionRate
    );
  }

  private getObservableByFormType(type: FormType): Observable<number> {
    return type === 'base'
      ? this.targetCurrencyAmount$
      : this.baseCurrencyAmount$;
  }

  private updateCurrencyAmountByFormType(type: FormType, amount: number): void {
    return type === 'base'
      ? this.updateBaseCurrencyAmount(amount)
      : this.updateTargetCurrencyAmount(amount);
  }
}

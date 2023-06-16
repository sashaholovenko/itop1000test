import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterFormComponent implements OnInit {
  @Input() public currencyAmount$!: Observable<number>;
  @Output() public currencyTypeChangeEvent = new EventEmitter<string>();
  @Output() public currencyAmountChangeEvent = new EventEmitter<number>();

  public currencies = ['USD', 'UAH', 'EUR'];

  public converterForm = this.formBuilder.group({
    currencyAmount: 1,
    currencyType: 'USD',
  });

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.converterForm.get('currencyType')?.valueChanges.subscribe(() => {
      if (this.currencyType) {
        this.currencyTypeChangeEvent.emit(this.currencyType);
      }
    });

    this.converterForm.get('currencyAmount')?.valueChanges.subscribe(() => {
      if (this.currencyAmount) {
        this.currencyAmountChangeEvent.emit(this.currencyAmount);
      }
    });
  }

  public onInputChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      let inputValue = event.target.value;
      if (/[^0-9.]/g.test(inputValue)) {
        inputValue = inputValue.replace(/[^0-9.]/g, '');
        this.converterForm.get('currencyAmount')?.setValue(Number(inputValue));
      }
      if (inputValue.slice(-1) !== '.') {
        const fixedCurrencyAmount = +(+inputValue).toFixed(3);
        this.converterForm.get('currencyAmount')?.setValue(fixedCurrencyAmount);
      }
    }
  }

  private get currencyType(): string | undefined | null {
    return this.converterForm.get('currencyType')?.value;
  }

  private get currencyAmount(): number | undefined | null {
    return this.converterForm.get('currencyAmount')?.value;
  }
}

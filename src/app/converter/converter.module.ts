import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterFormComponent } from './components/converter-form/converter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConverterPageComponent } from './pages/converter-page/converter-page.component';

@NgModule({
  declarations: [ConverterFormComponent, ConverterPageComponent],
  imports: [CommonModule, ConverterRoutingModule, ReactiveFormsModule],
})
export class ConverterModule {}

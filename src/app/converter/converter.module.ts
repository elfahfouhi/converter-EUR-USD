import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterComponent } from './converter.component';



@NgModule({
  declarations: [ConverterComponent],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConverterModule { }

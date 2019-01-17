import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagensComponent } from './mensagens';

@NgModule({
  declarations: [
    MensagensComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MensagensComponent
  ]
})
export class SharedModule { }

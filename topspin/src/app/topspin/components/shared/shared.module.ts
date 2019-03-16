import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagensComponent } from './mensagens';
import { RatingComponent } from './rating';

@NgModule({
  declarations: [
    MensagensComponent,
    RatingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MensagensComponent,
    RatingComponent
  ]
})
export class SharedModule { }

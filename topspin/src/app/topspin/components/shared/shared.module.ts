import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagensComponent } from './mensagens';
import { RatingComponent } from './rating';
import { FormDebugComponent } from './form-debug';

@NgModule({
  declarations: [
    MensagensComponent,
    RatingComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MensagensComponent,
    RatingComponent,
    FormDebugComponent
  ]
})
export class SharedModule { }

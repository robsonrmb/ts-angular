import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CadastroJogoComponent } from './cadastro';
import { UsuarioService, JogoService } from '../../services';
import { NumeroDirective } from '../../directives';

@NgModule({
  declarations: [
    CadastroJogoComponent,
    NumeroDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    UsuarioService,
    JogoService
  ]
})
export class JogosModule { }

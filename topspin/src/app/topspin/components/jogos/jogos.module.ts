import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CadastroJogoComponent } from './cadastro';
import { UsuarioService, JogoService } from '../../services';
import { NumeroDirective } from '../../directives';
import { SharedModule } from '../shared';
import { JogosRoutingModule } from './jogos.routing.module';

@NgModule({
  declarations: [
    CadastroJogoComponent,
    NumeroDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    JogosRoutingModule
  ],
  providers: [
    UsuarioService,
    JogoService
  ]
})
export class JogosModule { }

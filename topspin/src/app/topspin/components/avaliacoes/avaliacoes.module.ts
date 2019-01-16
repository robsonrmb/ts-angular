import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AvaliacaoService, UsuarioService } from '../../services';
import { CadastroAvaliacaoComponent } from './cadastro';
import { PesquisaAvaliacaoComponent } from './pesquisa';

@NgModule({
  declarations: [
    CadastroAvaliacaoComponent,
    PesquisaAvaliacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    AvaliacaoService,
    UsuarioService
  ]
})
export class AvaliacoesModule { }

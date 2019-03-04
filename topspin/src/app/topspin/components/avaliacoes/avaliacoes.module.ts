import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AvaliacaoService, UsuarioService } from '../../services';
import { CadastroAvaliacaoComponent } from './cadastro';
import { PesquisaAvaliacaoComponent } from './pesquisa';
import { SharedModule } from '../shared';
import { AvalieComponent } from './avalie';
import { FormDebugComponent } from '../form-debug';

@NgModule({
  declarations: [
    CadastroAvaliacaoComponent,
    PesquisaAvaliacaoComponent,
    AvalieComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    AvaliacaoService,
    UsuarioService
  ]
})
export class AvaliacoesModule { }

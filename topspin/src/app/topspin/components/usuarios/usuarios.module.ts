import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CadastroUsuarioComponent } from '../usuarios/cadastro';
import { PesquisaUsuarioComponent } from '../usuarios/pesquisa';
import { AmigoComponent } from '../usuarios/amigos';
import { UsuarioService, AmigoService } from '../../services';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    PesquisaUsuarioComponent,
    AmigoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CadastroUsuarioComponent,
    PesquisaUsuarioComponent,
    AmigoComponent
  ],
  providers: [
    UsuarioService, 
    AmigoService
  ]
})
export class UsuariosModule { }

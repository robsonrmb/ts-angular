import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CadastroUsuarioComponent } from '../usuarios/cadastro';
import { PesquisaUsuarioComponent } from '../usuarios/pesquisa';
import { AmigoComponent } from '../usuarios/amigos';
import { UsuarioService, AmigoService } from '../../services';
import { SharedModule } from '../shared';

//const ROUTES: Routes = [
//  {path: '', component: CadastroUsuarioComponent}
//]

@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    PesquisaUsuarioComponent,
    AmigoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    //RouterModule.forChild(ROUTES),
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CadastroJogoComponent } from './cadastro';
import { UsuarioService, JogoService } from '../../services';
import { NumeroDirective } from '../../directives';
import { SharedModule } from '../shared';

//const ROUTES: Routes = [
//  {path: '', component: CadastroJogoComponent}
//]

@NgModule({
  declarations: [
    CadastroJogoComponent,
    NumeroDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    //RouterModule.forChild(ROUTES),
    FormsModule,
    SharedModule
  ],
  providers: [
    UsuarioService,
    JogoService
  ]
})
export class JogosModule { }

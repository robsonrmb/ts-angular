import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { Permissao } from '../../security';
import { LoginService, UsuarioService, EstatisticaService } from '../../services';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    Permissao,
    LoginService,
    UsuarioService,
    EstatisticaService
  ]
})
export class DashboardModule { }

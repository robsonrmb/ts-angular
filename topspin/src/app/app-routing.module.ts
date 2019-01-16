import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './topspin/components/dashboard';
import { EntradaLoginComponent, CadastroLoginComponent } from './topspin/components/login';
import { CadastroUsuarioComponent, PesquisaUsuarioComponent, AmigoComponent } from './topspin/components/usuarios';
import { CadastroConviteComponent, PesquisaConviteComponent } from './topspin/components/convites';
import { CadastroJogoComponent } from './topspin/components/jogos';
import { CadastroAvaliacaoComponent, PesquisaAvaliacaoComponent } from './topspin/components/avaliacoes';
import { Permissao } from './topspin/security';
import { ExternalComponent } from './topspin/components/external/external.component';
import { externalURLProvider } from './topspin/constantes/externalUrlProvider';
import { EstatisticasComponent } from './topspin';

const routes: Routes = [
  {path: '', component: DashboardComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'dashboard', component: DashboardComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'login', component: EntradaLoginComponent},
  {path: 'cadastroLogin', component: CadastroLoginComponent},
  {path: 'cadUsuario', component: CadastroUsuarioComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'pesqUsuario', component: PesquisaUsuarioComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'listaAmigos', component: AmigoComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'cadConvite/:idConvidado', component: CadastroConviteComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'listaConvites', component: PesquisaConviteComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'cadJogo', component: CadastroJogoComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'cadAvaliacao/:idAvaliado', component: CadastroAvaliacaoComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'pesqAvaliacao', component: PesquisaAvaliacaoComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'pesqEstatisticas/:idUsuario', component: EstatisticasComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'externalRedirect', resolve: {url: externalURLProvider,}, component: ExternalComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

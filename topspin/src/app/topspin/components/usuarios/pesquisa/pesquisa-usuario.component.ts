import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ChaveValor, Usuario, FormUsuarioAmigo } from '../../../models';
import { ESTADOS } from '../../../constantes';
import { UsuarioService, AmigoService } from '../../../services';

@Component({
  selector: 'app-pesquisa-usuario',
  templateUrl: './pesquisa-usuario.component.html',
  styleUrls: ['./pesquisa-usuario.component.css']
})
export class PesquisaUsuarioComponent implements OnInit {

  @ViewChild('formUsuarios') formUsuarios: NgForm;

  usuario: Usuario
  listaDeUsuarios: Usuario[]
  estados: ChaveValor[]
  mensagemGrid: string
  
  constructor(private usuarioService: UsuarioService,
              private amigoService: AmigoService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new Usuario()
    this.estados = ESTADOS
    this.mensagemGrid = ''
  }

  pesquisar() {
    /*
    this.usuarioService
      .listaPorEstado(this.usuario.estado)
      .subscribe(
        (result) => {
          console.log(result)
          this.listaDeUsuarios = result
        }
      )
    */
    
    let u: Usuario = new Usuario()
    u.nome = this.usuario.nome
    u.email = this.usuario.email
    u.estado = this.usuario.estado
    u.id = this.usuarioService.getUsuario().id

    this.usuarioService
      .listaPorFiltroComFlagAmigo(u)
      .subscribe(
        (result) => {
          this.listaDeUsuarios = result
        }
      )
  }

  colocarComoAmigo(u: Usuario) {
    let formUsuarioAmigo: FormUsuarioAmigo
    formUsuarioAmigo = new FormUsuarioAmigo(null, this.usuarioService.getUsuario().id, u.id)
    this.amigoService.colocarComoAmigo(formUsuarioAmigo)
        .subscribe(
          (result) => {
            this.mudaStatusDeAmigoDoUsuarioDaLista(u.id)
          }
        )
  }

  retirarComoAmigo(u: Usuario) {
    let formUsuarioAmigo: FormUsuarioAmigo
    formUsuarioAmigo = new FormUsuarioAmigo(null, this.usuarioService.getUsuario().id, u.id)
    this.amigoService.retirarComoAmigo(formUsuarioAmigo)
        .subscribe(
          (result) => {
            this.mudaStatusDeAmigoDoUsuarioDaLista(u.id)
          }
        )
  }

  avaliar(u: Usuario) {
    this.router.navigate(['/cadAvaliacao', u.id])
  }

  exibirEstatisticas(u: Usuario) {
    this.router.navigate(['/pesqEstatisticas', u.id])
  }

  isListaDeUsuariosVazia(): boolean {
    if (this.listaDeUsuarios === undefined || this.listaDeUsuarios.length === 0) {
      this.mensagemGrid = 'Nenhum usuário encontrado.'
      return true
    }else{
      return false
    }
  }

  private mudaStatusDeAmigoDoUsuarioDaLista(id: string) {
    let i: number
    for (i=0; i<this.listaDeUsuarios.length; i++) {
      if (id === this.listaDeUsuarios[i].id) {
        if (this.listaDeUsuarios[i].amigo) {
          this.listaDeUsuarios[i].amigo = false
        }else{
          this.listaDeUsuarios[i].amigo = true
        }
      }
    }
  }

}

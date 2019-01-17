import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario, FormUsuarioAmigo } from '../../../models';
import { AmigoService, UsuarioService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amigo',
  templateUrl: './amigo.component.html',
  styleUrls: ['./amigo.component.css']
})
export class AmigoComponent implements OnInit {

  @ViewChild('formUsuarios') formAmigos: NgForm;

  usuario: Usuario
  listaDeAmigos: Usuario[]
  mensagemTop: string
  mensagemTipo: string
  
  constructor(private amigoService: AmigoService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.amigoService
      .listaAmigos(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.listaDeAmigos = result
          if (this.listaDeAmigos !== undefined && this.listaDeAmigos.length > 0) {
            this.mensagemTipo = ''
            this.mensagemTop = ''
          }
        }
      )
    this.mensagemTop = ''
    this.mensagemTipo = ''
  }

  retirarComoAmigo(u: Usuario) {
    let formUsuarioAmigo: FormUsuarioAmigo
    formUsuarioAmigo = new FormUsuarioAmigo(null, this.usuarioService.getUsuario().id, u.id)
    this.amigoService.retirarComoAmigo(formUsuarioAmigo)
        .subscribe(
          (result) => {
            this.retiraUsuarioDaLista(u.id)
            this.mensagemTipo = 'S'
            this.mensagemTop = 'Usuário retirado da lista de amigos com sucesso!!!'
          }
        )
  }

  avaliar(u: Usuario) {
    this.router.navigate(['/cadAvaliacao', u.id])
  }

  convidarParaJogar(u: Usuario) {
    this.router.navigate(['/cadConvite', u.id])
  }

  isListaDeAmigosVazia(): boolean {
    if (this.listaDeAmigos === undefined || this.listaDeAmigos.length === 0) {
      this.mensagemTipo = 'W'
      this.mensagemTop = 'Nenhum amigo encontrado.'
      return true
    }else{
      return false
    }
  }

  private retiraUsuarioDaLista(id: string) {
    let i: number
    for (i=0; i<this.listaDeAmigos.length; i++) {
      if (id === this.listaDeAmigos[i].id) {
        this.listaDeAmigos.splice(i, 1)
      }
    }
    //splice(indexOf(item), 1) //Aula 52 do curso 1 de Angular (inicio da aula)
  }

  exibirEstatisticas(u: Usuario) {
    this.router.navigate(['/pesqEstatisticas', u.id])
  }

}

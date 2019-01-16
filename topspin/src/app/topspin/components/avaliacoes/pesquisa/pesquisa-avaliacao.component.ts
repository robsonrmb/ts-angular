import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Avaliacao } from '../../../models';
import { AvaliacaoService, UsuarioService } from '../../../services';

@Component({
  selector: 'app-pesquisa-avaliacao',
  templateUrl: './pesquisa-avaliacao.component.html',
  styleUrls: ['./pesquisa-avaliacao.component.css']
})
export class PesquisaAvaliacaoComponent implements OnInit {

  @ViewChild('formAvaliacoes') formAvaliacoes: NgForm;

  avaliacao: Avaliacao
  listaDeAvaliacoes: Avaliacao[]
  mensagemGrid: string
  
  constructor(private avaliacaoService: AvaliacaoService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    let aval: Avaliacao = new Avaliacao()
    aval.idUsuario = this.usuarioService.getUsuario().id
    aval.status = 'P'
    this.avaliacaoService
      .listaAvaliacoesRecebidasPorUsuarioEStatus(aval)
      .subscribe(
        (result) => {
          this.listaDeAvaliacoes = result
        }
      )
  }

  confirmaAvaliacao(aval: Avaliacao) {
    this.avaliacaoService
      .aceita(aval)
      .subscribe(
        (result) => {
          console.log('Avaliação confirmada!!!')
          this.router.navigate(['dashboard'])
        },
        (error) => console.log('Erro ao confirmar avaliação!!!')
      )
  }

  recusaAvaliacao(aval: Avaliacao) {
    this.avaliacaoService
      .recusa(aval)
      .subscribe(
        (result) => {
          console.log('Avaliação recusada!!!')
          this.router.navigate(['dashboard'])
        },
        (error) => console.log('Erro ao recusar avaliação!!!')
      )
  }

  isListaDeAvaliacoesVazia(): boolean {
    if (this.listaDeAvaliacoes === undefined || this.listaDeAvaliacoes.length === 0) {
      this.mensagemGrid = 'Nenhuma avaliação encontrada.'
      return true
    }else{
      return false
    }
  }

}

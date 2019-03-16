import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Usuario, ChaveValor, Avaliacao, Mensagem } from 'src/app/topspin/models';
import { AvaliacaoService, UsuarioService } from '../../../services';
import { ESTADOS, RESPOSTAS_PERFORMANCE, MensagemEnum } from '../../../constantes';

@Component({
  selector: 'app-cadastro-avaliacao',
  templateUrl: './cadastro-avaliacao.component.html',
  styleUrls: ['./cadastro-avaliacao.component.css']
})
export class CadastroAvaliacaoComponent implements OnInit {

  @ViewChild('formAvaliacoes') formAvaliacoes: NgForm;
  
  avaliacao: Avaliacao
  estado: string
  estados: ChaveValor[]
  usuarios: ChaveValor[]
  respostas: ChaveValor[]
  mensagem: Mensagem
  tipoAvaliacao: number = 0

  constructor(private avaliacaoService: AvaliacaoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.mensagem = new Mensagem()
    let idAvaliado = this.route.snapshot.params['idAvaliado']
    if (idAvaliado != 0) {
      this.usuarioService.buscaPorId(idAvaliado)
          .subscribe(
            (result) => {
              this.avaliacao.idAvaliado = result.id
              this.estado = result.estado
              
              this.usuarioService.listaPorEstado(this.estado)
                  .subscribe(
                    (result) => {
                      this.carregaUsuarios(result)
                    }
                  )
            }
          )
    
    }

    this.avaliacao = new Avaliacao()
    this.estados = ESTADOS
    this.respostas = RESPOSTAS_PERFORMANCE 
  }

  private carregaUsuarios(listaDeUsuarios: Usuario[]) {
    this.usuarios = new Array()
    for (let i=0; i<listaDeUsuarios.length; i++) {
      let u: ChaveValor = new ChaveValor((listaDeUsuarios[i].id).toString(), listaDeUsuarios[i].nome)
      this.usuarios.push(u)
    }
  }

  avaliar() {
    if (this.isFormularioValido() == 0) {
      console.log("Granvando...")
      this.avaliacao.idUsuario = this.usuarioService.getUsuario().id
      this.avaliacaoService.inclui(this.avaliacao)
          .subscribe(
            (result) => {
              //this.mensagem = new Mensagem(MensagemEnum.S, 'Avaliação salva com sucesso!!!')
              this.router.navigate(['dashboard'])
            },
            (error) => this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao incluir avaliação!!!')
          )
    }
  }

  private isFormularioValido(): number {
    let retorno: number = 0;
    if (this.tipoAvaliacao == 0) {
      if (this.avaliacao.respostaSaque === undefined || this.avaliacao.respostaSaque == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaForehand === undefined || this.avaliacao.respostaForehand == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaBackhand === undefined || this.avaliacao.respostaBackhand == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaVoleio === undefined || this.avaliacao.respostaVoleio == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaSmash === undefined || this.avaliacao.respostaSmash == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaOfensivo === undefined || this.avaliacao.respostaOfensivo == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaDefensivo === undefined || this.avaliacao.respostaDefensivo == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaTatico === undefined || this.avaliacao.respostaTatico == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaCompetitivo === undefined || this.avaliacao.respostaCompetitivo == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }else if(this.avaliacao.respostaPreparo === undefined || this.avaliacao.respostaPreparo == "") {
        this.mensagem = new Mensagem(MensagemEnum.E, 'Favor preencher todas as avaliações.');
        retorno = 1
      }
    }
    return retorno
  }

  atualizaUsuarios(estado: string) {
    this.usuarioService.listaPorEstado(estado)
        .subscribe(
          (result) => {
            this.carregaUsuarios(result)
          }
        )
    this.avaliacao.idAvaliado = ""
  }

  setValorSelecionado(valorDaAvaliacao: number, valor: string) {
    if (valor == "saque") {
      this.avaliacao.respostaSaque = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "forehand") {
      this.avaliacao.respostaForehand = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "backhand") {
      this.avaliacao.respostaBackhand = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "voleio") {
      this.avaliacao.respostaVoleio = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "smash") {
      this.avaliacao.respostaSmash = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "ofensivo") {
      this.avaliacao.respostaOfensivo = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "defensivo") {
      this.avaliacao.respostaDefensivo = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "tatico") {
      this.avaliacao.respostaTatico = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "competitivo") {
      this.avaliacao.respostaCompetitivo = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }else if (valor == "preparo") {
      this.avaliacao.respostaPreparo = this.retornaRespostaAvaliacao(valorDaAvaliacao);
    }
  }

  limpaValoresAvaliacao() {
    if (this.tipoAvaliacao == 0) {
      this.avaliacao.respostaSaque = "";
      this.avaliacao.respostaForehand = "";
      this.avaliacao.respostaBackhand = "";
      this.avaliacao.respostaVoleio = "";
      this.avaliacao.respostaSmash = "";
      this.avaliacao.respostaOfensivo = "";
      this.avaliacao.respostaDefensivo = "";
      this.avaliacao.respostaTatico = "";
      this.avaliacao.respostaCompetitivo = "";
      this.avaliacao.respostaPreparo = "";
    }
  }

  private retornaRespostaAvaliacao(valorDaAvaliacao: number): string {
    if (valorDaAvaliacao == 1) {
      return "RUIM"
    }else if (valorDaAvaliacao == 2) {
      return "REGULAR"
    }else if (valorDaAvaliacao == 3) {
      return "BOM"
    }else if (valorDaAvaliacao == 4) {
      return "OTIMO"
    }else{
      return ""
    }
  }

}

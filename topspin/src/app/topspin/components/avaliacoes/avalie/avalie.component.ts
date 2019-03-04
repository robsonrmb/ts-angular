import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Avaliacao, ChaveValor, Mensagem, AvaliacaoArea, Usuario } from 'src/app/topspin/models';
import { AvaliacaoService, UsuarioService } from 'src/app/topspin/services';
import { ESTADOS, RESPOSTAS_PERFORMANCE } from 'src/app/topspin/constantes';

@Component({
  selector: 'app-avalie',
  templateUrl: './avalie.component.html',
  styleUrls: ['./avalie.component.css']
})
export class AvalieComponent implements OnInit {

  @ViewChild('formAvaliacoes') formAvaliacoes: NgForm;
  
  avaliacao: Avaliacao
  estado: string
  estados: ChaveValor[]
  usuarios: ChaveValor[]
  respostas: ChaveValor[]
  respostasSelecionadas: string[]
  mensagem: Mensagem

  listaDeAvaliacoes: AvaliacaoArea[]
  
  constructor(private avaliacaoService: AvaliacaoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
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
     
      this.mensagem = new Mensagem()
    }

    this.avaliacaoService.listaAreaAvaliacoes().subscribe(
      (result) => {
        console.log(result)
        this.listaDeAvaliacoes = result
      },
      (error) => console.log('Erro ao listar as avaliações!!!')
    )

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
    this.avaliacao.idUsuario = this.usuarioService.getUsuario().id
    console.log(this.formAvaliacoes.value)
    console.log(this.formAvaliacoes[0].value)
    /*
    this.avaliacaoService.inclui(this.avaliacao)
        .subscribe(
          (result) => {
            //this.mensagem = new Mensagem(MensagemEnum.S, 'Avaliação salva com sucesso!!!')
            this.router.navigate(['dashboard'])
          },
          (error) => console.log('Erro ao incluir avaliação!!!')
        )*/
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

}

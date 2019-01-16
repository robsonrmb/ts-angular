import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Usuario, ChaveValor, Avaliacao } from 'src/app/topspin/models';
import { AvaliacaoService, UsuarioService } from '../../../services';
import { ESTADOS, RESPOSTAS_PERFORMANCE } from '../../../constantes';

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
    this.avaliacao.idUsuario = this.usuarioService.getUsuario().id
    this.avaliacaoService.inclui(this.avaliacao)
        .subscribe(
          (result) => {
            console.log('Avaliação salva com sucesso!!!')
            this.router.navigate(['dashboard'])
          },
          (error) => console.log('Erro ao incluir avaliação!!!')
        )
  }

  atualizaUsuarios(estado: string) {
    this.usuarioService.listaPorEstado(estado)
        .subscribe(
          (result) => {
            this.carregaUsuarios(result)
          }
        )
  }

}

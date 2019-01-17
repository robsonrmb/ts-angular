import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Jogo, ChaveValor } from '../../../models';
import { TIPOSJOGO, RESULTADOS, PLACARES } from '../../../constantes';
import { UsuarioService, JogoService } from '../../../services';

@Component({
  selector: 'app-cadastro-jogo',
  templateUrl: './cadastro-jogo.component.html',
  styleUrls: ['./cadastro-jogo.component.css']
})
export class CadastroJogoComponent implements OnInit {

  @ViewChild('formJogos') formJogos: NgForm;

  private jogo: Jogo
  tipos: ChaveValor[]
  resultados: ChaveValor[]
  placares: ChaveValor[] 
  
  constructor(private usuarioService: UsuarioService,
              private jogoService: JogoService) { }

  ngOnInit() {
    this.jogo = new Jogo()
    this.jogo.qtdTieVencidos = 0
    this.jogo.qtdTiePerdidos = 0
    this.tipos = TIPOSJOGO
    this.resultados = RESULTADOS
    this.placares = PLACARES
  }

  salvar() {
    let msg = this.validaFormulario()
    if (msg == "") {
      this.jogo.idUsuario = this.usuarioService.getUsuario().id
      this.jogoService.inclui(this.jogo)
          .subscribe(
            (result) => {
              console.log('Jogo incluído com sucesso!!!')
            },
            (error) => console.log('Erro ao incluir jogo.')
          )
    }else{
      console.log(msg)
    }
  }

  validaFormulario(): string {
    let mensagem: string = ''
    if (this.jogo.placar == "2a0") {
      if (this.jogo.qtdTieVencidos > 2 || this.jogo.qtdTiePerdidos > 0) {
        mensagem = "Erro"
      }
    }else if (this.jogo.placar == "2a1") {
      if (this.jogo.qtdTieVencidos > 2 || this.jogo.qtdTiePerdidos > 1) {
        mensagem = "Erro"
      }
    }else if (this.jogo.placar == "3a0") {
      if (this.jogo.qtdTieVencidos > 3 || this.jogo.qtdTiePerdidos > 0) {
        mensagem = "Erro"
      }
    }else if (this.jogo.placar == "3a1") {
      if (this.jogo.qtdTieVencidos > 3 || this.jogo.qtdTiePerdidos > 1) {
        mensagem = "Erro"
      }
    }else if (this.jogo.placar == "3a2") {
      if (this.jogo.qtdTieVencidos > 3 || this.jogo.qtdTiePerdidos > 2) {
        mensagem = "Erro"
      }
    }
    if (mensagem == "Erro") {
      mensagem = "Quantidade de tiebreaks incorreto para o placar do jogo."
    }
    return mensagem
  }

}
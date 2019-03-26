import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Jogo, ChaveValor, Mensagem } from '../../../models';
import { TIPOSJOGO, RESULTADOS, PLACARES, MensagemEnum } from '../../../constantes';
import { UsuarioService, JogoService } from '../../../services';

@Component({
  selector: 'app-cadastro-jogo',
  templateUrl: './cadastro-jogo.component.html',
  styleUrls: ['./cadastro-jogo.component.css']
})
export class CadastroJogoComponent implements OnInit {

  @ViewChild('formJogos') formJogos: NgForm;

  private jogo: Jogo;
  tipos: ChaveValor[];
  resultados: ChaveValor[];
  placares: ChaveValor[];
  mensagem: Mensagem;
  
  constructor(private usuarioService: UsuarioService,
              private jogoService: JogoService) { }

  ngOnInit() {
    this.jogo = new Jogo();
    this.jogo.qtdTieVencidos = 0;
    this.jogo.qtdTiePerdidos = 0;
    this.tipos = TIPOSJOGO;
    this.resultados = RESULTADOS;
    this.placares = PLACARES;
    this.mensagem = new Mensagem();
  }

  salvar() {
    let msg = this.validaFormulario();
    this.jogo.data = this.converteData_ddMMyyyy_para_yyyyMMdd(this.jogo.dataJogoFormatada);
    if (msg == "") {
      this.jogo.idUsuario = this.usuarioService.getUsuario().id;
      this.jogoService.inclui(this.jogo)
          .subscribe(
            (result) => {
              this.mensagem = new Mensagem(MensagemEnum.S, 'Jogo incluído com sucesso!!!')
            },
            (error) => this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao incluir jogo.')
          );
    } else {
      this.mensagem = new Mensagem(MensagemEnum.E, msg);
    }
  }

  validaFormulario(): string {
    let mensagem: string = '';
    if (this.jogo.placar == '0') { // 2a0
      if (this.jogo.qtdTieVencidos > 2 || this.jogo.qtdTiePerdidos > 0) {
        mensagem = 'Erro';
      }
    } else if (this.jogo.placar == '1') { // 2a1
      if (this.jogo.qtdTieVencidos > 2 || this.jogo.qtdTiePerdidos > 1) {
        mensagem = 'Erro';
      }
    } else if (this.jogo.placar == '2') { // 3a0
      if (this.jogo.qtdTieVencidos > 3 || this.jogo.qtdTiePerdidos > 0) {
        mensagem = 'Erro';
      }
    } else if (this.jogo.placar == '3') { // 3a1
      if (this.jogo.qtdTieVencidos > 3 || this.jogo.qtdTiePerdidos > 1) {
        mensagem = 'Erro';
      }
    } else if (this.jogo.placar == '4') { // 3a2
      if (this.jogo.qtdTieVencidos > 3 || this.jogo.qtdTiePerdidos > 2) {
        mensagem = 'Erro';
      }
    }
    if (mensagem == 'Erro') {
      mensagem = 'Quantidade de tiebreaks incorreto para o placar do jogo.';
    }
    return mensagem;
  }

  formataData() {
    let dt = this.jogo.dataJogoFormatada;
    if (dt != undefined) {
      if (dt.length == 2) {
        dt = dt + '/';
      }else if (dt.length == 5) {
        dt = dt + '/';
      }
    }
    this.jogo.dataJogoFormatada = dt;
  }

  private converteData_ddMMyyyy_para_yyyyMMdd(data: string): string {
    let dataF = data.substring(6) + '-' +
                data.substring(3,5) + '-' +
                data.substring(0,2);
    return dataF;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario, ChaveValor } from '../../../models';
import { UsuarioService } from '../../../services';
import { ESTADOS, NIVEIS, TIPOSCD } from '../../../constantes';

@Component({
  selector: 'app-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  @ViewChild('formUsuarios') formUsuarios: NgForm;

  usuario: Usuario
  estados: ChaveValor[]
  tipos: ChaveValor[]
  niveis: ChaveValor[] 

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.buscaPorId(this.usuarioService.getUsuario().id)
        .subscribe(
          (result) => {
            this.usuario = result
          }
        )
    this.estados = ESTADOS
    this.niveis = NIVEIS
    this.tipos = TIPOSCD
  }

  salvar() {
    this.usuarioService.altera(this.usuario)
        .subscribe(
          (result) => {
            console.log('Usuário alterado com sucesso!!!')
          }
        )
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Convite, ChaveValor, Usuario } from '../../../models';
import { PERIODOS } from '../../../constantes';
import { ConviteService, UsuarioService } from '../../../services';

@Component({
  selector: 'app-cadastro-convite',
  templateUrl: './cadastro-convite.component.html',
  styleUrls: ['./cadastro-convite.component.css']
})
export class CadastroConviteComponent implements OnInit {

  @ViewChild('formConvites') formConvites: NgForm;
  convidado: Usuario
  convite: Convite
  periodos: ChaveValor[]

  constructor(private conviteService: ConviteService,
              private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.usuarioService.buscaPorId(this.route.snapshot.params['idConvidado'])
        .subscribe(
          (result) => {
            this.convidado = result
          }
        )

    this.convite = new Convite()
    this.periodos = PERIODOS
  }

  salvar() {
    let conviteFinal = this.convite
    conviteFinal.idUsuario = this.usuarioService.getUsuario().id
    conviteFinal.idConvidado = this.convidado.id
    this.conviteService.inclui(conviteFinal)
        .subscribe(
          (result) => {
            console.log('Convite salvo com sucesso!!!')
            this.router.navigate(['/listaAmigos'])
          }
        )
  }

}

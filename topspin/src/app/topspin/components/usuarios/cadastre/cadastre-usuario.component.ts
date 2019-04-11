import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Usuario, ChaveValor, Mensagem } from 'src/app/topspin/models';
import { UsuarioService } from 'src/app/topspin/services';
import { ESTADOS, NIVEIS, TIPOSCD, SEXOS, MensagemEnum } from 'src/app/topspin/constantes';

@Component({
  selector: 'app-cadastre-usuario',
  templateUrl: './cadastre-usuario.component.html',
  styleUrls: ['./cadastre-usuario.component.css']
})
export class CadastreUsuarioComponent implements OnInit {

  usuario: Usuario;
  formulario: FormGroup;
  estados: ChaveValor[];
  tipos: ChaveValor[];
  niveis: ChaveValor[];
  sexos: ChaveValor[];
  mensagem: Mensagem;
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    /*
    this.formulario = new FormGroup({
      email: new FormControl(null),
      nome: new FormControl(null),
      apelido: new FormControl(null),
      dataNascimento: new FormControl(null),
      estado: new FormControl(null),
      cidade: new FormControl(null),
      ondeJoga: new FormControl(null),
      sexo: new FormControl(null),
      tipo: new FormControl(null),
      nivel: new FormControl(null)
    })
    */
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required]],
      nome: [null, [Validators.required, Validators.maxLength(40)]],
      apelido: [null],
      dataNascimento: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      ondeJoga: [null],
      sexo: [null, [Validators.required]],
      tipo: [null],
      nivel: [null],
      termos: [null],
      frameworks: this.buildFrameworks()
    })

    this.usuarioService.buscaPorId(this.usuarioService.getUsuario().id)
        .subscribe(
          (result) => {
            this.usuario = result;
          }
        );
    
    this.estados = ESTADOS;
    this.niveis = NIVEIS;
    this.tipos = TIPOSCD;
    this.sexos = SEXOS;
    this.mensagem = new Mensagem();

  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values);
    /*
    this.formBuilder.array([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]);
    */
  }

  salvar() {
    this.usuario.dataNascimento = this.converteData_ddMMyyyy_para_yyyyMMdd(this.usuario.dataNascimentoFormatada)
    /*
    this.usuarioService.altera(this.usuario)
        .subscribe(
          (result) => {
            this.mensagem = new Mensagem(MensagemEnum.S, 'Usuário alterado com sucesso!!!');
          },
          (error) => {
            this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao alterar usuário!!!');
          }
        );*/

    let valueSubmit = Object.assign({}, this.formulario.value); //fazendo uma cópia do formulário

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v !== null)
    });

    console.log(valueSubmit);
  }

  formataData() {
    let dt = this.usuario.dataNascimentoFormatada
    if (dt != undefined) {
      if (dt.length == 2) {
        dt = dt + '/';
      } else if (dt.length == 5) {
        dt = dt + '/';
      }
    }
    this.usuario.dataNascimentoFormatada = dt;
  }

  private converteData_ddMMyyyy_para_yyyyMMdd(data: string): string {
    let dataF = data.substring(6) + '-' +
                data.substring(3,5) + '-' +
                data.substring(0,2);
    return dataF;
  }

}

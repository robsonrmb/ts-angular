import { Injectable } from '@angular/core';
import { ErroGlobal } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ErroService {

  private erroGlobal: ErroGlobal

  constructor() { }

  setErroGlobal(mensagem: string,
                status: string,
                data: string,
                causa: string,
                path: string,
                stackTrace: string) {

      this.erroGlobal.mensagem = mensagem
      this.erroGlobal.status = status
      this.erroGlobal.data = data
      this.erroGlobal.causa = causa
      this.erroGlobal.path = path
      this.erroGlobal.stackTrace = stackTrace
  }

  getMensagem(): String {
    return this.erroGlobal.mensagem
  }
  setMensagem(msg: string) {
    this.erroGlobal.mensagem = msg
  }

  getStatus(): String {
    return this.erroGlobal.status
  }
  setStatus(st: string) {
    this.erroGlobal.status = st
  }

  getData(): String {
    return this.erroGlobal.data
  }

  getCausa(): String {
    return this.erroGlobal.causa
  }

  getPath(): String {
    return this.erroGlobal.path
  }

  getStackTrace(): String {
    return this.erroGlobal.stackTrace
  }
}

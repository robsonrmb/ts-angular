import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { RECURSO_URL_ESTATISTICAS } from '../constantes';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {

  constructor(private http: Http,
              private usuarioService: UsuarioService) { }

  buscaQtdEstatisticasAceitas(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/qtd-avaliacoes-aceitas/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }
  
  buscaEstatisticaDeVitoriasEDerrotas(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/vitoriasederrotas/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaEstatisticaDeTiebreaks(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/tiebreaks/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaEstatisticaPorTipo(idUsuario: string, tipo: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/usuario/${idUsuario}/tipoEstatistica/${tipo}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdAvaliacoesAceitas(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/qtd-avaliacoes-aceitas/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdAvaliacoesRecusadas(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/qtd-avaliacoes-recusadas/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesRecebidosAceitos(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/qtd-convites-recebidos-aceitos/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesRecebidosRecusados(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/qtd-convites-recebidos-recusados/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesEnviados(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/qtd-convites-enviados/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdJogosRealizados(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/qtd-jogos-realizados/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

}

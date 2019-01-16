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

  buscaEstatisticaDeVitoriasEDerrotas(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/usuario/${idUsuario}/vitoriasederrotas`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaEstatisticaDeTiebreaks(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/usuario/${idUsuario}/tiebreaks`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaEstatisticaPorTipo(idUsuario: string, tipo: string) {
    return this.http.get(`${RECURSO_URL_ESTATISTICAS}/usuario/${idUsuario}/tipoEstatistica/${tipo}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }
}

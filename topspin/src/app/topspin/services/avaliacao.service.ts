import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { RECURSO_URL_AVALIACOES } from '../constantes';
import { Avaliacao } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(private http: Http) { }

  inclui(avaliacao: Avaliacao): Observable<boolean> {
    return this.http.post(`${RECURSO_URL_AVALIACOES}/add`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  exclui(id: string): Observable<boolean> {
    return this.http.delete(`${RECURSO_URL_AVALIACOES}/remove`, id)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  aceita(avaliacao: Avaliacao): Observable<boolean> {
    return this.http.put(`${RECURSO_URL_AVALIACOES}/aceita`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  recusa(avaliacao: Avaliacao): Observable<boolean> {
    return this.http.put(`${RECURSO_URL_AVALIACOES}/recusa`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  listaAvaliacoesRecebidasPorUsuarioEStatus(avaliacao: Avaliacao) {
    return this.http.get(`${RECURSO_URL_AVALIACOES}/recebidas/${avaliacao.idUsuario}/status/${avaliacao.status}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  countAvaliacoesPendentes(idUsuario: string) {
    return this.http.get(`${RECURSO_URL_AVALIACOES}/recebidas/${idUsuario}/countPendentes`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

}

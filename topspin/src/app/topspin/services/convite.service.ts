import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { RECURSO_URL_CONVITES } from '../constantes';
import { Convite } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConviteService {

  constructor(private http: Http) { }

  inclui(convite: Convite): Observable<boolean> {
    return this.http.post(`${RECURSO_URL_CONVITES}/add`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  altera(convite: Convite): Observable<boolean> {
    return this.http.put(`${RECURSO_URL_CONVITES}/update`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  aceita(convite: Convite): Observable<boolean> {
    return this.http.put(`${RECURSO_URL_CONVITES}/aceita`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  recusa(convite: Convite): Observable<boolean> {
    return this.http.put(`${RECURSO_URL_CONVITES}/recusa`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  exclui(id: string): Observable<boolean> {
    return this.http.delete(`${RECURSO_URL_CONVITES}/remove/${id}`)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  listaConvitesPorUsuario(convite: Convite) {
    if (convite.status !== undefined) {
      return this.http.get(`${RECURSO_URL_CONVITES}/usuario/${convite.idUsuario}/status/${convite.status}`)
                      .map(response => response.json())
                      .catch(error => throwError(error));
    }else{
      return this.http.get(`${RECURSO_URL_CONVITES}/usuario/${convite.idUsuario}`)
                      .map(response => response.json())
                      .catch(error => throwError(error));
    }
  }

  listaConvitesPorConvidado(convite: Convite) {
    if (convite.status !== undefined && convite.status !== '') {
      return this.http.get(`${RECURSO_URL_CONVITES}/convidado/${convite.idConvidado}/status/${convite.status}`)
                      .map(response => response.json())
                      .catch(error => throwError(error));
    }else{
      return this.http.get(`${RECURSO_URL_CONVITES}/convidado/${convite.idConvidado}`)
                      .map(response => response.json())
                      .catch(error => throwError(error));
    }
  }

  listaConvitesNaoPendentesPorConvidado(convite: Convite) {
    return this.http.get(`${RECURSO_URL_CONVITES}/convidado/${convite.idConvidado}/naoPendentes`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  countConvitesPendentes(idConvidado: string) {
    return this.http.get(`${RECURSO_URL_CONVITES}/convidado/${idConvidado}/countPendentes`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }
}

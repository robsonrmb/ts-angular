import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { Jogo, UltimosJogos } from '../models';
import { RECURSO_URL_JOGOS } from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: Http) { }

  inclui(jogo: Jogo): Observable<boolean> {
    return this.http.post(`${RECURSO_URL_JOGOS}/add`, jogo)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  listaUltimosJogosPorUsuario(id: string, qtd: number): Observable<UltimosJogos> {
    return this.http.get(`${RECURSO_URL_JOGOS}/usuario/${id}/ultimosJogos/${qtd}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

}

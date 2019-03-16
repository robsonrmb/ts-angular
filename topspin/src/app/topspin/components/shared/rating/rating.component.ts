import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Output() valorEmit = new EventEmitter<number>()

  valores: number[] = [1,2,3,4]
  valor: number = 0
  valorTemporario: number

  constructor() { }

  ngOnInit() {
  }

  setValor(vlr: number) {
    this.valor = vlr
    this.valorTemporario = undefined
    this.valorEmit.emit(this.valor)
  }

  setValorTemporario(vlr: number) {
    if (this.valorTemporario === undefined) {
      this.valorTemporario = this.valor
    }
    this.valor = vlr
  }

  setLimparValorTemporario() {
    if (this.valorTemporario !== undefined) {
      this.valor = this.valorTemporario
      this.valorTemporario = undefined
    }
  }

}

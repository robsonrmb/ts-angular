import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  @Input() mensagemTipo: string
  @Input() mensagemTop: string

  constructor() { }

  ngOnInit() {
  }

}

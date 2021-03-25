import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'boot-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  @Input() color: string;
  @Input() mensaje: string;

  constructor() { }

  ngOnInit(): void {
  }

}

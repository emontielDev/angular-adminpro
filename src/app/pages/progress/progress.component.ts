import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  porcentaje1: number;
  porcentaje2: number;
  constructor() {
  }

  ngOnInit() {
    this.porcentaje1 = 90;
    this.porcentaje2 = 60;
  }

  // actualizar(event: number) {
  //   console.log('Evento: ', event);
  //   this.porcentaje1 = event;
  // }

  }

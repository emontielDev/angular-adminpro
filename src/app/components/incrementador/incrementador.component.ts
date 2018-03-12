import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('titulo') leyenda: string;
  @Input() porcentaje: number;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {

    // Se ejecuta antes de asignar los valores es decir el order es contructor y despues ngOnInit
    this.leyenda = '';
    this.porcentaje = 0;
  }

  ngOnInit() {
  }

  onChange( newValue: number ) {
    // let elementHTML: any = document.getElementsByName('progreso')[0];

    if (newValue >= 100 ) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    // Evitar que sobrepase el valor maximo.
    this.txtProgress.nativeElement.value = this.porcentaje;

    this.cambioValor.emit( this.porcentaje );
  }

  cambiarValor(valor: number) {
    if ( this.porcentaje + valor > 100 ) {
      return;
      }
      if ( this.porcentaje + valor < 0 ) {
      return;
      }
      this.porcentaje += valor;
      this.cambioValor.emit( this.porcentaje );
      this.txtProgress.nativeElement.select();
      // this.txtProgress.nativeElement.focus();
      }
  }

import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl:  'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor() {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    console.log('Guardado en el local storage.');
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('Cargado del local storage');
    } else {
      console.log('Usando valores por defecto');
    }
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}

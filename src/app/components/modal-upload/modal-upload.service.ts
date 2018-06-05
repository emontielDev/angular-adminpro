import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal Upload listo');
   }

  public mostrarModal(tipo: string, id: string) {
    this.id = id;
    this.oculto = '';
    this.tipo = tipo;
  }

  public ocultarModal() {
    this.id = null;
    this.oculto = 'oculto';
    this.tipo = null;
  }

}

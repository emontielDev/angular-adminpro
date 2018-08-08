import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class MedicoService {

  constructor(
    public _http: HttpClient
  ) { }

  actualizar(id: string, nombre: string, hospital: string) {
    let url = `${URL_SERVICIOS}medico/${id}`;

    return this._http.put(url, { nombre, hospital });
  }

  buscarMedico(texto: string) {
    let url  = `${URL_SERVICIOS}busqueda/medicos/${texto}`;
    return this._http.get(url);
  }

  cargarMedicos( offset: Number = 0) {
    let url = `${URL_SERVICIOS}medico?offset${offset <= 0 ? '=0' : '=' + offset}`;

    return this._http.get(url);
  }

  cargarMedico( id: string ) {
    let url = `${URL_SERVICIOS}medico/${id}`;

    return this._http.get(url);
  }

  crearMedico( nombre: string, hospital: string) {
    let url = `${URL_SERVICIOS}medico`;

    return this._http.post(url, { nombre, hospital });
  }

  eliminar( id: string ) {
    let url  = `${URL_SERVICIOS}medico/${id}`;

    return this._http.delete(url);
  }

  guardar( id: string, nombre, hospital: string) {
    let url  = `${URL_SERVICIOS}medico`;

    if (id && id.length > 0) {
      return this._http.put(url, {id, nombre, hospital});
    } else {
      return this._http.post(url, {nombre, hospital});
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class HospitalService {

  constructor(
    public _http: HttpClient
  ) { }

  actualizarNombre(id: string, nombre: string) {
    let url = `${URL_SERVICIOS}hospital/${id}`;

    return this._http.put(url, { nombre });
  }

  cargarHospitales( offset: Number = 0) {
    let url = `${URL_SERVICIOS}hospital?offset${offset <= 0 ? '=0' : '=' + offset}`;

    return this._http.get(url);
  }

  crearHospital( nombre: string) {
    let url = `${URL_SERVICIOS}hospital`;

    return this._http.post(url, { nombre });
  }

  eliminarHospital( id: string ) {
    let url  = `${URL_SERVICIOS}hospital/${id}`;

    return this._http.delete(url);
  }

  obtenerHospital(id: string ) {
    let url = `${URL_SERVICIOS}hospital/${id}`;

    return this._http.get(url);
  }

  buscarHospital(texto: string) {
    let url  = `${URL_SERVICIOS}busqueda/hospitales/${texto}`;
    return this._http.get(url);
  }
}

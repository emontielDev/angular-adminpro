import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class BusquedaService {

  constructor(
    public _http: HttpClient
  ) { }

  buscar(q: string) {
    let url = `${URL_SERVICIOS}busqueda/todo/${q}`;

    return this._http.get(url);
  }

}

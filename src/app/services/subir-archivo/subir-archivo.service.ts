import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubirArchivoService {

  constructor(
    private http: HttpClient
  ) { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    let url = URL_SERVICIOS + 'upload/' + tipo + '/' + id;
    let formData = new FormData();

    formData.append('imagen', archivo, archivo.name);

    return this.http.put(url, formData, {reportProgress: true});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';

import { URL_SERVICIOS } from '../../config/config';
import { UsuarioLocalStorage } from './usuario.storage';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  constructor(
    public http: HttpClient,
    private _usuarioStorage: UsuarioLocalStorage
  ) { }

  autenticarUsuario(usuario: Usuario, recordar: Boolean = false) {
    let url = URL_SERVICIOS + 'login';

    return this.http.post(url, usuario);
  }

  autenticarUsuarioGoogle(token: string) {
    let url = URL_SERVICIOS + 'login/google';

    return this.http.post(url, { token });
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + 'usuario';

    return this.http.post(url, usuario);
  }

  actualizarUsuario (usuario: Usuario) {
    let url = URL_SERVICIOS + 'usuario/' + usuario._id;

    return this.http.put(url, {nombre: usuario.nombre, email: usuario.email });
  }

  actualizarRoleUsuario (usuario: Usuario) {
    let url = `${URL_SERVICIOS}usuario/${usuario._id}/role`;

    return this.http.put(url, {role: usuario.role});
  }

  obtenerUsuarios(offset: number = 0) {
    let url = `${URL_SERVICIOS}usuario?offset${offset <= 0 ? '=0' : '=' + offset}`;

    return this.http.get(url);
  }

  buscarUsuarios(texto: string) {
    let url  = `${URL_SERVICIOS}busqueda/usuarios/${texto}`;
    return this.http.get(url);
  }

  borrarUsuario(id: string) {
    let url  = `${URL_SERVICIOS}usuario/${id}`;
    return this.http.delete(url);
  }

  renovarToken() {
    let url = `${URL_SERVICIOS}login/refresh-token`;

    return this.http.post(url, {})
    .map((res: any) => {
      this._usuarioStorage.actualizarToken(res.token);
      return true;
    })
    .catch(err => {
      return Observable.throw(err);
    });
  }

}

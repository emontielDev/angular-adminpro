import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService, UsuarioLocalStorage } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import { NgZone } from '@angular/core';

/* La siguiente linea es una solución para que el menu se configure cuando se cargue cada plugin por fuera
   de angular.
*/
declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2: any;

  constructor(
    private _zone: NgZone,
    public _usuarioService: UsuarioService,
    public _router: Router,
    private _usuarioLocalStorage: UsuarioLocalStorage
  ) { }

  ngOnInit() {
    initPlugins();
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '193100630961-f7v02i35jsvqd09pmj7ep2hrvk6v7qe9.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  ingresar(formulario: NgForm) {
    // console.log(formulario);
    if (formulario.invalid) {
      return;
    }
    let usuario = new Usuario(
      null,
      formulario.value.email,
      formulario.value.contrasenia
    );

    this._usuarioService.autenticarUsuario(usuario, formulario.value.recuerdame)
    .subscribe(resp => {
      this._usuarioLocalStorage.guardar(resp['usuario']['_id'], resp['token'], resp['usuario'] );
      // resp['usuario']['_id']
      // resp['token']
      // JSON.stringify(resp['usuario']
      this._router.navigate(['/dashboard']);
      // console.log(resp);
    }, e => {
      console.log(e);
    });

    // console.log(formulario.value);
    // console.log('Ingresando...');
    // this._router.navigate(['/dashboard']);
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._zone.run( () => {
        // console.log('ESTOU DENTRO DE UMA ZONA');
        this._usuarioService.autenticarUsuarioGoogle(token)
            .subscribe(resp => {
              this._usuarioLocalStorage.guardar(resp['usuario']['_id'], resp['token'], resp['usuario'] );
              this._router.navigate(['/dashboard']);
          }, e => {
          if (!e.error.ok) {
             swal(e.error.mensaje, e.error.errors.join('\n\r'), 'error');
          }
        });
      });

      // console.log(token);
    });
  }
}

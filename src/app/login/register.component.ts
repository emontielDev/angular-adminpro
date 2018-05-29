import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../services/service.index';

// SweetAlert
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
const swal: SweetAlert = _swal as any;

/* La siguiente linea es una solución para que el menu se configure cuando se cargue cada plugin por fuera
   de angular.
*/
declare function initPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    initPlugins();

    this.formularioRegistro = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasenia: new FormControl(null, Validators.required),
      confirmarContrasenia: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.equals('contrasenia', 'confirmarContrasenia') });

    // Unicamente de prueba
    this.formularioRegistro.setValue({
      nombre: 'Eder Montiel',
      correo: 'emontiel.argos@gmail.com',
      contrasenia: '1234',
      confirmarContrasenia: '1234',
      condiciones: true
    });
  }

  registrarUsuario() {
    if (this.formularioRegistro.invalid) {
      return;
    }

    if (!this.formularioRegistro.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      console.log('Debe de aceptar las condiciones.');
    }

    let usuarioEntity = new Usuario(
      this.formularioRegistro.value.nombre,
      this.formularioRegistro.value.correo,
      this.formularioRegistro.value.contrasenia
    );

    this._usuarioService.crearUsuario(usuarioEntity)
    .subscribe(resp => {
      // console.log(resp);
       if (resp['ok'] === true) {
         swal('Usuario creado', resp['usuario']['email'], 'success');
         this.router.navigate(['/login']);
      } else {
        swal(resp['message'], resp['errors'], 'danger');
      }
    }, e => {
      console.log(e);
      swal(e.error.mensaje, e.error.errors.message, 'error');
    });

    // console.log('Formulario Valido: ', this.formularioRegistro.valid);
    // console.log(this.formularioRegistro);
  }

  equals (campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let field1 = group.controls[campo1].value;
      let field2 = group.controls[campo2].value;

      return field1 === field2 ? null : { equals: true };
    };
  }
}

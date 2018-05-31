import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioLocalStorage, UsuarioService, SubirArchivoService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { FormGroup } from '@angular/forms';

// SweetAlert
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  @ViewChild('imagen')
  myInputVariable: any;

  usuario: Usuario;
  imagenSeleccionada: File;
  imagenTemp: string;

  constructor(
    private _usuarioLocalStorage: UsuarioLocalStorage,
    private _usuarioService: UsuarioService,
    private _subirArchivoService: SubirArchivoService
  ) {
    this.usuario = _usuarioLocalStorage.usuario;
  }

  ngOnInit() {
  }

  cancelar() {
    this.imagenTemp = null;
    this.imagenSeleccionada = null;
    this.myInputVariable.nativeElement.value = '';
  }

  guardar(formulario: FormGroup) {
    let usuarioEntity = new Usuario(
      formulario.value.nombre,
      formulario.value.email,
      null,
      null,
      null,
      null,
      this.usuario._id
    );
    this._usuarioService.actualizarUsuario(usuarioEntity)
    .subscribe(resp => {
      this.usuario.nombre = (resp['usuario'] as Usuario).nombre;
      this._usuarioLocalStorage.actualizarUsuario(resp['usuario'] as Usuario);
      swal('Datos actualizados', `Los datos del usuario '${this.usuario.email}' fueron actualizados.`, 'success');
    });

    // console.log(formulario.value);
  }

  seleccionImagen(event) {
    let file = event.target.files[0] as File;
    if (!file) {
      this.imagenSeleccionada = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Archivo no permitido', 'El archivo seleccionado no es una imagen.', 'warning');
      return;
    }

    this.imagenSeleccionada = file;

    let fileReader = new FileReader();
    fileReader.onload = (res) => this.imagenTemp = res.target.result;

    fileReader.readAsDataURL(file);
  }

  // vistaPrevia(file: File) {
  //   let fileReader = new FileReader();
  //   fileReader.onload = (res) => {
  //     res.target.result
  //   };

  //   reader.readAsDataURL(file);
  // }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSeleccionada, 'usuarios', this.usuario._id)
    .subscribe(res => {
      this.usuario.img = (res['usuarios'] as Usuario).img;
      this._usuarioLocalStorage.actualizarUsuario(res['usuarios'] as Usuario);
      this.cancelar();
    }, error => {
      console.log(error);
    });
  }

}

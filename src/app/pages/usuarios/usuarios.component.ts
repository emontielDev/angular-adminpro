import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, UsuarioLocalStorage  } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  offset = 0;
  total = 0;
  cargando: Boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    protected _usuarioLocalStorage: UsuarioLocalStorage,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(res => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    // console.log(this.offset);
    this._usuarioService.obtenerUsuarios(this.offset)
    .subscribe(res => {
      this.total = res['total'];
      this.usuarios = res['usuarios'];
      this.cargando = false;
    });
  }

  cambiarPagina(valor: number) {
    let offsetTemporal = this.offset + valor;
    if (offsetTemporal >= this.total || offsetTemporal < 0) {
      return;
    }

    this.offset += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(texto: string) {
    if (texto.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this._usuarioService.buscarUsuarios(texto)
    .subscribe(res => {
      this.cargando = false;
      this.usuarios = res['usuarios'];
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioLocalStorage.id) {
      swal('No se puede borrar usuario', 'No se puede eliminar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro que desea eliminar el usuario?',
      text: `El usuario esta a punto de eliminar a ${usuario.email} del sistema.`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( (confirm) => {
      if (confirm) {
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe(res => {
          if (res['ok'] === true) {
            swal('Usuario eliminado', 'La cuenta fue eliminada con exito', 'success');
            this.cargarUsuarios();
          }
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarRoleUsuario(usuario)
    .subscribe(res => {
      if (usuario._id === this._usuarioLocalStorage.id) {
        // Actualizamos el rol del usuario logueado
        this._usuarioLocalStorage.actualizarRolUsuario(res['usuario']);
      }
      swal('Perfil actualizado', `El perfil del usuario ${usuario.email}`, 'success');
      this.cargarUsuarios();
    });
  }

  mostrarModal(usuario: Usuario) {
    this._modalUploadService.mostrarModal('usuarios', usuario._id);
  }
}

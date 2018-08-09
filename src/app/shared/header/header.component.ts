import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLocalStorage } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(
    protected _usuarioLocalStorage: UsuarioLocalStorage,
    protected _router: Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioLocalStorage.usuario;
  }

  cerrarSesion() {
    this._usuarioLocalStorage.eliminar();
    this._router.navigate(['/login']);
  }

  buscar(q: string) {
    this._router.navigate(['/busqueda', q]);
  }
}

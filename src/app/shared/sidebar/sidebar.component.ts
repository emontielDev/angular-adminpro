import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioLocalStorage } from '../../services/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  constructor(
    protected _router: Router,
    public _sidebar: SidebarService,
    protected _usuarioLocalStorage: UsuarioLocalStorage,
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioLocalStorage.usuario;
    this._sidebar.cargarMenu();
  }

  cerrarSesion() {
    this._usuarioLocalStorage.eliminar();
    this._router.navigate(['/login']);
  }

}

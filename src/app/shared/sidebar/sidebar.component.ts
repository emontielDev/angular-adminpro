import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioLocalStorage } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _sidebar: SidebarService,
    protected _usuarioLocalStorage: UsuarioLocalStorage,
    protected _router: Router
  ) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this._usuarioLocalStorage.eliminar();
    this._router.navigate(['/login']);
  }

}

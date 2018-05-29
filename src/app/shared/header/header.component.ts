import { Component, OnInit } from '@angular/core';
import { UsuarioLocalStorage } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(
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

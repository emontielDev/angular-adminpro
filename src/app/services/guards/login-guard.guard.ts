import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioLocalStorage } from '../service.index';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(
    private _usuarioLocalStorage: UsuarioLocalStorage,
    public _router: Router
  ) {

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this._usuarioLocalStorage.cargar();
    if (this._usuarioLocalStorage.estaAutenticado()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}

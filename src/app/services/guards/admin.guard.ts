import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioLocalStorage } from '../service.index';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private _usuarioStorage: UsuarioLocalStorage,
    private _router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._usuarioStorage.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      // Bloqueado por el guard
      console.log('pasito a pasito');
      this._router.navigate(['/error-401']);
      return false;
    }
  }
}

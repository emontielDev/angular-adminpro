import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioLocalStorage } from '../usuario/usuario.storage';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    private _usuarioLocalStorage: UsuarioLocalStorage,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {

  }

  canActivate(): Promise<boolean> | boolean {
    let token = this._usuarioLocalStorage.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    if (this.expirado(payload.exp)) {
      return false;
    }

    return this.verificarRenovacion(payload.exp);
  }

  verificarRenovacion(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date( fechaExp * 1000 );
      let now = new Date();

      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) { // Verificamos que no este proximo a expirar
        resolve(true);
      } else {
        this._usuarioService.renovarToken()
        .subscribe( () => {
          console.log('token renovado');
          resolve(true);
        }, (e) => {
          this._router.navigate(['/login']);
          reject(false);
        });
      }
    });
  }

  expirado(fechaExp: number) {
    let now = new Date().getTime() / 1000; // Transformamos de milisegundos a segundos

    return (fechaExp < now);
  }
}

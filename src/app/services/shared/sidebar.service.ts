import { Injectable } from '@angular/core';
import { UsuarioLocalStorage } from '../usuario/usuario.storage';

@Injectable()
export class SidebarService {
  menu: any = [];
  constructor(
    private _usuarioStorage: UsuarioLocalStorage
  ) {
  }

  cargarMenu() {
    this.menu = this._usuarioStorage.menu;
  }
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Progress Bar', url: '/progress' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'Rxjs', url: '/rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: '/usuarios'},
  //       {titulo: 'Medicos', url: '/medicos'},
  //       {titulo: 'Hospitales', url: '/hospitales'},
  //     ]
  //   }
  // ];

}

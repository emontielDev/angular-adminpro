import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ]
    }
  ];

  constructor() { }

}

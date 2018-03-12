import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

// Servicios
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  // Acceso directo a todo el DOM
  constructor(@Inject(DOCUMENT) private _document, public _ajustes: SettingsService, ) {
  }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( theme: string, myElement: any ) {
    let url = `assets/css/colors/${theme}.css`;

    this._ajustes.ajustes.tema = theme;
    this._ajustes.ajustes.temaUrl = url;

    this._document.getElementById('theme').setAttribute('href', url);
    this._ajustes.guardarAjustes();

    this.aplicarCheck(myElement);
  }

  aplicarCheck( link: any ) {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores) {
      if ( ref.getAttribute('data-theme') === this._ajustes.ajustes.tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}

import { Component, Renderer2 } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor( public _ajustes: SettingsService, private renderer: Renderer2 ) {
    this.renderer.setAttribute(document.getElementById('theme'), 'href', this._ajustes.ajustes.temaUrl);
  }
}

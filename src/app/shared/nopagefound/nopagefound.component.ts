import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare function initPlugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor(
    private _location: Location
  ) { }

  ngOnInit() {
    initPlugins();
  }

  back() {
    this._location.back();
  }

}

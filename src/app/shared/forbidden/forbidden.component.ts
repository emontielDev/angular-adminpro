import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare function initPlugins();

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styles: []
})
export class ForbiddenComponent implements OnInit {

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

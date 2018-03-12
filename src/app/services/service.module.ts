// Archivo que funje como repositorio donde se ubican todos los modulos, se agregan como providers.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
         SidebarService,
         SharedService
        } from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService
  ],
  declarations: []
})
export class ServiceModule { }

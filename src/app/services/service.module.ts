// Archivo que funje como repositorio donde se ubican todos los modulos, se agregan como providers.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         UsuarioLocalStorage
        } from './service.index';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    UsuarioLocalStorage
  ],
  declarations: []
})
export class ServiceModule { }

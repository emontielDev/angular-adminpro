// Archivo que funje como repositorio donde se ubican todos los modulos, se agregan como providers.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         UsuarioLocalStorage,
         SubirArchivoService
        } from './service.index';
import { HttpClient } from '@angular/common/http';
import { MyHttpInterceptor } from './usuario/usuario.interceptor';

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
    UsuarioLocalStorage,
    SubirArchivoService,
    {
      multi: true,
      useClass: MyHttpInterceptor,
      provide: HTTP_INTERCEPTORS
    }
  ],
  declarations: []
})
export class ServiceModule { }

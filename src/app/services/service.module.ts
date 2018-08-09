// Archivo que funje como repositorio donde se ubican todos los modulos, se agregan como providers.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';
import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         UsuarioLocalStorage,
         SubirArchivoService,
         HospitalService,
         MedicoService,
         BusquedaService
        } from './service.index';
import { HttpClient } from '@angular/common/http';
import { MyHttpInterceptor } from './usuario/usuario.interceptor';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

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
    AdminGuard,
    UsuarioLocalStorage,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    BusquedaService,
    {
      multi: true,
      useClass: MyHttpInterceptor,
      provide: HTTP_INTERCEPTORS
    }
  ],
  declarations: []
})
export class ServiceModule { }

import { Routes, RouterModule } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';


const pagesRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: { title: 'Panel de inicio'} },
    {path: 'graficas1', component: Graficas1Component, data: { title: 'Gráficas'} },
    {path: 'progress', component: ProgressComponent, data: { title: 'Barra de progreso'} },
    {path: 'promesas', component: PromesasComponent, data: { title: 'Manejo de promesas'} },
    {path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'} },
    {path: 'perfil', component: ProfileComponent, data: {title: 'Perfil de usuario'}},
    {path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de cuenta'} },
    {path: 'busqueda/:q', component: BusquedaComponent, data: { title: 'Buscador'} },
    // Mantenimientos
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: {title: 'Mantenimiento de usuarios'}},
    {path: 'hospitales', component: HospitalesComponent, data: {title: 'Mantenimiento de hospitales'}},
    {path: 'medicos', component: MedicosComponent, data: {title: 'Mantenimiento de medicos'}},
    {path: 'medico/:id', component: MedicoComponent, data: {title: 'Detalle del medico'}},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

import { Routes, RouterModule } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: { title: 'Panel de inicio'} },
            {path: 'graficas1', component: Graficas1Component, data: { title: 'Gráficas'} },
            {path: 'progress', component: ProgressComponent, data: { title: 'Barra de progreso'} },
            {path: 'promesas', component: PromesasComponent, data: { title: 'Manejo de promesas'} },
            {path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'} },
            {path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de cuenta'} },
            {path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

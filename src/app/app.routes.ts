import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'error-401', component: ForbiddenComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    {path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true});

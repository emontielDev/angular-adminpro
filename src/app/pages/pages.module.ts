import { NgModule } from '@angular/core';

// Modulos Personalizados
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';



@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        PagesComponent,
        ProgressComponent
    ],
    // Exportamos para que otros modulos puedan acceder a ellas
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }

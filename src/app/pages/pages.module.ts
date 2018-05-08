import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos Personalizados
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Pipes
import { DataKeysPipe } from './graficas1/graficas1.pipe';

// Temporal
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

// Externos
import { ChartsModule } from 'ng2-charts';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        GraficoDonaComponent,
        IncrementadorComponent,
        PagesComponent,
        ProgressComponent,
        DataKeysPipe,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    // Exportamos para que otros modulos puedan acceder a ellas
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }

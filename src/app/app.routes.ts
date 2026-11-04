import { Routes } from '@angular/router';
import { Plantilla } from './plantilla/plantilla';
import { Convocatoria } from './convocatoria/convocatoria';   
import { AnadirJugador } from './anadir-jugador/anadir-jugador';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'plantilla' },
    { path: 'plantilla', component: Plantilla },
    { path: 'convocatoria', component: Convocatoria },
    { path: 'anadir-jugador', component: AnadirJugador },
    { path: 'plantilla/:codigo', component: Plantilla },
    // TEMPORAL: hasta que crees el componente 404
    { path: '**', redirectTo: 'plantilla' },
];

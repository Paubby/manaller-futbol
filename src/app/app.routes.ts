import { Routes } from '@angular/router';
import { Plantilla } from './plantilla/plantilla';
import { Convocatoria } from './convocatoria/convocatoria';   
import { AnadirJugador } from './anadir-jugador/anadir-jugador';
import { Inicio } from './inicio/inicio';
import { Partidos } from './partidos/partidos';
import { Error404 } from './error404/error404';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: 'inicio', component: Inicio },
    { path: 'plantilla', component: Plantilla },
    { path: 'convocatoria', component: Convocatoria },
    { path: 'anadir-jugador', component: AnadirJugador },
    { path: 'partidos', component: Partidos},
    { path: 'plantilla/:codigo', component: Plantilla },
    { path: '**', component: Error404 },
];

import { Component, inject } from '@angular/core';
import { EquipoService } from '../equipo-service';

@Component({
  imports: [],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  protected readonly equipo = inject(EquipoService);

  readonly totalJugadores = this.equipo.totalJugadores;
  readonly proximoPartido = this.equipo.proximoPartido;
}

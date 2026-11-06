import { Component, inject } from '@angular/core';
import { EquipoService } from '../equipo-service';

@Component({
  imports: [],
  selector: 'app-partidos',
  styleUrl: './partidos.css',
  templateUrl: './partidos.html',
})
export class Partidos {

  protected readonly equipo = inject(EquipoService);
}

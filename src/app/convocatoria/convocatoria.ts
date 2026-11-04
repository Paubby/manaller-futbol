import { Component, inject } from '@angular/core';
import { EquipoService } from '../equipo-service';

@Component({
  imports: [],
  selector: 'app-convocatoria',
  styleUrl: './convocatoria.css',
  templateUrl: './convocatoria.html',
})
export class Convocatoria {
  protected readonly equipo = inject(EquipoService);

  protected retirar(codigo: string): void {
    this.equipo.retirar(codigo);
  }
}

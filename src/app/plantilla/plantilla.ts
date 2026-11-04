import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { EquipoService } from '../equipo-service';

@Component({
  imports: [RouterLink],
  selector: 'app-plantilla',
  styleUrl: './plantilla.css',
  templateUrl: './plantilla.html',
})
export class Plantilla {
  protected readonly equipo = inject(EquipoService);

  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  /** null = estás en la lista · 'JUG-0008' = estás viendo UN jugador */
  protected readonly codigo = computed(() => this.params().get('codigo'));

  protected readonly jugadorSeleccionado = computed(() => {
    const codigo = this.codigo();
    if (codigo === null) return undefined;
    return this.equipo.jugadores().find((j) => j.codigo === codigo);
  });

  protected convocar(codigo: string): void{
    this.equipo.convocar(codigo);
  }

  
}
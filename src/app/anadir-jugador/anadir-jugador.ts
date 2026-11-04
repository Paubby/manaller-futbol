import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipoService, Estado, Jugador, Posicion } from '../equipo-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-anadir-jugador',
  styleUrl: './anadir-jugador.css',
  templateUrl: './anadir-jugador.html',
})
export class AnadirJugador {
  private readonly equipo = inject(EquipoService);

  protected readonly aviso = signal<string | null>(null);
  protected readonly exito = signal<string | null>(null);

  // Cada campo es un FormControl con sus reglas (Validators)
  protected readonly jugadorForm = new FormGroup({
    codigo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^JUG-[0-9]{4}$')],
    }),
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    dorsal: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(1), Validators.max(99)],
    }),
    edad: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(16), Validators.max(45)],
    }),
    posicion: new FormControl<Posicion>('Portero', { nonNullable: true }),
    estado: new FormControl<Estado>('Disponible', { nonNullable: true }),
  });

  protected guardar(): void {
    this.aviso.set(null);
    this.exito.set(null);

    // Si hay errores, los mostramos y no hacemos nada
    if (this.jugadorForm.invalid) {
      this.jugadorForm.markAllAsTouched();
      return;
    }

    // getRawValue() devuelve el objeto con los 6 campos, listo para el servicio
    const datos: Jugador = this.jugadorForm.getRawValue();
    const error = this.equipo.anadirJugador(datos);

    if (error) {
      this.aviso.set(error);
      return;
    }

    this.exito.set(`${datos.nombre} añadido a la plantilla`);
    this.jugadorForm.reset(); // vuelve a los valores iniciales
  }
}
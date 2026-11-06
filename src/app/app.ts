import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);

  protected readonly title = signal('manaller-futbol');
  protected readonly es404 = signal(false);

  constructor() {
    this.router.events.subscribe(() => {
      const rutaActiva = this.router.routerState.snapshot.root.firstChild; // pilla la ruta donde estas en el momento
      this.es404.set(rutaActiva?.data['es404'] === true); // manda true cuando estan en 404
    });
  }
}

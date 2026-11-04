import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirJugador } from './anadir-jugador';

describe('AnadirJugador', () => {
  let component: AnadirJugador;
  let fixture: ComponentFixture<AnadirJugador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirJugador],
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirJugador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

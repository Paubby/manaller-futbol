import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Convocatoria } from './convocatoria';

describe('Convocatoria', () => {
  let component: Convocatoria;
  let fixture: ComponentFixture<Convocatoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Convocatoria],
    }).compileComponents();

    fixture = TestBed.createComponent(Convocatoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

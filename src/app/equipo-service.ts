import { Service, signal, computed} from '@angular/core';

//  TIPOS de jugadores

export type Posicion = 'Portero' | 'Defensa' | 'Centrocampista' | 'Delantero';
export type Estado = 'Disponible' | 'Lesionado' | 'Sancionado';

export interface Jugador {
  codigo: string; // ejemplo: JUG-0008
  nombre: string;
  dorsal: number;
  edad: number;
  posicion: Posicion;
  estado: Estado;
}

// ============================================================
//  ESTADO  →  lo ÚNICO que se guarda en la app
// ============================================================

@Service()
export class EquipoService {

  /** Los 11 jugadores de ejemplo de la plantilla */
  readonly jugadores = signal<Jugador[]>([
    { codigo: 'JUG-0001', nombre: 'Pezuña de Oro',    dorsal: 1,  edad: 26, posicion: 'Portero',        estado: 'Disponible' },
    { codigo: 'JUG-0002', nombre: 'Salchichón Feroz', dorsal: 99, edad: 25, posicion: 'Portero',        estado: 'Lesionado' },
    { codigo: 'JUG-0003', nombre: 'Tocino Dinamita',  dorsal: 4,  edad: 23, posicion: 'Defensa',        estado: 'Sancionado' },
    { codigo: 'JUG-0004', nombre: 'Jamón Ibérico',    dorsal: 5,  edad: 22, posicion: 'Defensa',        estado: 'Disponible' },
    { codigo: 'JUG-0005', nombre: 'Longaniza Exprés', dorsal: 23, edad: 19, posicion: 'Defensa',        estado: 'Sancionado' },
    { codigo: 'JUG-0006', nombre: 'Morcilla Táctica', dorsal: 8,  edad: 20, posicion: 'Centrocampista', estado: 'Disponible' },
    { codigo: 'JUG-0007', nombre: 'Tunk Tunk Sahur',  dorsal: 67, edad: 20, posicion: 'Centrocampista', estado: 'Lesionado' },
    { codigo: 'JUG-0008', nombre: 'Chorizo Atómico',  dorsal: 7,  edad: 24, posicion: 'Centrocampista', estado: 'Sancionado' },
    { codigo: 'JUG-0009', nombre: 'Lomo Plateado',    dorsal: 10, edad: 21, posicion: 'Delantero',      estado: 'Disponible' },
    { codigo: 'JUG-0010', nombre: 'Panceta Veloz',    dorsal: 11, edad: 18, posicion: 'Delantero',      estado: 'Sancionado' },
    { codigo: 'JUG-0011', nombre: 'Jhon Pork',        dorsal: 9,  edad: 19, posicion: 'Delantero',      estado: 'Disponible' },
  ]);

  /** Guarda SOLO los códigos de los convocados: ['JUG-0001', 'JUG-0004', ...] */
  readonly convocatoria = signal<string[]>([]);

  anadirJugador(datos: Jugador): string | null {
    // Limpieza de espacios sobrantes
    const codigo = datos.codigo.trim();
    const nombre = datos.nombre.trim();

    // Asegurarse de que son números de verdad
    const dorsal = Number(datos.dorsal);
    const edad = Number(datos.edad);

    // Validar: si algo falla, devolvemos el motivo y salimos
    if (!/^JUG-\d{4}$/.test(codigo)) return 'El código debe ser JUG-0000';
    if (this.jugadores().some((j) => j.codigo === codigo)) return 'Ya existe un jugador con ese código';
    if (nombre.length < 3) return 'El nombre debe tener al menos 3 caracteres';
    if (!Number.isFinite(dorsal) || dorsal < 1 || dorsal > 99) return 'El dorsal debe estar entre 1 y 99';
    if (!Number.isFinite(edad) || edad < 16 || edad > 45) return 'La edad debe estar entre 16 y 45';

    // 4) Lo añado así para que Angular detecte el cambio, no como el push()
    this.jugadores.update((actual) => [
      ...actual,
      { codigo, nombre, dorsal, edad, posicion: datos.posicion, estado: datos.estado },
    ]);

    return null;
  }


  // ---- Convocatoria ----
  readonly maxConvocados = 18;

  // Pasa los códigos guardados a jugadores completos
  readonly convocados = computed(() =>
    this.jugadores().filter((j) => this.convocatoria().includes(j.codigo)),
  );

  readonly numConvocados = computed(() => this.convocados().length);

  estaConvocado(codigo: string): boolean {
    return this.convocatoria().includes(codigo);
  }

  // null = se puede convocar - texto = motivo por el que NO
  motivoParaNoConvocar(codigo: string): string | null {
    const jugador = this.jugadores().find((j) => j.codigo === codigo);

    if (!jugador){
      return 'Jugador no encontrado'
    };
    if (jugador.estado !== 'Disponible'){
      console.log(`No disponible: ${jugador.estado}`)
      return `No disponible: ${jugador.estado}`
    };
    if (this.estaConvocado(codigo)) {
      console.log('Ya está convocado')
      return 'Ya está convocado'};
    if (this.numConvocados() >= this.maxConvocados) {
      console.log('Convocatoria llena (18 máx.)')
      return 'Convocatoria llena (18 máx.)'
    };
    return null;
  }

  convocar(codigo: string): string | null {
    // si devuelve null sigue, sino devuelve el errror
    const motivo = this.motivoParaNoConvocar(codigo);
    if (motivo) {
      return motivo
    };

    this.convocatoria.update((actual) => [...actual, codigo]); // mira la lista y añade el nuevo al final (codigo) 
    console.log(`Jugador con código: ${codigo} convocado correctamente`)
    return null;
  }

  retirar(codigo: string): void {
    this.convocatoria.update((actual) => actual.filter((c) => c !== codigo)); // devuelve todos menos el de ese codigo y acutaliza
    console.log(`Jugador con código: ${codigo} eliminado correctamente  `)
  }
}
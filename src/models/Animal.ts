export type TipoAnimal = 'perro' | 'gato' | 'loro';

export interface BaseAnimalData {
  id?: string;
  nombre: string;
  edad: number;
  tipo: TipoAnimal;
  imagen?: string;
}

export interface PerroData extends BaseAnimalData {
  tipo: 'perro';
  raza: string;
}

export interface GatoData extends BaseAnimalData {
  tipo: 'gato';
  colorPelo: string;
}

export interface LoroData extends BaseAnimalData {
  tipo: 'loro';
  sabeHablar: boolean;
}

export type AnimalData = PerroData | GatoData | LoroData;

export abstract class Animal {
  id: string;
  nombre: string;
  edad: number;
  tipo: TipoAnimal;
  imagen?: string;

  constructor(datos: BaseAnimalData) {
    this.id = datos.id || crypto.randomUUID();
    this.nombre = datos.nombre;
    this.edad = datos.edad;
    this.tipo = datos.tipo;
    this.imagen = datos.imagen;
  }

  abstract obtenerAtributoEspecial(): string;
  abstract toJSON(): AnimalData;
}

export class Perro extends Animal {
  raza: string;

  constructor(datos: PerroData) {
    super(datos);
    this.raza = datos.raza;
  }

  obtenerAtributoEspecial(): string {
    return `Raza: ${this.raza}`;
  }

  toJSON(): PerroData {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad,
      tipo: this.tipo as 'perro',
      raza: this.raza,
      imagen: this.imagen,
    };
  }
}

export class Gato extends Animal {
  colorPelo: string;

  constructor(datos: GatoData) {
    super(datos);
    this.colorPelo = datos.colorPelo;
  }

  obtenerAtributoEspecial(): string {
    return `Color de pelo: ${this.colorPelo}`;
  }

  toJSON(): GatoData {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad,
      tipo: this.tipo as 'gato',
      colorPelo: this.colorPelo,
      imagen: this.imagen,
    };
  }
}

export class Loro extends Animal {
  sabeHablar: boolean;

  constructor(datos: LoroData) {
    super(datos);
    this.sabeHablar = datos.sabeHablar;
  }

  obtenerAtributoEspecial(): string {
    return this.sabeHablar ? 'Sabe hablar' : 'No sabe hablar';
  }

  toJSON(): LoroData {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad,
      tipo: this.tipo as 'loro',
      sabeHablar: this.sabeHablar,
      imagen: this.imagen,
    };
  }
}

export class AnimalFactory {
  static crearAnimal(tipo: TipoAnimal, datos: any): Animal {
    switch (tipo) {
      case 'perro':
        return new Perro({ ...datos, tipo });
      case 'gato':
        return new Gato({ ...datos, tipo });
      case 'loro':
        return new Loro({ ...datos, tipo });
      default:
        throw new Error(`Tipo de animal no soportado: ${tipo}`);
    }
  }
}

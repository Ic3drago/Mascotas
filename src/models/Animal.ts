export type TipoTaxonomico = 'Mamífero' | 'Ave' | 'Reptil' | 'Anfibio' | 'Pez' | 'Invertebrado';

export interface AnimalData {
  id?: string;
  nombre: string;
  edad: number;
  tipo: string; // Guardado en DB
  imagen?: string;
  clase?: string;
  habitat?: string;
  fauna?: string;
  descripcion?: string;
}

export class Animal {
  id: string;
  nombre: string;
  edad: number;
  tipo: string;
  imagen?: string;
  clase: string;
  habitat: string;
  fauna: string;
  descripcion: string;

  constructor(datos: AnimalData) {
    this.id = datos.id || crypto.randomUUID();
    this.nombre = datos.nombre;
    this.edad = datos.edad;
    this.tipo = datos.tipo;
    this.imagen = datos.imagen;
    this.clase = datos.clase || '';
    this.habitat = datos.habitat || '';
    this.fauna = datos.fauna || '';
    this.descripcion = datos.descripcion || '';
  }

  toJSON(): AnimalData {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad,
      tipo: this.tipo,
      imagen: this.imagen,
      clase: this.clase,
      habitat: this.habitat,
      fauna: this.fauna,
      descripcion: this.descripcion,
    };
  }
}

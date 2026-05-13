import { AnimalData } from '../models/Animal';
import { supabase } from '../lib/supabase';

// NOTA DE DESARROLLO: 
// Asegúrate de correr `npm install @supabase/supabase-js`
// para que esta conexión funcione sin errores de compilación.

export const animalService = {
  async getMascotas(): Promise<AnimalData[]> {
    const { data, error } = await supabase
      .from('mascotas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    
    // Supabase devuelve los nombres de columnas tal cual en SQL (ej. color_pelo).
    // Los mapeamos a nuestra interfaz de React (colorPelo).
    return (data || []).map(row => ({
      ...row,
      colorPelo: row.color_pelo,
      sabeHablar: row.sabe_hablar,
    }));
  },

  async getMascotaById(id: string): Promise<AnimalData | null> {
    const { data, error } = await supabase
      .from('mascotas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return {
      ...data,
      colorPelo: data.color_pelo,
      sabeHablar: data.sabe_hablar,
    };
  },

  async createMascota(animal: AnimalData): Promise<AnimalData> {
    // Mapeamos de nuestro formato CamelCase al SnakeCase de la base de datos SQL
    const insertData: any = {
      nombre: animal.nombre,
      edad: animal.edad,
      tipo: animal.tipo,
      imagen: animal.imagen,
    };

    if (animal.tipo === 'perro') insertData.raza = (animal as any).raza;
    if (animal.tipo === 'gato') insertData.color_pelo = (animal as any).colorPelo;
    if (animal.tipo === 'loro') insertData.sabe_hablar = (animal as any).sabeHablar;

    const { data, error } = await supabase
      .from('mascotas')
      .insert([insertData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return {
      ...data,
      colorPelo: data.color_pelo,
      sabeHablar: data.sabe_hablar,
    };
  },

  async updateMascota(id: string, animal: AnimalData): Promise<AnimalData> {
    const updateData: any = {
      nombre: animal.nombre,
      edad: animal.edad,
      tipo: animal.tipo,
      imagen: animal.imagen,
    };

    if (animal.tipo === 'perro') updateData.raza = (animal as any).raza;
    if (animal.tipo === 'gato') updateData.color_pelo = (animal as any).colorPelo;
    if (animal.tipo === 'loro') updateData.sabe_hablar = (animal as any).sabeHablar;

    const { data, error } = await supabase
      .from('mascotas')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return {
      ...data,
      colorPelo: data.color_pelo,
      sabeHablar: data.sabe_hablar,
    };
  },

  async deleteMascota(id: string): Promise<void> {
    const { error } = await supabase
      .from('mascotas')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};

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
    const insertData: any = {
      nombre: animal.nombre,
      edad: animal.edad,
      tipo: animal.tipo,
      imagen: animal.imagen,
      clase: animal.clase,
      habitat: animal.habitat,
      fauna: animal.fauna,
      descripcion: animal.descripcion,
    };

    const { data, error } = await supabase
      .from('mascotas')
      .insert([insertData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async updateMascota(id: string, animal: AnimalData): Promise<AnimalData> {
    const updateData: any = {
      nombre: animal.nombre,
      edad: animal.edad,
      tipo: animal.tipo,
      imagen: animal.imagen,
      clase: animal.clase,
      habitat: animal.habitat,
      fauna: animal.fauna,
      descripcion: animal.descripcion,
    };

    const { data, error } = await supabase
      .from('mascotas')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async deleteMascota(id: string): Promise<void> {
    const { error } = await supabase
      .from('mascotas')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};

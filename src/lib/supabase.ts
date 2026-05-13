import { createClient } from '@supabase/supabase-js';

// ATENCIÓN:
// En aplicaciones React (Frontend), NO se usan las credenciales directas de PostgreSQL
// (como host, dbname, username y password) por motivos de seguridad, ya que quedarían expuestas.
// Para esto, Supabase nos da una URL de proyecto y una clave pública (Anon Key).

// Estas variables deberían ir en un archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

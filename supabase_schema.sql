-- Supabase utiliza PostgreSQL, no SQLite.
-- Sin embargo, el siguiente script SQL es compatible tanto con Supabase (PostgreSQL) 
-- como con SQLite si quisieras migrar de entorno.

-- Crear la tabla principal de animales
CREATE TABLE mascotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  edad INTEGER NOT NULL CHECK (edad >= 0),
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('perro', 'gato', 'loro')),
  imagen TEXT,
  
  -- Campos de Enciclopedia
  clase VARCHAR(100),         -- ej. Mamífero, Ave, Reptil
  habitat VARCHAR(255),       -- ej. Doméstico, Selva, Desierto
  fauna VARCHAR(100),         -- ej. Silvestre, Urbana, Marina
  descripcion TEXT,           -- Información adicional
  
  
  -- Campos específicos según el tipo de animal
  -- Usamos columnas opcionales, ya que no todos los animales las usan
  raza VARCHAR(255),          -- Solo para perros
  color_pelo VARCHAR(255),    -- Solo para gatos
  sabe_hablar BOOLEAN,        -- Solo para loros
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar datos de prueba (Mock Data)
INSERT INTO mascotas (nombre, edad, tipo, imagen, raza) 
VALUES (
  'Max', 
  3, 
  'perro', 
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500', 
  'Golden Retriever'
);

INSERT INTO mascotas (nombre, edad, tipo, imagen, color_pelo) 
VALUES (
  'Luna', 
  5, 
  'gato', 
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500', 
  'Blanco con manchas'
);

INSERT INTO mascotas (nombre, edad, tipo, imagen, sabe_hablar) 
VALUES (
  'Paco', 
  2, 
  'loro', 
  'https://images.unsplash.com/photo-1552728089-57169282243e?auto=format&fit=crop&q=80&w=500', 
  TRUE
);

-- Si ya tienes la tabla creada en Supabase, ejecuta estos comandos para agregar las nuevas columnas:
-- ALTER TABLE mascotas DROP CONSTRAINT mascotas_tipo_check;
-- ALTER TABLE mascotas ADD COLUMN clase VARCHAR(100);
-- ALTER TABLE mascotas ADD COLUMN habitat VARCHAR(255);
-- ALTER TABLE mascotas ADD COLUMN fauna VARCHAR(100);
-- ALTER TABLE mascotas ADD COLUMN descripcion TEXT;


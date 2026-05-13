import { AnimalData } from '../models/Animal';

// Simulador de una Base de Datos (Mock DB) o Firebase
const mockDB: AnimalData[] = [
  { id: '1', nombre: 'Max', edad: 3, tipo: 'perro', raza: 'Golden Retriever', imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500' },
  { id: '2', nombre: 'Luna', edad: 5, tipo: 'gato', colorPelo: 'Blanco con manchas', imagen: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500' },
  { id: '3', nombre: 'Paco', edad: 2, tipo: 'loro', sabeHablar: true, imagen: 'https://images.unsplash.com/photo-1552728089-57169282243e?auto=format&fit=crop&q=80&w=500' },
];

export const animalService = {
  // Simulamos delay de red con Promesas
  async getMascotas(): Promise<AnimalData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem('mascotas_db');
        if (stored) {
          resolve(JSON.parse(stored));
        } else {
          localStorage.setItem('mascotas_db', JSON.stringify(mockDB));
          resolve(mockDB);
        }
      }, 500);
    });
  },

  async getMascotaById(id: string): Promise<AnimalData | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('mascotas_db') || '[]');
        const animal = stored.find((a: AnimalData) => a.id === id);
        resolve(animal || null);
      }, 300);
    });
  },

  async createMascota(animal: AnimalData): Promise<AnimalData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('mascotas_db') || '[]');
        const newAnimal = { ...animal, id: crypto.randomUUID() };
        stored.push(newAnimal);
        localStorage.setItem('mascotas_db', JSON.stringify(stored));
        resolve(newAnimal);
      }, 500);
    });
  },

  async updateMascota(id: string, animal: AnimalData): Promise<AnimalData> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('mascotas_db') || '[]');
        const index = stored.findIndex((a: AnimalData) => a.id === id);
        if (index !== -1) {
          stored[index] = { ...animal, id };
          localStorage.setItem('mascotas_db', JSON.stringify(stored));
          resolve(stored[index]);
        } else {
          reject(new Error('Mascota no encontrada'));
        }
      }, 500);
    });
  },

  async deleteMascota(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('mascotas_db') || '[]');
        const filtered = stored.filter((a: AnimalData) => a.id !== id);
        localStorage.setItem('mascotas_db', JSON.stringify(filtered));
        resolve();
      }, 500);
    });
  }
};

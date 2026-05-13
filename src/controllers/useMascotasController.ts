import { useState, useEffect, useCallback } from 'react';
import { Animal, AnimalFactory, AnimalData } from '../models/Animal';
import { animalService } from '../services/animalService';

export const useMascotasController = () => {
  const [mascotas, setMascotas] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Custom Toasts state para no usar alert()
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadMascotas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await animalService.getMascotas();
      // Pasar los datos por el Factory
      const instancias = data.map(item => AnimalFactory.crearAnimal(item.tipo, item));
      setMascotas(instancias);
    } catch (err: any) {
      setError(err.message || 'Error al cargar mascotas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMascotas();
  }, [loadMascotas]);

  const handleAddAnimal = async (animalData: any) => {
    try {
      setLoading(true);
      const tempInstancia = AnimalFactory.crearAnimal(animalData.tipo, animalData);
      const savedData = await animalService.createMascota(tempInstancia.toJSON());
      
      const newInstancia = AnimalFactory.crearAnimal(savedData.tipo, savedData);
      setMascotas(prev => [...prev, newInstancia]);
      showToast(`¡Se agregó a ${newInstancia.nombre} exitosamente!`);
    } catch (err: any) {
      setError(err.message || 'Error al agregar animal');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAnimal = async (id: string, animalData: any) => {
    try {
      setLoading(true);
      const tempInstancia = AnimalFactory.crearAnimal(animalData.tipo, animalData);
      const updatedData = await animalService.updateMascota(id, tempInstancia.toJSON());
      
      const updatedInstancia = AnimalFactory.crearAnimal(updatedData.tipo, updatedData);
      setMascotas(prev => prev.map(m => m.id === id ? updatedInstancia : m));
      showToast(`Los datos de ${updatedInstancia.nombre} han sido actualizados.`);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar animal');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnimal = async (id: string) => {
    try {
      setLoading(true);
      const animalToDrop = mascotas.find(m => m.id === id);
      await animalService.deleteMascota(id);
      setMascotas(prev => prev.filter(m => m.id !== id));
      if (animalToDrop) {
        showToast(`Se despidió a ${animalToDrop.nombre}. ¡Le deseamos lo mejor!`);
      } else {
        showToast('Mascota eliminada correctamente');
      }
    } catch (err: any) {
      setError(err.message || 'Error al eliminar animal');
    } finally {
      setLoading(false);
    }
  };

  return {
    mascotas,
    loading,
    error,
    toastMessage,
    handleAddAnimal,
    handleEditAnimal,
    handleDeleteAnimal,
    showToast
  };
};

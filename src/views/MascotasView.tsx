import React, { useState } from 'react';
import { useMascotasController } from '../controllers/useMascotasController';
import { AnimalCard } from './components/AnimalCard';
import { AnimalForm } from './components/AnimalForm';
import { Toast } from './components/Toast';
import { Animal } from '../models/Animal';
import { Plus } from 'lucide-react';

export const MascotasView: React.FC = () => {
  const {
    mascotas,
    loading,
    toastMessage,
    handleAddAnimal,
    handleEditAnimal,
    handleDeleteAnimal,
    showToast
  } = useMascotasController();

  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const openAddForm = () => {
    setEditingAnimal(null);
    setShowForm(true);
  };

  const openEditForm = (animal: Animal) => {
    setEditingAnimal(animal);
    setShowForm(true);
    showToast(`Modo edición activado: ${animal.nombre}`);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingAnimal(null);
  };

  const handleSubmit = async (data: any) => {
    if (editingAnimal) {
      await handleEditAnimal(editingAnimal.id, data);
    } else {
      await handleAddAnimal(data);
    }
    closeForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Panel de Control (Albergue)
            </h1>
          </div>
          
          <button 
            onClick={openAddForm}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
          >
            <Plus size={20} />
            Registrar Mascota
          </button>
        </header>

        {loading && <div className="text-center py-10 text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">Cargando datos...</div>}

        {!loading && mascotas.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-xl text-gray-500 dark:text-gray-400">No hay mascotas registradas.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotas.map(animal => (
            <AnimalCard 
              key={animal.id} 
              animal={animal} 
              onEdit={openEditForm} 
              onDelete={handleDeleteAnimal}
              showToast={showToast}
            />
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-40 animate-in fade-in duration-200">
          <AnimalForm 
            initialData={editingAnimal ? editingAnimal.toJSON() : undefined} 
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </div>
      )}

      <Toast message={toastMessage} />
    </div>
  );
};

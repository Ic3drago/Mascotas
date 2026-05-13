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
    error,
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
    <div className="min-h-screen relative text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Fondo de la misma imagen de la portada pero borroso */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=2000")',
          filter: 'blur(8px)',
          transform: 'scale(1.1)' // Para evitar bordes blancos por el blur
        }}
      />
      {/* Overlay para oscurecer el fondo y asegurar legibilidad */}
      <div className="fixed inset-0 bg-white/70 dark:bg-gray-900/80 z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-10 bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl backdrop-blur-md shadow-sm border border-white/20 dark:border-gray-700/30">
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Mascotas
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

        {error && (
          <div className="text-center py-10 px-6 bg-red-100/80 dark:bg-red-900/40 rounded-3xl border border-red-200 dark:border-red-800 backdrop-blur-md shadow-sm mb-6">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Error de conexión</h3>
            <p className="text-red-500 dark:text-red-300">{error}</p>
          </div>
        )}

        {!loading && !error && mascotas.length === 0 && (
          <div className="text-center py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-sm">
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

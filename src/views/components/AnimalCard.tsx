import React from 'react';
import { Animal } from '../../models/Animal';
import { Trash2, Edit } from 'lucide-react';

interface Props {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (id: string) => void;
  showToast: (msg: string) => void;
}

export const AnimalCard = ({ animal, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col border border-gray-100 dark:border-gray-700 overflow-hidden relative">
      {animal.imagen && (
        <div className="-mx-5 -mt-5 mb-4 h-48 overflow-hidden">
          <img 
            src={animal.imagen} 
            alt={animal.nombre} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white capitalize">{animal.nombre}</h3>
          <span className="inline-block px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold rounded-full mt-1 uppercase tracking-wide">
            {animal.tipo}
          </span>
        </div>
      </div>
      
      <div className="flex-1 text-gray-600 dark:text-gray-300 space-y-2 mb-6">
        <p><span className="font-medium">Edad:</span> {animal.edad} años</p>
        <p><span className="font-medium">Identificación por:</span> {animal.obtenerAtributoEspecial()}</p>
      </div>

      <div className="flex space-x-3 mt-auto">
        <button 
          onClick={() => onEdit(animal)}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl transition-colors font-medium text-sm"
        >
          <Edit size={16} /> Editar
        </button>
        <button 
          onClick={() => onDelete(animal.id)}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl transition-colors font-medium text-sm"
        >
          <Trash2 size={16} /> Eliminar
        </button>
      </div>
    </div>
  );
};

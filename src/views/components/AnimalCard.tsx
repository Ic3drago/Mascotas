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
    <div className="bg-black/85 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col border border-gray-700 overflow-hidden relative text-white">
      {animal.imagen && (
        <div className="-mx-5 -mt-5 mb-4 h-56 bg-black/60 overflow-hidden flex justify-center items-center">
          <img 
            src={animal.imagen} 
            alt={animal.nombre} 
            className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white capitalize">{animal.nombre}</h3>
          <span className="inline-block px-2 py-1 bg-yellow-900 text-white text-xs font-semibold rounded-full mt-1 uppercase tracking-wide">
            {animal.tipo}
          </span>
        </div>
      </div>
      
      <div className="flex-1 text-gray-200 space-y-2 mb-6">
        <p><span className="font-medium text-gray-400">Edad:</span> {animal.edad} años</p>
        {animal.clase && <p><span className="font-medium text-gray-400">Clase:</span> {animal.clase}</p>}
        {animal.habitat && <p><span className="font-medium text-gray-400">Hábitat:</span> {animal.habitat}</p>}
        {animal.fauna && <p><span className="font-medium text-gray-400">Fauna:</span> {animal.fauna}</p>}
        {animal.descripcion && (
          <div className="mt-3 pt-3 border-t border-gray-700/50 text-sm italic text-gray-300">
            "{animal.descripcion}"
          </div>
        )}
      </div>

      <div className="flex space-x-3 mt-auto">
        <button 
          onClick={() => onEdit(animal)}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium text-sm"
        >
          <Edit size={16} /> Editar
        </button>
        <button 
          onClick={() => {
            if (window.confirm(`¿Estás seguro de que quieres eliminar a ${animal.nombre}?`)) {
              onDelete(animal.id);
            }
          }}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-yellow-900 hover:bg-yellow-800 text-white rounded-xl transition-colors font-medium text-sm"
        >
          <Trash2 size={16} /> Eliminar
        </button>
      </div>
    </div>
  );
};

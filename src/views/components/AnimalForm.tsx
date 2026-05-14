import React, { useState, useEffect } from 'react';
import { AnimalData } from '../../models/Animal';
import { X } from 'lucide-react';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const AnimalForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [edad, setEdad] = useState<number | ''>(initialData?.edad || '');
  const [tipo, setTipo] = useState(initialData?.tipo || 'Mamífero');
  const [imagen, setImagen] = useState(initialData?.imagen || '');
  
  // Enciclopedia
  const [clase, setClase] = useState(initialData?.clase || '');
  const [habitat, setHabitat] = useState(initialData?.habitat || '');
  const [fauna, setFauna] = useState(initialData?.fauna || '');
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');
  
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setEdad(initialData.edad);
      setTipo(initialData.tipo);
      setImagen(initialData.imagen || '');
      setClase(initialData.clase || '');
      setHabitat(initialData.habitat || '');
      setFauna(initialData.fauna || '');
      setDescripcion(initialData.descripcion || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !edad) return;

    const baseData = { 
      nombre, 
      edad: Number(edad), 
      tipo, 
      imagen,
      clase,
      habitat,
      fauna,
      descripcion
    };

    onSubmit(baseData);
  };

  return (
    <div className="bg-black p-6 rounded-2xl shadow-xl border border-gray-700 w-full max-w-md relative max-h-[90vh] overflow-y-auto text-white">
      <button 
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X size={24} />
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {initialData ? 'Editar Registro' : 'Nuevo Registro'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            required
            placeholder="Ej: Firulais"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Edad (años)</label>
          <input 
            type="number" 
            value={edad} 
            onChange={e => setEdad(e.target.value ? Number(e.target.value) : '')}
            className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            required
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de la Imagen (opcional)</label>
          <input 
            type="url" 
            value={imagen} 
            onChange={e => setImagen(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="https://ejemplo.com/foto.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clase (ej. Mamífero, Ave)</label>
          <input 
            type="text" 
            value={clase} 
            onChange={e => setClase(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Ej: Mamífero"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hábitat</label>
          <input 
            type="text" 
            value={habitat} 
            onChange={e => setHabitat(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Ej: Doméstico, Selva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fauna</label>
          <input 
            type="text" 
            value={fauna} 
            onChange={e => setFauna(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Ej: Silvestre, Urbana"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
          <textarea 
            value={descripcion} 
            onChange={e => setDescripcion(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            rows={3}
            placeholder="Información adicional del animal..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clasificación Taxonómica (Clase)</label>
          <select 
            value={tipo} 
            onChange={e => setTipo(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50"
          >
            <option value="Mamífero">Mamífero</option>
            <option value="Ave">Ave</option>
            <option value="Reptil">Reptil</option>
            <option value="Anfibio">Anfibio</option>
            <option value="Pez">Pez</option>
            <option value="Invertebrado">Invertebrado</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="pt-4 flex space-x-3">
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="flex-1 px-4 py-3 bg-yellow-900 hover:bg-yellow-800 text-white rounded-xl font-medium shadow-md shadow-yellow-900/30 transition-all active:scale-95"
          >
            {initialData ? 'Guardar Cambios' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  );
};

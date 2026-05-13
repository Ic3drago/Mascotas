import React, { useState, useEffect } from 'react';
import { TipoAnimal } from '../../models/Animal';
import { X } from 'lucide-react';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const AnimalForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [edad, setEdad] = useState<number | ''>(initialData?.edad || '');
  const [tipo, setTipo] = useState<TipoAnimal>(initialData?.tipo || 'perro');
  const [imagen, setImagen] = useState(initialData?.imagen || '');
  
  // Atributos especiales
  const [raza, setRaza] = useState(initialData?.raza || '');
  const [colorPelo, setColorPelo] = useState(initialData?.colorPelo || '');
  const [sabeHablar, setSabeHablar] = useState<boolean>(initialData?.sabeHablar || false);

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setEdad(initialData.edad);
      setTipo(initialData.tipo);
      setImagen(initialData.imagen || '');
      setRaza(initialData.raza || '');
      setColorPelo(initialData.colorPelo || '');
      setSabeHablar(initialData.sabeHablar || false);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !edad) return;

    const baseData = { nombre, edad: Number(edad), tipo, imagen };
    let specificData = {};

    if (tipo === 'perro') specificData = { raza };
    if (tipo === 'gato') specificData = { colorPelo };
    if (tipo === 'loro') specificData = { sabeHablar };

    onSubmit({ ...baseData, ...specificData });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
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
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="https://ejemplo.com/foto.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Animal</label>
          <select 
            value={tipo} 
            onChange={e => setTipo(e.target.value as TipoAnimal)}
            disabled={!!initialData} // No permitimos cambiar tipo al editar por simplicidad
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50"
          >
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="loro">Loro/Ave</option>
          </select>
        </div>

        {/* Atributos dinámicos */}
        {tipo === 'perro' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raza (Identificador)</label>
            <input 
              type="text" 
              value={raza} 
              onChange={e => setRaza(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
              placeholder="Ej: Golden Retriever"
            />
          </div>
        )}

        {tipo === 'gato' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color de Pelaje (Identificador)</label>
            <input 
              type="text" 
              value={colorPelo} 
              onChange={e => setColorPelo(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
              placeholder="Ej: Blanco con manchas"
            />
          </div>
        )}

        {tipo === 'loro' && (
          <div className="flex items-center space-x-3 pt-2">
            <input 
              type="checkbox" 
              id="sabeHablar"
              checked={sabeHablar} 
              onChange={e => setSabeHablar(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 dark:ring-offset-gray-800"
            />
            <label htmlFor="sabeHablar" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ¿Sabe hablar / cantar?
            </label>
          </div>
        )}

        <div className="pt-4 flex space-x-3">
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-md shadow-indigo-500/30 transition-all active:scale-95"
          >
            {initialData ? 'Guardar Cambios' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  );
};

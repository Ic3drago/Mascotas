import { ArrowRight } from 'lucide-react';

interface Props {
  onEnter: () => void;
}

export const LandingPage = ({ onEnter }: Props) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image / GIF */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          // Utilizamos un GIF o imagen de cachorros/gatos interactuando como fondo
          backgroundImage: 'url("https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=2000")', 
        }}
      />
      {/* Overlay oscuro para que el texto resalte */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
          Mascotas
        </h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto drop-shadow-md">
          Conectando corazones peludos con familias amorosas. Encuentra y gestiona a nuestros pequeños amigos.
        </p>
        
        <button 
          onClick={onEnter}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          <span className="text-lg">Ver Más</span>
          <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

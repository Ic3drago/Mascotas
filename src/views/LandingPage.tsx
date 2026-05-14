import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  onEnter: () => void;
}

export const LandingPage = ({ onEnter }: Props) => {
  const images: string[] = [
    'https://wallpaper.forfun.com/fetch/a1/a1f71926457f341c9d282c1505582d1d.jpeg',
    'https://static.vecteezy.com/system/resources/previews/048/616/727/non_2x/joyful-dog-basking-in-sunshine-on-grassy-hill-eyes-closed-and-smiling-nature-background-free-photo.jpg', 
    'https://static.vecteezy.com/system/resources/thumbnails/048/906/006/small_2x/rabbit-peeking-from-burrow-photo.jpg',
    'https://img.freepik.com/foto-gratis/vista-realista-buho-dia_23-2151357376.jpg',
    'https://static.nationalgeographicla.com/files/styles/image_3200/public/naturepl01729407.webp?w=760&h=507',  
    'https://static.vecteezy.com/system/resources/thumbnails/059/583/440/small/snake-showing-tongue-basking-in-golden-sunlight-at-sunset-photo.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/069/690/821/small/vibrant-coral-reef-with-schools-of-tropical-fish-and-sunlight-free-photo.jpeg'  
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000); // Cambia cada 5s

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background carousel */}
      {images.map((src, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url("${src}")` }}
        />
      ))}

      {/* Overlay oscuro para que el texto resalte */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="font-['Bebas_Neue'] text-7xl md:text-9xl font-extrabold mb-6 letter-wave">
          {"Animales".split("").map((letra, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{letra}</span>
          ))}
        </h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto drop-shadow-md">
          Registra animales en esta plataforma.
        </p>

        <button
          onClick={onEnter}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 font-bold text-white transition-all duration-300 bg-yellow-900 rounded-none hover:bg-zinc-900 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] focus:outline-none"
        >
          <span className="text-lg tracking-widest uppercase">Ver Más</span>
          <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
        </button>
      </div>
    </div>
  );
};

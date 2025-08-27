import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight} from "react-icons/fa";


export default function GalleryCarousel({ images, auto = true, interval = 3500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI(prev => (prev + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, auto, interval]);

  const go = (dir) => {
    setI(prev => (prev + dir + images.length) % images.length);
  };

  return (
    <div className="relative overflow-hidden rounded-b-lg bg-white">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="group relative min-w-full">
            <img
              src={img.src}
              alt={img.caption}
              className="h-64 w-full object-cover transition duration-500 group-hover:blur-sm"
            />
            {/* Overlay on hover */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center 
                            opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="absolute inset-0 bg-black/40" />
              <p className="relative z-10 px-4 py-2 text-center text-white text-sm md:text-base font-medium">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white 
                  px-2 py-1 text-sm shadow transition"
      >
        <FaAngleLeft/>
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white 
                   px-2 py-1 text-sm shadow transition"
      >
        <FaAngleRight/>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 w-2 rounded-full transition ${
              i === idx ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

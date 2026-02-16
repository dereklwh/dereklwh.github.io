import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight} from "react-icons/fa";


export default function GalleryCarousel({ images, auto = true, interval = 3500 }) {
  const [i, setI] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    if (!auto || isPaused || images.length <= 1) return;
    const t = setInterval(() => setI(prev => (prev + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, auto, interval, isPaused]);

  const go = (dir) => {
    setI(prev => (prev + dir + images.length) % images.length);
  };

  const minSwipeDistance = 40;
  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEndX(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) go(1);
    if (distance < -minSwipeDistance) go(-1);
  };

  if (!images?.length) return null;

  return (
    <div
      className="relative overflow-hidden rounded-b-lg bg-white dark:bg-[#1c2f2b] focus-within:ring-2 focus-within:ring-[#92ACA0]/70"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Photo carousel"
    >
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
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              <div className="h-28 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-sm md:text-base font-medium">
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

      <p className="absolute top-2 right-2 rounded-full bg-black/45 px-2 py-1 text-xs text-white">
        {i + 1}/{images.length}
      </p>

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

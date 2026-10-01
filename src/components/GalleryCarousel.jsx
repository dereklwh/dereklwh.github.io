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
      className="relative overflow-hidden bg-mist dark:bg-forest focus-within:ring-2 focus-within:ring-sage/70"
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
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="group relative min-w-full">
            <img
              src={img.src}
              alt={img.caption}
              className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              <div className="h-28 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-7 left-4 right-4 text-sm font-medium text-white md:text-base">
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
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-sm text-ink shadow backdrop-blur transition hover:bg-white"
      >
        <FaAngleLeft/>
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-sm text-ink shadow backdrop-blur transition hover:bg-white"
      >
        <FaAngleRight/>
      </button>

      <p className="absolute right-3 top-3 rounded-full bg-black/45 px-2 py-1 font-mono text-[11px] text-white">
        {i + 1}/{images.length}
      </p>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

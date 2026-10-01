import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaAngleLeft, FaAngleRight, FaTimes } from 'react-icons/fa';
import useTitle from '../hooks/useTitle.js';

// 013.jpeg is kept in the folder but not shown
const thumbs = import.meta.glob(['../assets/gallery/*', '!../assets/gallery/013.jpeg'], { eager: true, import: 'default', query: { w: 900, format: 'webp', quality: 75 } });
const fulls = import.meta.glob(['../assets/gallery/*', '!../assets/gallery/013.jpeg'], { eager: true, import: 'default', query: { w: 2000, format: 'webp', quality: 75 } });

// future: have different themes in gallery page: film, nature, hobby, etc..
const photos = [
  { file: '002.jpg', alt: 'Rows of paper lanterns hanging from a temple roof' },
  { file: '010.jpeg', alt: 'Mechanical keyboard with yellow and white keycaps on a patterned desk mat' },
  { file: '0002_25A.jpg', alt: 'Stone temple silhouetted against a pale sky' },
  { file: '0015_12A.jpg', alt: 'Ridged volcanic slope under a hazy sky' },
  { file: '001.jpg', alt: 'Traditional house with a manicured garden beside a quiet road' },
  { file: '011.jpeg', alt: 'Orange cat napping in the shade beside a blue planter' },
  { file: '0013_14A.jpg', alt: 'Green vintage 4x4 parked in the fog' },
  { file: '012.jpeg', alt: 'Mechanical keyboard with sage keycaps on a desk' },
  { file: '0018_9A.jpg', alt: 'Worker carrying baskets on a shoulder pole up a rocky trail' },
  { file: '015.jpeg', alt: 'Two keyboards hanging on a pegboard, one of them a split ergonomic board' },
  { file: '0021_6A.jpg', alt: 'Monkey sitting on a moss-covered statue in the forest' },
  { file: 'mygoat.jpeg', alt: 'My grey cat curled up on the bed, looking unimpressed' },
  { file: '014.jpeg', alt: 'City skyline across the water under a wide blue sky' },
].map((photo) => {
  const key = `../assets/gallery/${photo.file}`;
  return { ...photo, thumb: thumbs[key], full: fulls[key] };
});

const SWIPE_THRESHOLD = 60;

function Lightbox({ index, onClose, onStep }) {
  const closeRef = useRef(null);
  const photo = photos[index];

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={photo.file}
          layoutId={`photo-${photo.file}`}
          src={photo.full}
          alt={photo.alt}
          className="max-h-[85vh] max-w-[92vw] cursor-grab select-none rounded-lg object-contain shadow-2xl active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) onStep(1);
            if (info.offset.x > SWIPE_THRESHOLD) onStep(-1);
          }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        />
      </AnimatePresence>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
      >
        <FaTimes />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onStep(-1); }}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:block"
      >
        <FaAngleLeft />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onStep(1); }}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:block"
      >
        <FaAngleRight />
      </button>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-center text-white">
        <p className="max-w-[80vw] text-sm text-white/80">{photo.alt}</p>
        <p className="font-mono text-xs text-white/60">
          {index + 1} / {photos.length}
        </p>
      </div>
    </motion.div>
  );
}

const GalleryPage = () => {
  useTitle('Gallery');
  const [openIndex, setOpenIndex] = useState(null);
  const triggerRefs = useRef([]);
  const openIndexRef = useRef(null);
  openIndexRef.current = openIndex;

  const close = useCallback(() => {
    // return focus to the photo the viewer ended on
    triggerRefs.current[openIndexRef.current]?.focus({ preventScroll: true });
    setOpenIndex(null);
  }, []);

  const step = useCallback((dir) => {
    setOpenIndex((current) => (current == null ? current : (current + dir + photos.length) % photos.length));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-3">Photos</p>
        <h1 className="font-display text-6xl leading-none md:text-7xl">Gallery</h1>
        <p className="mt-4 text-lg text-ink/70 dark:text-fog/70">photos I like and photos of stuff I like</p>
      </header>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.file}
            ref={(node) => (triggerRefs.current[index] = node)}
            type="button"
            onClick={() => setOpenIndex(index)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl bg-mist dark:bg-forest-raised"
            aria-label={`View photo: ${photo.alt}`}
          >
            <motion.img
              layoutId={openIndex === index ? undefined : `photo-${photo.file}`}
              src={photo.thumb}
              alt={photo.alt}
              loading="lazy"
              className="w-full transition duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex != null && <Lightbox index={openIndex} onClose={close} onStep={step} />}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;

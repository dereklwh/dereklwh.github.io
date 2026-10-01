import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import heroImage from '../assets/derek-notion-face.png?w=800&format=webp';
import useCurrentlyReading from '../hooks/useCurrentlyReading.js';

const headline = 'I build data-driven products for social impact.';

const proofChips = [
  '20k+ fan recaps generated',
  'AI + full-stack builder',
  'Data storytelling for social impact',
  'Doomscrolls books',
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const book = useCurrentlyReading();

  // Soft spotlight that trails the cursor (pointer devices only, via onPointerMove)
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const x = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(28rem circle at ${x}px ${y}px, color-mix(in oklab, var(--color-sage) 18%, transparent), transparent 70%)`;

  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden"
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr]">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }}>
          <motion.p variants={fadeUp} className="eyebrow mb-5">
            Hello, I&apos;m Derek Huang
          </motion.p>

          <h1 className="mb-6 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            {headline.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: '0.4em', filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {word === 'impact.' ? <em className="text-sage">{word}</em> : word}
                {' '}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={fadeUp} className="mb-3 max-w-xl text-lg text-ink/80 dark:text-fog/80">
            Studied business + computer science at{' '}
            <a
              href="https://www.sfu.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-sage/50 underline-offset-4 transition-colors hover:text-[#A6192E] dark:text-fog"
            >
              Simon Fraser University
            </a>
            . Now a software developer at Cortico Health.
          </motion.p>
          <motion.p variants={fadeUp} className="mb-8 max-w-xl text-ink/60 dark:text-fog/60">
            Building full-stack apps with data at the core. Turning ideas into useful, human-centered products.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-3">
            <Link to="/#projects" className="btn-primary">
              View Projects
            </Link>
            <Link to="/blog" className="btn-ghost">
              Read Blog
            </Link>
          </motion.div>

          <motion.ul variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {proofChips.map((chip) => (
              <li key={chip} className="chip">
                {chip}
              </li>
            ))}
          </motion.ul>

          <motion.dl variants={fadeUp} className="grid min-h-12 content-start gap-1.5 font-mono text-xs">
            <div className="flex items-center gap-3">
              <dt className="w-14 shrink-0 uppercase tracking-widest text-sage">Now</dt>
              <dd className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
                </span>
                Building at Cortico Health
              </dd>
            </div>
            {book && (
              <div className="flex items-center gap-3 animate-fade-in">
                <dt className="w-14 shrink-0 uppercase tracking-widest text-sage">Reading</dt>
                <dd>
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {book.title}
                  </a>{' '}
                  by {book.author}
                </dd>
              </div>
            )}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-first flex justify-center md:order-last"
        >
          <div className="absolute inset-[10%] rounded-full bg-gradient-to-tr from-sage/50 via-mist to-sage/30 blur-3xl animate-spin-slow dark:via-forest-line" />
          <div className="relative aspect-square w-56 rounded-full border border-ink/10 bg-white/60 p-6 shadow-xl backdrop-blur md:w-full md:max-w-sm dark:border-fog/10 dark:bg-fog/90">
            <img src={heroImage} alt="Illustrated portrait of Derek Huang" className="h-full w-full object-contain" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';

export default function SectionHeading({ index, eyebrow, title, children }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      <p className="eyebrow mb-3">
        {index} / {eyebrow}
      </p>
      <h2 className="font-display text-5xl leading-none md:text-6xl">{title}</h2>
      {children && <p className="mt-4 max-w-xl text-ink/70 dark:text-fog/70">{children}</p>}
    </motion.header>
  );
}

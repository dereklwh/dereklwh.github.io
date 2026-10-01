import { motion } from 'framer-motion';

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ExperienceItem({ experience }) {
  return (
    <motion.li
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative grid grid-cols-1 gap-4 pb-12 pl-10 md:grid-cols-[14rem_1fr] md:gap-10 md:pl-0"
    >
      {/* timeline dot */}
      <span
        aria-hidden="true"
        className={`absolute left-[7px] top-2 h-3 w-3 rounded-full border-2 border-sage md:left-[calc(14rem+1.25rem-5px)] ${
          experience.current ? 'bg-sage' : 'bg-paper dark:bg-forest'
        }`}
      />

      <div className="flex items-start gap-3 md:flex-col md:items-end md:text-right">
        <img
          src={experience.logo}
          alt={`${experience.company} logo`}
          className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white object-cover shadow-sm ring-1 ring-ink/10 md:h-14 md:w-14 dark:ring-fog/10"
        />
        <div>
          <p className="font-medium">{experience.company}</p>
          <p className="font-mono text-xs text-sage-deep dark:text-sage">{experience.location}</p>
        </div>
      </div>

      <div className="md:pl-10">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-2xl">{experience.title}</h3>
          {experience.current && (
            <span className="rounded-full bg-sage/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-sage-deep dark:text-sage">
              Current
            </span>
          )}
        </div>
        <div className="mb-3 space-y-1 font-mono text-xs">
          <p className="text-ink/60 dark:text-fog/60">{experience.time}</p>
          {experience.previous && (
            <p className="text-ink/50 dark:text-fog/50">
              Previously {experience.previous.title}, {experience.previous.time}
            </p>
          )}
        </div>
        <ul className="space-y-1.5 text-sm leading-relaxed text-ink/85 dark:text-fog/85">
          {experience.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-sage" />
              {bullet}
            </li>
          ))}
        </ul>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {experience.stack.map((tech) => (
            <li key={tech} className="rounded-md border border-ink/10 px-2 py-0.5 font-mono text-[11px] text-ink/70 dark:border-fog/10 dark:text-fog/70">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export default function ExperienceCard({ experiences }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        aria-hidden="true"
        className="absolute bottom-12 left-[12px] top-3 border-l border-dashed border-sage/60 md:left-[calc(14rem+1.25rem)]"
      />
      <ol>
        {experiences.map((experience) => (
          <ExperienceItem key={experience.company} experience={experience} />
        ))}
      </ol>
    </div>
  );
}

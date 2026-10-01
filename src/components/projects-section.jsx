import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import FilterBar from './FilterBar';
import projects from '../data/projects.js';
import { countTags } from '../lib/tags.js';

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);
const archiveTags = countTags(archive);

const ease = [0.22, 1, 0.36, 1];

const RepoLink = ({ url }) =>
  url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-sage-deep dark:text-fog dark:hover:text-sage"
    >
      <FaGithub /> View project <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <span className="font-mono text-xs text-ink/50 dark:text-fog/50">Private repo</span>
  );

const StatusBadge = ({ status }) =>
  status ? (
    <span className="rounded-full border border-sage/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-sage-deep dark:text-sage">
      {status}
    </span>
  ) : null;

const Stack = ({ stack }) => (
  <ul className="flex flex-wrap gap-1.5">
    {stack.map((tech) => (
      <li key={tech} className="rounded-md border border-ink/10 px-2 py-0.5 font-mono text-[11px] text-ink/70 dark:border-fog/10 dark:text-fog/70">
        {tech}
      </li>
    ))}
  </ul>
);

function FeaturedCard({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease }}
      className="card group grid overflow-hidden md:grid-cols-2"
    >
      <div className={`relative overflow-hidden bg-mist dark:bg-forest ${flip ? 'md:order-last' : ''}`}>
        <img
          src={project.src}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:h-full md:min-h-80"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center gap-3 font-mono text-xs text-sage-deep dark:text-sage">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-sage/50" />
          <span>{project.year}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="font-display text-4xl leading-none md:text-5xl">{project.name}</h3>
        <p className="font-mono text-sm text-sage-deep dark:text-sage">{project.impact}</p>
        <p className="leading-relaxed text-ink/80 dark:text-fog/80">{project.desc}</p>
        <Stack stack={project.stack} />
        <div className="mt-auto pt-2">
          <RepoLink url={project.url} />
        </div>
      </div>
    </motion.article>
  );
}

// `ref` is forwarded so AnimatePresence popLayout can measure cards as they exit
function ProjectCard({ project, onTagClick, ref }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease }}
      className="card group flex flex-col overflow-hidden"
    >
      <div className="overflow-hidden bg-mist dark:bg-forest">
        <img
          src={project.src}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight">{project.name}</h3>
          <span className="font-mono text-xs text-sage-deep dark:text-sage">{project.year}</span>
        </div>
        <div>
          <p className={`text-sm leading-relaxed text-ink/80 dark:text-fog/80 ${expanded ? '' : 'line-clamp-3'}`}>{project.desc}</p>
          {project.desc.length > 150 && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-1 cursor-pointer font-mono text-[11px] text-sage-deep hover:text-ink dark:text-sage dark:hover:text-fog"
              aria-expanded={expanded}
            >
              {expanded ? 'Less' : 'More'}
            </button>
          )}
        </div>
        <Stack stack={project.stack} />
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <RepoLink url={project.url} />
          <div className="flex gap-1">
            {project.tags.map((tag) => (
              <button key={tag} type="button" onClick={() => onTagClick(tag)} className="tag">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

const ProjectsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagParam = searchParams.get('tag');
  const activeTag = archiveTags.some((t) => t.name === tagParam) ? tagParam : null;

  const visible = useMemo(
    () => (activeTag ? archive.filter((p) => p.tags.includes(activeTag)) : archive),
    [activeTag]
  );

  const handleTagChange = (tag) => {
    const next = new URLSearchParams(searchParams);
    if (tag) next.set('tag', tag);
    else next.delete('tag');
    setSearchParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <div>
      <div className="mb-20 space-y-6">
        {featured.map((project, index) => (
          <FeaturedCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div className="mb-6 flex items-end justify-between gap-4">
        <h3 className="font-display text-3xl md:text-4xl">More projects</h3>
        <p className="font-mono text-xs text-ink/60 dark:text-fog/60">
          {visible.length} of {archive.length}
        </p>
      </div>
      <FilterBar id="projects" tags={archiveTags} total={archive.length} activeTag={activeTag} onTagChange={handleTagChange} />

      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} onTagClick={handleTagChange} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;

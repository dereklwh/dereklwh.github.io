import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import posts from '../lib/posts.js';
import projects from '../data/projects.js';
import { contacts, EMAIL } from '../data/contacts.js';
import { OPEN_COMMAND_MENU } from '../lib/commandMenu.js';
import useTheme from '../hooks/useTheme.js';

const pages = [
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Gallery', to: '/gallery' },
];

const itemClass =
  'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm data-[selected=true]:bg-sage/20';
const groupClass =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-sage';

const Hint = ({ children }) => (
  <span className="shrink-0 font-mono text-[11px] text-ink/50 dark:text-fog/50">{children}</span>
);

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  const run = (action) => () => {
    setOpen(false);
    action();
  };

  const openExternal = (href) => window.open(href, '_blank', 'noopener,noreferrer');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast('Email copied');
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command menu"
        overlayClassName="fixed inset-0 z-[70] bg-forest/40 backdrop-blur-sm animate-fade-in"
        contentClassName="fixed left-1/2 top-[15vh] z-[71] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-ink/10 bg-paper text-ink shadow-2xl animate-fade-in dark:border-fog/10 dark:bg-forest-raised dark:text-fog"
      >
        <Command.Input
          placeholder="Search pages, posts, projects..."
          className="w-full border-b border-ink/10 bg-transparent px-4 py-4 text-base outline-none placeholder:text-ink/40 dark:border-fog/10 dark:placeholder:text-fog/40"
        />
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-ink/60 dark:text-fog/60">
            Nothing found.
          </Command.Empty>

          <Command.Group heading="Go to" className={groupClass}>
            {pages.map((page) => (
              <Command.Item key={page.to} className={itemClass} onSelect={run(() => navigate(page.to))}>
                {page.label}
                <Hint>{page.to}</Hint>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Posts" className={groupClass}>
            {posts.map((post) => (
              <Command.Item
                key={post.slug}
                value={`post ${post.title} ${post.tags.join(' ')}`}
                className={itemClass}
                onSelect={run(() => navigate(`/blog/${post.slug}`))}
              >
                <span className="truncate">{post.title}</span>
                <Hint>{post.displayDate}</Hint>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects" className={groupClass}>
            {projects.map((project) => (
              <Command.Item
                key={project.slug}
                value={`project ${project.name} ${project.tags.join(' ')} ${project.stack.join(' ')}`}
                className={itemClass}
                onSelect={run(() =>
                  project.url ? openExternal(project.url) : navigate('/#projects')
                )}
              >
                <span className="truncate">{project.name}</span>
                <Hint>{project.url ? 'repo ↗' : project.year}</Hint>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className={groupClass}>
            <Command.Item className={itemClass} onSelect={run(toggleTheme)}>
              {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            </Command.Item>
            <Command.Item className={itemClass} onSelect={run(copyEmail)}>
              Copy email
              <Hint>{EMAIL}</Hint>
            </Command.Item>
            {contacts
              .filter((contact) => !contact.href.startsWith('mailto:'))
              .map((contact) => (
                <Command.Item
                  key={contact.name}
                  className={itemClass}
                  onSelect={run(() => openExternal(contact.href))}
                >
                  {contact.name === 'Resume' ? 'Open resume' : contact.name}
                  <Hint>↗</Hint>
                </Command.Item>
              ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            role="status"
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-ink px-4 py-2 font-mono text-xs text-white shadow-lg dark:bg-sage dark:text-forest"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

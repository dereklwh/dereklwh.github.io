import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdNightlight, MdLightMode } from 'react-icons/md';
import useTheme from '../hooks/useTheme.js';
import { openCommandMenu } from '../lib/commandMenu.js';

const links = [
  { label: 'About', to: '/#about', section: 'about' },
  { label: 'Experience', to: '/#experience', section: 'experience' },
  { label: 'Projects', to: '/#projects', section: 'projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Gallery', to: '/gallery' },
];

function useActiveSection(enabled) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    // Home may still be waiting on the page transition, so retry until its sections exist
    let timer;
    const observeSections = (attempt = 0) => {
      const sections = links
        .filter((link) => link.section)
        .map((link) => document.getElementById(link.section))
        .filter(Boolean);
      if (sections.length) sections.forEach((section) => observer.observe(section));
      else if (attempt < 10) timer = setTimeout(() => observeSections(attempt + 1), 150);
    };
    observeSections();

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [enabled]);

  return enabled ? active : null;
}

export default function Nav() {
  const { pathname } = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(pathname === '/');

  const isActive = (link) =>
    link.section ? activeSection === link.section : pathname.startsWith(link.to);

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-ink/5 backdrop-blur-md transition-colors dark:border-fog/5 ${
        isOpen ? 'bg-paper dark:bg-forest' : 'bg-paper/70 dark:bg-forest/70'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-6">
        <Link to="/" className="group flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="font-display text-2xl leading-none">Derek Huang</span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="relative rounded-full px-3 py-1.5 text-sm text-ink/80 transition-colors hover:text-ink dark:text-fog/80 dark:hover:text-fog"
            >
              {isActive(link) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-sage/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <button
            type="button"
            onClick={openCommandMenu}
            className="hidden items-center gap-1 rounded-full border border-ink/15 px-2.5 py-1 font-mono text-xs text-ink/70 transition-colors hover:border-sage hover:text-ink sm:flex dark:border-fog/15 dark:text-fog/70 dark:hover:text-fog"
            aria-label="Open command menu"
          >
            {isMac ? '⌘' : 'Ctrl'} K
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-sage transition-colors hover:bg-sage/15 hover:text-ink dark:hover:text-fog"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <MdLightMode className="text-xl" /> : <MdNightlight className="text-xl" />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="rounded-full p-2 md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-5">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.04 * i } }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-xl px-3 py-2 font-display text-2xl ${isActive(link) ? 'bg-sage/15' : ''}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={() => { setIsOpen(false); openCommandMenu(); }}
                className="mt-2 self-start rounded-full border border-ink/15 px-3 py-1 font-mono text-xs dark:border-fog/15"
              >
                Search everything
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

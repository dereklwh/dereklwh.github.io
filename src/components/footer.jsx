import { FaWikipediaW } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { contacts } from '../data/contacts.js';
import useDailyWikiArticle from '../hooks/useDailyWikiArticle.js';

export default function Footer() {
  const article = useDailyWikiArticle();

  return (
    <footer className="mt-24 border-t border-ink/10 dark:border-fog/10">
      {article?.url && (
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-4 border-b border-ink/10 py-6 text-center md:flex-row md:justify-center md:gap-8 md:text-left dark:border-fog/10">
            <div>
              <p className="text-sm">Thanks for exploring this far! Here's a little treat.</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink/50 dark:text-fog/50">
                Today's random Wikipedia article
              </p>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              title="A random Wikipedia article, new every day"
              className="group flex max-w-full items-center gap-2 rounded-full border border-ink/10 bg-mist/60 px-3 py-1.5 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-sage hover:bg-sage hover:text-white dark:border-fog/10 dark:bg-forest-line"
            >
              <FaWikipediaW className="shrink-0" aria-hidden="true" />
              <span className="truncate">{article.title}</span>
              <FiArrowUpRight
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      )}
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl">Let's connect!</p>
          <p className="mt-1 text-sm text-ink/70 dark:text-fog/70">
            © {new Date().getFullYear()} Derek Huang. Thanks for visiting :)
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wider">
          {contacts.map((contact) => (
            <li key={contact.name}>
              <a
                href={contact.href}
                target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-ink/70 transition-colors hover:text-sage dark:text-fog/70 dark:hover:text-sage"
              >
                {contact.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

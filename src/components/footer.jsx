import { contacts } from '../data/contacts.js';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 dark:border-fog/10">
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

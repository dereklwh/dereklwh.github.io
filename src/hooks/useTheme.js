import { useCallback, useSyncExternalStore } from 'react';

// Theme lives on <html class="dark">, set before first paint in index.html.
// Components subscribe to the class so the nav toggle and command menu stay in sync.
const subscribe = (callback) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

const getSnapshot = () => document.documentElement.classList.contains('dark');

export default function useTheme() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot);

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // storage can be blocked; the toggle still works for this visit
    }
  }, []);

  return { isDark, toggleTheme };
}

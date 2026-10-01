import { useState, useEffect } from 'react';

const CACHE_KEY = 'currently-reading';
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours
const FEED_URL = 'https://www.goodreads.com/review/list_rss/182676242-derek?shelf=currently-reading';

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.savedAt < CACHE_TTL) return cached.book;
  } catch {
    // ignore bad or blocked storage
  }
  return null;
}

export default function useCurrentlyReading() {
  const [book, setBook] = useState(readCache);

  useEffect(() => {
    if (book) return;
    let cancelled = false;

    async function fetchCurrentlyReading() {
      try {
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(FEED_URL));
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'application/xml');
        const item = xml.querySelector('item');
        if (!item || cancelled) return;

        const next = {
          title: item.querySelector('title')?.textContent,
          link: item.querySelector('link')?.textContent,
          author: item.querySelector('author_name')?.textContent,
        };
        setBook(next);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ book: next, savedAt: Date.now() }));
        } catch {
          // caching is optional
        }
      } catch (error) {
        console.error('Error fetching currently reading book:', error);
      }
    }

    fetchCurrentlyReading();
    return () => {
      cancelled = true;
    };
  }, [book]);

  return book;
}

import { useState, useEffect } from 'react';

const CACHE_KEY = 'daily-wiki-article';
const RANDOM_URL = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';

// Local YYYY-MM-DD so the article rolls over at the visitor's midnight
function today() {
  return new Date().toLocaleDateString('en-CA');
}

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && cached.date === today()) return cached.article;
  } catch {
    // ignore bad or blocked storage
  }
  return null;
}

async function fetchRandomArticle() {
  // Disambiguation pages make for a boring pick, so try once more
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetch(RANDOM_URL);
    if (!response.ok) throw new Error(`Wikipedia responded with ${response.status}`);
    const data = await response.json();
    if (data.type === 'standard') {
      return {
        title: data.title,
        url: data.content_urls?.desktop?.page,
      };
    }
  }
  return null;
}

export default function useDailyWikiArticle() {
  const [article, setArticle] = useState(readCache);

  useEffect(() => {
    if (article) return;
    let cancelled = false;

    async function loadArticle() {
      try {
        const next = await fetchRandomArticle();
        if (!next || cancelled) return;

        setArticle(next);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ article: next, date: today() }));
        } catch {
          // caching is optional
        }
      } catch (error) {
        console.error('Error fetching daily Wikipedia article:', error);
      }
    }

    loadArticle();
    return () => {
      cancelled = true;
    };
  }, [article]);

  return article;
}

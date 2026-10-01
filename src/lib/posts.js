// Blog posts are bundled at build time, so listing and reading need no network fetch.
const files = import.meta.glob('../blog/*.md', { query: '?raw', import: 'default', eager: true });

const WORDS_PER_MINUTE = 220;

export function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) return { data: {}, content: text };

  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (!key.trim()) return;

    let value = rest.join(':').trim();

    // Accept both `tags: [one, two]` and `tags: one, two`
    if (key.trim() === 'tags') {
      if (value.startsWith('[') && value.endsWith(']')) value = value.slice(1, -1);
      data.tags = value.split(',').map((t) => t.trim()).filter(Boolean);
    } else {
      data[key.trim()] = value;
    }
  });

  return { data, content: text.slice(match[0].length).trim() };
}

function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getExcerpt(content, maxLength = 180) {
  const paragraph = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|!\[|```|-|\d+\.|>)/.test(block));
  if (!paragraph) return '';

  const plain = stripMarkdown(paragraph);
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, plain.lastIndexOf(' ', maxLength))}...`;
}

// Dates are calendar days, so format in UTC to avoid showing the day before in Pacific time.
export function formatDate(date) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);
    const words = stripMarkdown(content).split(' ').length;

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date || '',
      displayDate: data.date ? formatDate(data.date) : 'Undated',
      tags: data.tags || [],
      content,
      excerpt: getExcerpt(content),
      readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    };
  })
  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

export default posts;

export const getPost = (slug) => posts.find((post) => post.slug === slug);

import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';
import posts from '../lib/posts.js';
import { countTags } from '../lib/tags.js';
import useTitle from '../hooks/useTitle.js';

const POSTS_PER_PAGE = 6;
const allTags = countTags(posts);

const BlogPage = () => {
  useTitle('Blog');
  const [searchParams, setSearchParams] = useSearchParams();
  const tagParam = searchParams.get('tag');
  const activeTag = allTags.some((t) => t.name === tagParam) ? tagParam : null;

  const filteredPosts = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [activeTag]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(searchParams.get('page')) || 1), totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value == null || value === 1) next.delete(key);
      else next.set(key, value);
    });
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-3">Writing</p>
        <h1 className="font-display text-6xl leading-none md:text-7xl">Blog</h1>
        <p className="mt-4 text-lg text-ink/70 dark:text-fog/70">just some thoughts</p>
      </header>

      <FilterBar
        id="blog"
        tags={allTags}
        total={posts.length}
        activeTag={activeTag}
        onTagChange={(tag) => updateParams({ tag, page: null })}
      />

      <motion.ol
        key={`${activeTag}-${currentPage}`}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="divide-y divide-ink/10 border-y border-ink/10 dark:divide-fog/10 dark:border-fog/10"
      >
        {paginatedPosts.map((post) => (
          <motion.li
            key={post.slug}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="group relative py-7"
          >
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink/60 dark:text-fog/60">
              <time dateTime={post.date}>{post.displayDate}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>
            <h2 className="font-display text-3xl leading-tight transition-colors group-hover:text-sage-deep dark:group-hover:text-sage">
              {/* stretched link makes the whole row clickable while tags stay separate buttons */}
              <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                {post.title}
              </Link>
            </h2>
            {post.excerpt && <p className="mt-2 line-clamp-2 text-ink/70 dark:text-fog/70">{post.excerpt}</p>}
            <div className="relative mt-3 flex flex-wrap items-center gap-1.5">
              {post.tags.map((tag) => (
                <button key={tag} type="button" onClick={() => updateParams({ tag, page: null })} className="tag">
                  {tag}
                </button>
              ))}
              <span className="ml-auto font-mono text-xs text-sage-deep transition-transform group-hover:translate-x-1 dark:text-sage">
                Read →
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => updateParams({ page })}
        variant="compact"
      />
    </div>
  );
};

export default BlogPage;

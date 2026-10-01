import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, useScroll, useSpring } from 'framer-motion';
import BackButton from '../components/BackButton';
import posts, { getPost } from '../lib/posts.js';
import useTitle from '../hooks/useTitle.js';

const MarkdownLink = ({ href, children, ...props }) => {
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
      {children}
    </a>
  );
};

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-16 z-40 h-0.5 origin-left bg-sage"
      style={{ scaleX }}
    />
  );
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPost(slug);
  useTitle(post ? post.title : 'Post not found');

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <BackButton label="Back to blog" className="mb-8" onClick={() => navigate('/blog')} />
        <article className="card p-8">
          <p className="eyebrow">404</p>
          <h1 className="mt-2 font-display text-4xl">Post not found</h1>
          <p className="mt-2 text-ink/70 dark:text-fog/70">
            The post for <code>{slug}</code> does not exist.
          </p>
        </article>
      </div>
    );
  }

  const index = posts.indexOf(post);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <BackButton label="All posts" className="mb-10" onClick={() => navigate('/blog')} />

        <header className="mb-10 border-b border-ink/10 pb-8 dark:border-fog/10">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink/60 dark:text-fog/60">
            <time dateTime={post.date}>{post.displayDate}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className="font-display text-5xl leading-[1.05] md:text-6xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        </header>

        <article className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown components={{ a: MarkdownLink }}>{post.content}</ReactMarkdown>
        </article>

        <nav aria-label="More posts" className="mt-16 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2 dark:border-fog/10">
          {older ? (
            <Link to={`/blog/${older.slug}`} className="card group p-5 transition-colors hover:border-sage">
              <p className="eyebrow mb-1">← Older</p>
              <p className="font-display text-xl group-hover:text-sage-deep dark:group-hover:text-sage">{older.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link to={`/blog/${newer.slug}`} className="card group p-5 text-right transition-colors hover:border-sage">
              <p className="eyebrow mb-1">Newer →</p>
              <p className="font-display text-xl group-hover:text-sage-deep dark:group-hover:text-sage">{newer.title}</p>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default BlogPost;

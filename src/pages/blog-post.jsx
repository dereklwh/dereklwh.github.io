import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [isMissing, setIsMissing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Blog - ${slug.replace(/-/g, ' ')}`;
        setIsMissing(false);
        
        import(`../blog/${slug}.md`)
          .then((res) => fetch(res.default))
          .then((r) => r.text())
          .then((text) => {
            const cleaned = stripFrontmatter(text);
            setContent(cleaned);
            setIsMissing(false);
          })
          .catch(() => {
            document.title = '404 | Derek Huang';
            setContent('');
            setIsMissing(true);
          });
      }, [slug]);

    function stripFrontmatter(text) {
      const match = /^---\s*[\r\n]+([\s\S]*?)\r?\n---/.exec(text);
      if (!match) return text; 
      return text.slice(match[0].length).trim();
    }

    if (isMissing) {
      return (
        <div className="bg-linear-65 from-white to-[#DDE5ED] dark:from-[#1a2f2a] dark:to-[#1a2f2a] min-h-screen">
          <div className="max-w-3xl mx-auto px-6 py-12 text-[#3e5d58] dark:text-[#e8f0ee]">
            <button
              onClick={() => navigate('/blog')}
              className="text-sm mb-8 opacity-70 hover:opacity-100 transition hover:underline"
            >
              ← back to blog
            </button>
            <article className="mx-auto rounded-xl border border-[#92ACA0]/30 bg-white/80 dark:bg-[#243b35]/80 p-6">
              <h1 className="text-2xl font-bold">Post not found</h1>
              <p className="mt-2 text-[#3e5d58]/80 dark:text-[#a3c4bc]">
                The post for <code>{slug}</code> does not exist.
              </p>
            </article>
          </div>
        </div>
      )
    }

    return(
      <div className="bg-linear-65 from-white to-[#DDE5ED] dark:from-[#1a2f2a] dark:to-[#1a2f2a] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12 text-[#3e5d58] dark:text-[#e8f0ee]">
          {/* Back button */}
          <button
          onClick={() => navigate(-1)}
          className="text-sm mb-8 opacity-70 hover:opacity-100 transition hover:underline"
          >
          ← go back
          </button>
  
          {/* Blog content */}
          <article className="prose prose-invert prose-lg mx-auto animate-fadeIn">
          <ReactMarkdown>{content}</ReactMarkdown>
          </article>
          <button
          onClick={() => navigate(-1)}
          className="text-sm mt-4 opacity-70 hover:opacity-100 transition hover:underline"
          >
          ← go back
          </button>
        </div>
      </div>
    )

}

export default BlogPost

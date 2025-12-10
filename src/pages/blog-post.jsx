import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Blog - ${slug.replace(/-/g, ' ')}`;
        
        import(`../blog/${slug}.md`)
          .then((res) => fetch(res.default))
          .then((r) => r.text())
          .then((text) => {
            const cleaned = stripFrontmatter(text);
            setContent(cleaned);
          })
          .catch(() => setContent("# 404\nPost not found."));
      }, [slug]);

    function stripFrontmatter(text) {
      const match = /^---\s*[\r\n]+([\s\S]*?)\r?\n---/.exec(text);
      if (!match) return text; 
      return text.slice(match[0].length).trim();
    }

    return(
      <div className="max-w-3xl mx-auto px-6 py-12 text-[#3e5d58]">
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
      </div>
    )

}

export default BlogPost
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import BackButton from '../components/BackButton';

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
            <BackButton
              label="Back to blog"
              className="mb-8"
              onClick={() => navigate('/blog')}
            />
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
          <BackButton
            label="Back"
            className="mb-8"
            onClick={() => navigate(-1)}
          />
  
          {/* Blog content */}
          <article className="prose prose-invert prose-lg mx-auto animate-fadeIn">
          <ReactMarkdown>{content}</ReactMarkdown>
          </article>
          <BackButton
            label="Back"
            className="mt-6"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    )

}

export default BlogPost

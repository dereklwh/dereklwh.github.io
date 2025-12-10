import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        import(`../blog/${slug}.md`)
          .then((res) => fetch(res.default))
          .then((r) => r.text())
          .then((text) => {
            console.log(text)
            setContent(text);
          })
          .catch(() => setContent("# 404\nPost not found."));
      }, [slug]);

      return(
        <div className="p-10 max-w-3xl mx-auto text-[#3e5d58]">
            <button className=" hover:text-[#3e5d58] hover:underline" onClick={() => navigate(-1)}>
                go back
            </button>
            <ReactMarkdown className="prose prose-invert prose-lg mx-auto border-4 border-red-500">{content}</ReactMarkdown>
        </div>
      )

}

export default BlogPost
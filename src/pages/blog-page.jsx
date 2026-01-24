import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../components/nav";

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Discover markdown files automatically
  const postFiles = import.meta.glob("../blog/*.md");

  // Convert object into array of filenames
  useEffect(() => {
    const fetchPosts = async () => {
      const postList = await Promise.all(
        Object.keys(postFiles).map(async (path) => {
          const fileName = path.split("/").pop().replace(".md", "");
          const res = await postFiles[path]();
          const text = await fetch(res.default).then((r) => r.text());
          const { data, content } = parseFrontmatter(text);

          return {
            title: data.title || fileName.replace(/-/g, " "), // Use frontmatter title or fallback
            date: data.date || "Unknown Date", // Use frontmatter date or fallback
            slug: fileName,
            content, // Store the Markdown content
            tags: data.tags || []
          };
        })
      );

      postList.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      setPosts(postList);
    };

    fetchPosts();
  }, []);

  function parseFrontmatter(text) {
    const match = /^---\n([\s\S]*?)\n---/.exec(text);
    if (!match) return { data: {}, content: text };
  
    const yaml = match[1];
    const data = {};
  
    yaml.split("\n").forEach((line) => {
      const [key, ...rest] = line.split(":");
      if (!key) return;
  
      let value = rest.join(":").trim();
  
      // Convert array-style and comma-style tags into arrays
      if (key.trim() === "tags") {
        if (value.startsWith("[") && value.endsWith("]")) {
          // tags: [one, two, three]
          value = value.slice(1, -1);
        }
        data.tags = value.split(",").map((t) => t.trim()).filter(Boolean);
      } else {
        data[key.trim()] = value;
      }
    });
  
    const content = text.slice(match[0].length).trim();
  
    return { data, content };
  }
  

  return (
    <div className="bg-linear-65 from-white to-[#DDE5ED] dark:from-[#1a2f2a] dark:to-[#1a2f2a] min-h-screen">
      <div className="max-w-2xl mx-auto p-10 text-[#3e5d58] dark:text-[#e8f0ee]">
        <h1 className="text-4xl mt-10 font-bold mb-4">Blog</h1>
        <p className='mb-6 text-lg'>just some thoughts</p>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="p-4 border rounded-lg hover:bg-gray-50 dark:border-[#2f4f47] dark:hover:bg-[#243b35] cursor-pointer"
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500 dark:text-[#a3c4bc]">{post.date}</p>
              <p className="text-[#3e5d58] dark:text-[#92ACA0]">Read more →</p>
            </div>
          //   <div className="flex gap-2 flex-wrap mt-2">
          //   {post.tags.map((tag) => (
          //     <span
          //       key={tag}
          //       className="px-2 py-1 text-xs"
          //     >
          //       {tag}
          //     </span>
          //   ))}
          // </div>
          ))}

        </div>
        <button 
            className='mt-8 px-10 py-2 bg-white dark:bg-[#243b35] border text-blue-600 dark:border-[#92ACA0] dark:text-[#92ACA0] rounded-lg hover:text-white hover:bg-blue-600 dark:hover:bg-[#92ACA0] dark:hover:text-white border-blue-600 transition'
            onClick={() => navigate('/')}>
            Go Back
        </button>
      </div>
    </div>
  );
};
  
  export default BlogPage;
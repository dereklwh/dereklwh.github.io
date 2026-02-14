import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";

const POSTS_PER_PAGE = 4;

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState(null);

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
  

  const uniqueTags = useMemo(() => {
    const tagSet = new Set(posts.flatMap((p) => p.tags));
    return [...tagSet];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  const handleTagChange = (tag) => {
    setActiveTag(tag);
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="bg-linear-65 from-white to-[#DDE5ED] dark:from-[#1a2f2a] dark:to-[#1a2f2a] min-h-screen">
      <div className="max-w-2xl mx-auto p-10 text-[#3e5d58] dark:text-[#e8f0ee]">
        <h1 className="text-4xl mt-10 font-bold mb-4">Blog</h1>
        <p className='mb-6 text-lg'>just some thoughts</p>
        <FilterBar tags={uniqueTags} activeTag={activeTag} onTagChange={handleTagChange} />
        <div className="space-y-4">
          {paginatedPosts.map((post) => (
            <div
              key={post.slug}
              className="p-4 border rounded-lg hover:bg-gray-50 dark:border-[#2f4f47] dark:hover:bg-[#243b35] cursor-pointer transition-colors duration-200"
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500 dark:text-[#a3c4bc]">{post.date}</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => { e.stopPropagation(); handleTagChange(tag); }}
                    className="px-2.5 py-0.5 text-xs rounded-full bg-[#92ACA0]/15 text-[#92ACA0] font-medium transition-all duration-200 hover:bg-[#92ACA0]/30 hover:scale-105 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-[#3e5d58] dark:text-[#92ACA0] mt-1">Read more →</p>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          variant="compact"
        />
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
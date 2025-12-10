import { useNavigate } from "react-router-dom";

const BlogPage = () => {
    const navigate = useNavigate();

    // Discover markdown files automatically
    const posts = import.meta.glob("../blog/*.md");

      // Convert object into array of filenames
    const postList = Object.keys(posts).map((path) => {
      const fileName = path.split("/").pop().replace(".md", "");
      return {
        title: fileName.replace(/-/g, " "), // nicer title
        slug: fileName,
      };
    });

    return (
      <div className="max-w-2xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-4">Blog Page</h1>
        <div className="space-y-4">
          {postList.map((post) => (
            <div
              key={post.slug}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-[#3e5d58]">Read more →</p>
            </div>
          ))}

        </div>
        <button 
            className='mt-8 px-10 py-2 bg-white border text-blue-600 rounded-lg  hover:text-white hover:bg-blue-600 border-blue-600 transition'
            onClick={() => navigate('/')}>
            Go Back
        </button>
      </div>
    );
  };
  
  export default BlogPage;
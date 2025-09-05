import { useNavigate } from "react-router-dom";

const BlogPage = () => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col justify-center items-center h-screen p-8">
        <div className='p-20 rounded-xl bg-red-100 text-center'>
            <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
            <p className="text-lg">This is where I share my thoughts and experiences.</p>
            <p className="text-lg">👷 Currently Under Construction... 👷</p>
        </div>
        <button 
            className='mt-8 px-10 py-2 bg-white border text-blue-600 rounded-lg  hover:text-white hover:bg-blue-600 border-blue-600 transition'
            onClick={() => navigate(-1)}>
            Go Back
        </button>
      </div>
    );
  };
  
  export default BlogPage;
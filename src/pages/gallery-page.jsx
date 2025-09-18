import { useNavigate } from "react-router-dom";
import Nav from '../components/nav.jsx'
import photo1 from '../assets/gallery/0002_25A.jpg'
import photo2 from '../assets/gallery/001.jpg'
import photo3 from '../assets/gallery/002.jpg'
import photo4 from '../assets/gallery/0013_14A.jpg'
import photo5 from '../assets/gallery/0015_12A.jpg'
import photo6 from '../assets/gallery/0018_9A.jpg'
import photo7 from '../assets/gallery/0021_6A.jpg'
import photo8 from '../assets/gallery/010.jpeg'
import photo9 from '../assets/gallery/011.jpeg'
import photo10 from '../assets/gallery/012.jpeg'
import photo11 from '../assets/gallery/013.jpeg'
import photo12 from '../assets/gallery/014.jpeg'
import photo13 from '../assets/gallery/015.jpeg'
import photo14 from '../assets/gallery/mygoat.jpeg'


const GalleryPage = () => {
    const navigate = useNavigate();

    const v_images = [photo3, photo5, photo9, photo10, photo13, photo14]
    const h_images = [photo8, photo1, photo2, photo4, photo6, photo7, photo12]
    // future: have different themes in gallery page: film, nature, hobby, etc..
    // for now, just dump all images in one page :)
    return (
        <div className='bg-black text-white min-h-screen'>
            {/* <Nav/> */}
            {/* if l > w, then portrait and insert into top div*/}
            <div className="flex flex-col items-stretch text-white p-5 md:p-15">
                <button className="text-white hover:text-[#3e5d58] hover:underline px-4 py-2 inline-flex" onClick={() => navigate(-1)}>
                    go back
                </button>
                <h1 className='text-4xl self-center'>Gallery</h1>
                <p className='self-center mb-6 text-[#92ACA0]'>photos I like and photos of stuff I like</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-5'>
                    {v_images.map((src, index) => (
                        <div key={index}>
                            <img src={src} className='h-full w-full object-cover'></img>
                        </div>
                    ))}
                </div>
                {/* <div className='p-20 rounded-xl bg-red-100 text-center'>
                </div> */}
                                {/* if w > l, then landscape and insert into bottom div*/}
                <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-5">
                    {h_images.map((src, index) => (
                            <div key={index}>
                                <img src={src} className='h-full w-full object-cover'></img>
                            </div>
                        ))}
                </div>
            </div>



        </div>
      
    );
  };
  
  export default GalleryPage;
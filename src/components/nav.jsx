import { useState } from "react";
import { Link } from 'react-router-dom';
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdNightlight, MdLightMode } from "react-icons/md";

export default function Nav() {
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 z-50 px-6 py-4 bg-[#DDE5ED]/50 backdrop-blur-md shadow-md">
            <div className="max-w-6xl mx-auto flex items-center">
                {/* Logo / Name */}
                <div className="text-2xl font-bold text-[#92ACA0] flex-grow">
                    {/* night mode toggle */}
                    <button className="text-[#92ACA0] hover:text-[#3e5d58] transition mr-4" onClick={() => {
                        //change the button logo
                        setIsDark(!isDark);
                    }}
                    >
                        { isDark ? (
                            <MdLightMode className="inline-block text-2xl"/>
                        ) : (
                            <MdNightlight className="inline-block text-2xl" />
                        )
                        }
                        {/* <MdLightMode className="inline-block text-2xl" /> */}
                    </button>
                    <a href="#" className="hover:text-[#3e5d58] transition">Derek Huang</a>
                </div>


                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8 text-base font-bold">
                    <a href="#about" className="hover:text-[#92ACA0] transition">About</a>
                    <a href="#experience" className="hover:text-[#92ACA0] transition">Experience</a>
                    <a href="#projects" className="hover:text-[#92ACA0] transition">Projects</a>
                    <Link to='/blog' className="hover:text-[#92ACA0] transition">
                        Blog
                    </Link>
                    <Link to='/gallery' className="hover:text-[#92ACA0] transition">
                        Gallery
                    </Link>
                    {/* <a href="#blog" className="hover:text-[#92ACA0] transition">Blog</a> */}
                </div>

                {/* hamburger for mobile */}
                <div className='flex md:hidden'>
                    <p> HI</p>
                    <button 
                     onClick={() => setIsOpen(!isOpen)}
                     className='text-black hover:text-[#3e5d58] transition'>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-2 space-y-2 text-base font-bold text-center">
                    <a href="#about" className="block hover:text-[#92ACA0] transition" onClick={() => setIsOpen(false)}>About</a>
                    <a href="#experience" className="block hover:text-[#92ACA0] transition" onClick={() => setIsOpen(false)}>Experience</a>
                    <a href="#projects" className="block hover:text-[#92ACA0] transition" onClick={() => setIsOpen(false)}>Projects</a>
                    <Link to='/blog' className="block hover:text-[#92ACA0] transition" onClick={() => setIsOpen(false)}>
                        Blog
                    </Link>
                    <Link to='/gallery' className="block hover:text-[#92ACA0] transition" onClick={() => setIsOpen(false)}>
                        Gallery
                    </Link>
                </div>
            )}
        </nav>
    );
}
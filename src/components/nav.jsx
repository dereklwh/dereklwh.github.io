import { useEffect, useState } from "react";
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
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleDarkMode = () => {
        const next = !isDark;
        setIsDark(next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    }

    return (
        <nav className="w-full fixed top-0 z-50 py-4 bg-[#DDE5ED]/50 dark:bg-[#1a2f2a]/50 backdrop-blur-md shadow-md">
            <div className="mx-auto flex w-full items-center px-8 md:max-w-4/5 md:px-12">
                {/* Logo / Name */}
                <div className="text-2xl font-bold text-[#92ACA0] flex-grow">
                    {/* night mode toggle */}
                    <button className="text-[#92ACA0] hover:text-[#3e5d58] transition mr-4"
                    onClick={toggleDarkMode}
                    >
                        { isDark ? (
                            <MdLightMode className="inline-block text-2xl"/>
                        ) : (
                            <MdNightlight className="inline-block text-2xl" />
                        )
                        }
                        {/* <MdLightMode className="inline-block text-2xl" /> */}
                    </button>
                    <a href="#" className="dark:text-[#e8f0ee] hover:text-[#3e5d58] transition">Derek Huang</a>
                </div>


                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8 text-base font-bold dark:text-[#e8f0ee]">
                    <a href="#about" className="hover:text-[#92ACA0] transition">About</a>
                    <a href="#experience" className="hover:text-[#92ACA0] transition">Experience</a>
                    <a href="#projects" className="hover:text-[#92ACA0] transition">Projects</a>
                    <Link to='/blog' className="hover:text-[#92ACA0] transition">
                        Blog
                    </Link>
                    <Link to='/gallery' className="hover:text-[#92ACA0] transition">
                        Gallery
                    </Link>
                </div>

                {/* hamburger for mobile */}
                <div className='flex md:hidden'>
                    <button
                     onClick={() => setIsOpen(!isOpen)}
                     className='text-black dark:text-[#e8f0ee] hover:text-[#3e5d58] transition'>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-2 space-y-2 text-base font-bold text-center dark:text-[#e8f0ee] px-8">
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

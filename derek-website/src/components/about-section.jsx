import React from 'react';
import { FaPython, FaReact, FaJava, FaJs, FaGitAlt, FaDatabase, FaMicrosoft} from "react-icons/fa";
import { SiFlask, SiCplusplus, SiTypescript, SiScikitlearn, SiTailwindcss, SiNeo4J, SiPandas, SiKotlin } from "react-icons/si";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import coffeeImage from '../assets/coffee.jpg';
import canucksTeamPhoto from '../assets/canucks-bi-team.jpg';
import blueprintTeamPhoto from '../assets/blueprint.jpg';
import GalleryCarousel from './GalleryCarousel';

const AboutSection = () => {
    const skills = [
        { name: "Python", icon: <FaPython /> },
        { name: 'Java', icon: <FaJava /> },
        { name: 'C++', icon: <SiCplusplus /> },
        { name: "JavaScript", icon: <FaJs /> },
        { name: "Kotlin", icon: <SiKotlin /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "React.js", icon: <FaReact /> },
        { name: "Flask", icon: <SiFlask /> },
        { name: "Git", icon: <FaGitAlt /> },
        { name: "Neo4j", icon: <SiNeo4J /> },
        { name: "SQL", icon: <FaDatabase /> },
        { name: "pandas", icon: <SiPandas /> },
        { name: "scikit-learn", icon: <SiScikitlearn /> },
        { name: "TailwindCSS", icon: <SiTailwindcss /> },
        { name: "Power BI", icon: <FaMicrosoft /> },
    ];
    
    const galleryImages = [
        { src: coffeeImage,  caption: "Working part time as a Barista @ Matchstick Coffee Roasters" },
        { src: canucksTeamPhoto, caption: "With the Vancouver Canucks BI Team! 🏒" },
        { src: blueprintTeamPhoto, caption: "With the amazing Blueprint team! " },
        // Add more images as needed
    ];

    const contacts = [
        { name: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/in/derekhuang1/" },
        { name: "GitHub", icon: <FaGithub />, href: "https://github.com/dereklwh" },
        { name: "Instagram", icon: <FaInstagram />, href: "https://www.instagram.com/derekklwh" },
        { name: "Email", icon: <HiOutlineMail />, href: "mailto:dlh10@sfu.ca" },
        { name: "Resume", icon: <IoDocumentText />, href: "/DerekHuangResume.pdf" }, // put resume in public/
      ];
      
    return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-6 bg-white rounded-lg shadow-md col-span-1 hover:bg-[#92ACA0]/2 transition-color duration-300">
            <h3 className="font-bold text-2xl mb-4">I'm Excited About...</h3>
            <ul className='list-disc list-inside text-sm/7 font-normal'>
                <li>Data Analytics and Visualization</li>
                <li>Building Web Applications</li>
                <li>Social Impact through Technology</li>
                <li>Documenting my life through journaling</li>
                <li>Continuous Learning and Growth</li>
                <li>Books, Coffee, and my Cat {" "}
                    <span className='relative group cursor-pointer text-[#92ACA0] font-semibold'>
                        芝麻
                        <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-400 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap shadow-md'>
                            zhi &bull; ma (Sesame)
                        </span>
                    </span>
                </li>
            </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md col-span-2">
            <h3 className="font-bold text-2xl">Skills I've Picked Up</h3>
            <p className='text-base text-[#92ACA0] text-sm mb-4 '>Languages, frameworks, and tools I've worked with</p>
            <div className="flex flex-wrap gap-2 justify-center">
                {skills.map((skill, index) => (
                    <span 
                    key={index} 
                    className="flex text-sm items-center gap-2 px-3 py-2 bg-[#DDE5ED] rounded-full text-gray-700 font-medium hover:bg-[#92ACA0] hover:text-white hover:translate-y-[-2px] transition duration-300 cursor-default"
                    >
                    <span className="text-sm">{skill.icon}</span>
                    {skill.name}
                    </span>
                ))}
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md col-span-1">
            <div className="p-6 pb-2">
                <h3 className="font-bold text-2xl">Gallery</h3>
                <p className='text-base text-[#92ACA0] text-sm'>Pictures!!</p>
            </div>
            <div className="h-1 w-full bg-[#92ACA0]"/>
            {/* <img src={coffeeImage} className='rounded-lg h-64 w-full object-cover'/> */}
            <GalleryCarousel images={galleryImages} />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md col-span-1">
            <h3 className="font-bold text-2xl">Let's Connect!</h3>
            <p className='text-base text-[#92ACA0] text-sm mb-4 '>(and check out my resume)</p>
            <div className=''>
                {contacts.map((contact, index) => (
                    <a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-base hover:bg-[#92ACA0] hover:text-white rounded-lg transition transform hover:translate-y-[-2px] mb-1"
                    >
                    <span className="text-lg">{contact.icon}</span>
                    {contact.name}
                    </a>
                )
                )}
            </div>
        </div>

        </div>
    </div>
    );
};

export default AboutSection;
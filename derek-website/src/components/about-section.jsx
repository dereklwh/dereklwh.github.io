import React from 'react';
import { FaPython, FaReact, FaJava, FaJs, FaGitAlt, FaDatabase, FaMicrosoft} from "react-icons/fa";
import { SiFlask, SiCplusplus, SiTypescript, SiScikitlearn, SiTailwindcss, SiNeo4J, SiPandas, SiKotlin } from "react-icons/si";


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

    return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-6 bg-white rounded-lg shadow-md col-span-1">
            <h3 className="font-bold text-2xl mb-4">I'm Excited About:</h3>
            <p className='text-base'>
                - Data Analytics and Visualization<br/>
                - Building Web Applications<br/>
                - Social Impact through Technology<br/>
                - Continuous Learning and Growth<br />
                - Collaborating with Diverse Teams
            </p>
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
        <div className="p-6 bg-white rounded-lg shadow-md col-span-1">
            <h3 className="font-bold text-2xl mb-4">I'm Excited About:</h3>
            <p className='text-base'>
                - Data Analytics and Visualization<br/>
                - Building Web Applications<br/>
                - Social Impact through Technology<br/>
                - Continuous Learning and Growth<br />
                - Collaborating with Diverse Teams
            </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md col-span-1">
            <h3 className="font-bold text-2xl mb-4">I'm Excited About:</h3>
            <p className='text-base'>
                - Data Analytics and Visualization<br/>
                - Building Web Applications<br/>
                - Social Impact through Technology<br/>
                - Continuous Learning and Growth<br />
                - Collaborating with Diverse Teams
            </p>
        </div>

        </div>
    </div>
    );
};

export default AboutSection;
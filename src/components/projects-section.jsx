import { FaGithub } from 'react-icons/fa'
import { useState } from "react";
import fluentU from '../assets/projects/FluentU.png'
import dcc from '../assets/projects/game_project.png'
import crosswatch from '../assets/projects/crosswatch.png'
import website from '../assets/projects/website.png'
import assistiveKeyboard from '../assets/projects/assistive_keyboard.png'
import nhlTravelAnalysis from '../assets/projects/hockey_photo.jpg'
import hospitalBot from '../assets/projects/hospital_bot.png'
import adminPage from '../assets/projects/admin_page_login.png'
import chatbot from '../assets/projects/chatbot2.png'
import canucksWrapped from '../assets/projects/wrapped.png'
import stormhacks from '../assets/projects/pomi_stormhacks.png'

const ProjectsSection = () => {
    const [openIndex, setOpenIndex] = useState(null); // number | null
  
    const project = [
      {src:stormhacks, name: "Pomi", year:"2025", desc:"As a part of StormHacks 2025, developed Pomi, a Pomodoro Pet that uses computer vision to track your focus. Built using NextJS, SQLite3, Flask, and MediaPipe.", url: "https://github.com/braydenmsue/cacheroyale-pomodoro"},
      {src:website, name: "Personal Website", year:"2025", desc:"This website right here! CI/CD pipeline implemented for seamless updates.", url: "https://github.com/dereklwh/dereklwh.github.io"},
      {src:adminPage, name: "MOSAIC Admin Portal", year:"2025", desc:"Developed a content management portal enabling MOSAIC to edit and maintain program data referenced by the chatbot’s Neo4j graph database. Built with React, TypeScript, and Flask, featuring user authentication and custom APIs for seamless updates."},
      {src:assistiveKeyboard, name: "AI Assistive Keyboard", year:"2025", desc:"Developed an assistive keyboard aimed to help patients with communication disabilities. Uses NLP interface that facilitates common language interactions, eye tracking, and speech recognition. Built using ReactJS, TailwindCSS, and Python.", url:"https://github.com/sfu-cmpt340/2025_1_project_18?tab=readme-ov-file#project-overview"},
      {src:nhlTravelAnalysis, name: "NHL Travel Analysis", year:"2025", desc: "Built a modular Python data pipeline to process over 10,000 rows of NHL schedule and geospatial data to analyze team performance during travel. Produced findings in a report with visualizations.", url:"https://github.com/dereklwh/nhl-travel-analysis/blob/main/project-report.pdf"},
      {src:canucksWrapped, name: "Canucks Wrapped", year:"2025", desc:"Built and led the data pipeline powering Canucks Wrapped. Processed 140k+ fan attendance records with Python and NHL API to generate personalized season recaps for 20k+ unique fans."}, 
      {src:chatbot, name: "MOSAIC Chatbot", year:"2024", desc:"Developed an AI chatbot with SFU Blueprint for MOSAIC that improves accessibility for newcomers with real-time program guidance. Built with Flask, Neo4j, and OpenAI models, and recognized as a Top 4 finalist in the SFU CS Diversity Award."},
      {src:crosswatch, name: "CrossWatch", year: "2024", desc: "A movie sharing platform that allows users to create and share watchlists. Competing in the Produhacks hackathon. Built using MERN stack, material-ui, and movieDB API.", url: "https://github.com/jeffre-h/CrossWatch"},
      {src: fluentU, name: "FluentU", year: "2023",desc:" An interactive language learning app with quizzes and customizable flashcards powered by Google Cloud Translation API. Developed in Kotlin", url:"https://github.com/dereklwh/FluentU"},
      {src: dcc, name: "Dead City Cronicles", year:"2023", desc:"An engaging 2D maze game where players navigate through intricate mazes while avoiding smart zombies. Developed using Java and OOP principles. Unit tests implemented using JUnit.", url:"https://github.com/dereklwh/DeadCityChronicles"},
      {src:hospitalBot, name: "Hospital Bot", year: "2022", desc: "SMS-based chatbot that recommends nearest hospitals to users based on their location. Live up-to-date hospital wait times are scraped using BeautifulSoup and Selenium. Developed using Python, Twilio, Google Maps API and deployed on Heroku.", url:"https://github.com/jeffre-h/HospitalBot"}
    ]
  
    const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));
  
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-stretch gap-8'>
        {project.map((proj, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className='flex-col items-center border-1 border-transparent hover:border-gray-300 shadow-md rounded-md'>
              {/* clickable image area */}
              <div
                className='group relative w-full mb-4 cursor-pointer outline-none border-b-2 border-[#92ACA0]'
                role="button"
                tabIndex={0}
                aria-pressed={isOpen}
                onClick={() => toggle(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(index);
                  }
                  if (e.key === 'Escape') setOpenIndex(null);
                }}
              >
                <img
                  src={proj.src}
                  className={[
                    'object-cover w-full h-64 rounded-t-md transition-transform duration-300',
                    isOpen ? 'blur-sm scale-[0.97]' : 'md:group-hover:blur-sm md:group-hover:scale-[0.97]'
                  ].join(' ')}
                  alt={proj.name}
                  draggable={false}
                />
                <div
                  className={[
                    'absolute inset-0 flex items-center justify-center transition-opacity',
                    // Hover on desktop, sticky open on mobile/tap
                    isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                  ].join(' ')}
                >
                  <div
                    className={[
                      'absolute inset-0 rounded-t-md',
                      isOpen ? 'bg-black/40' : 'bg-black/40 pointer-events-none md:pointer-events-auto'
                    ].join(' ')}
                  />
                  <p className="relative z-10 px-4 py-2 text-center text-white text-sm font-normal">
                    {proj.desc}
                  </p>
                </div>
              </div>
  
              {/* description */}
              <div className='pl-4 pb-4'>
                <span className='text-base mb-4 font-bold'>{proj.name}</span>
                <span className="mx-2 text-base text-[#92ACA0]">&bull;</span>
                <span className='text-base mb-2 text-[#92ACA0] font-normal'>{proj.year}</span>
                <div className='flex items-center text-base font-medium'>
                  {proj.url ? (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-[#92ACA0] hover:font-bold transition-colors"
                    >
                      View Project
                      <FaGithub className='ml-2'/>
                    </a>
                  ) : (
                    <span className='text-base text-[#92ACA0] font-medium'>Github Unavailable</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
}

export default ProjectsSection
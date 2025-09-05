import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/nav.jsx'
import { TypeAnimation } from 'react-type-animation'
import heroImage from './assets/derek-notion-face.png'
import AboutSection from './components/about-section.jsx'
import ExperienceSection from './components/experience-section.jsx'
import ProjectsSection from './components/projects-section.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPage from './pages/blog-page';

function Home() {
  return (
    <div className="bg-linear-65 from-white to-[#DDE5ED] text-[#3e5d58] pt-16">
      <Nav/>
      {/* hero */}
      <div className="justify-center p-12 mx-auto text-center max-w-4/5 min-h-screen flex flex-col items-center">
        {/* have a cool aninmation here */}
        <TypeAnimation 
        sequence={[
          "Hey there, I'm Derek :)",
          3000,
          "Welcome to my humble abode. 🏠",
          2000,
          "Please make yourself at home. 🍵",
        ]}
        wrapper="h1"
        className="text-5xl font-bold mb-8"
        speed={10}
        />
        <img src={heroImage} className="w-70 h-auto"></img>
        {/* <h1 className="text-5xl font-bold mb-8">Hey There! I'm Derek :) </h1> */}
        <p className="text-lg mb-4 w-4/5">
          Currently studying business and computer science at{' '}
          <a 
            href="https://www.sfu.ca/" 
            target="_blank" 
            className="font-bold text-[#92ACA0] hover:text-[#A6192E] hover:translate-y-[-2px] transition-transform inline-block"
          >
            Simon Fraser University
          </a>. 
          Volunteering as a student software developer to build an AI Chatbot solution for{' '} 
          <a 
            href="https://mosaicbc.org/" 
            target="_blank" 
            className="font-bold text-[#92ACA0] hover:text-transparent hover:bg-clip-text 
             hover:bg-gradient-to-r hover:from-yellow-500 hover:via-blue-500 hover:to-green-700 hover:translate-y-[-2px] transition-transform inline-block"
          >
            MOSAIC
          </a>.
        </p>
        <p className="text-lg w-4/5">I am passionate about using data, storytelling, and technology to create tools that drive social good.</p>
      </div>


      {/* About me section */}
      <section id="about" className="scroll-mt-16 min-h-screen font-bold max-w-4/5 mx-auto p-12">
        <h1 className='text-4xl mb-6'>About Me
        </h1>
        <AboutSection/>
      </section>

      {/* Experience section */}
      <section id="experience" className="scroll-mt-16 min-h-screen font-bold max-w-4/5 mx-auto p-12">
        <h1 className='text-4xl mb-6'>Experience</h1>
        <ExperienceSection/>
        </section>
      <section id="projects" className="scroll-mt-16 min-h-screen font-bold p-12 max-w-4/5 mx-auto p-12">
        <h1 className='text-4xl mb-6'>Projects</h1>
        <ProjectsSection/>
      </section>
      {/* <section id="blog" className="scroll-mt-16 min-h-screen bg-white p-12">Blog</section> */}
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='blog' element={<BlogPage />} />
      </Routes>
    </Router>
  )
}

export default App

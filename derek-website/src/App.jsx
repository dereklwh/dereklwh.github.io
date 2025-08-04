import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/nav.jsx'
import { TypeAnimation } from 'react-type-animation'

function App() {
  return (
    <div className="bg-linear-65 from-white to-[#DDE5ED] text-[#3e5d58] pt-16">
      <Nav/>
      {/* hero */}
      <div className="justify-center p-12 mx-auto text-center min-h-screen flex flex-col items-center">
        {/* have a cool aninmation here */}
        <TypeAnimation 
        sequence={[
          "Hey there, I'm Derek :)",
          3000,
          "Welcome to my humble abode. 🛖",
          2000,
          "Please make yourself at home. 🍵",
        ]}
        wrapper="h1"
        className="text-5xl font-bold mb-8"
        speed={10}
        />
        {/* <h1 className="text-5xl font-bold mb-8">Hey There! I'm Derek :) </h1> */}
        <p className="text-lg mb-4 w-4/5">
          Currently studying business and computer science at{' '}
          <a 
            href="https://www.sfu.ca/" 
            target="_blank" 
            className="font-bold hover:text-[#92ACA0] hover:translate-y-[-2px] transition-transform inline-block"
          >
            Simon Fraser University
          </a>. 
          Volunteering as a student software developer to build an AI Chatbot solution for{' '} 
          <a 
            href="https://mosaicbc.org/" 
            target="_blank" 
            className="font-bold hover:text-[#92ACA0] hover:translate-y-[-2px] transition-transform inline-block"
          >
            MOSAIC
          </a>.
        </p>
        <p className="text-lg w-4/5">I am passionate about using data, storytelling, and technology to create tools that drive social good.</p>
      </div>
      {/* Dummy sections for testing */}
      <section id="about" className="scroll-mt-16 min-h-screen p-12 text-4xl font-bold max-w-4/5 mx-auto">
        About Me
        <div className="bg-[#DDE5ED] p-5 shadow-md rounded-lg"/>
      </section>
      <section id="experience" className="scroll-mt-16 min-h-screen p-12 text-4xl font-bold max-w-4/5 mx-auto">
        Experience
        <div className="bg-white p-5 shadow-md rounded-lg"/>
        </section>
      <section id="projects" className="scroll-mt-16 min-h-screen p-12 text-4xl font-bold max-w-4/5 mx-auto">Projects</section>
      {/* <section id="blog" className="scroll-mt-16 min-h-screen bg-white p-12">Blog</section> */}
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/nav.jsx'

function App() {
  return (
    <div className="bg-white text-[#3e5d58] pt-16">
      <Nav/>
      {/* hero */}
      <div className="justify-center bg-[#DDE5ED] p-12 mx-auto text-center min-h-screen flex flex-col items-center">
        {/* have a cool aninmation here */}
        <h1 className="text-5xl font-bold mb-8">Hey There! I'm Derek :) </h1>
        <p className="text-lg mb-4 w-4/5">Currently studying business and computer science at <strong>Simon Fraser University</strong>. Volunteering as a student software developer to build an AI Chatbot solution for <a href="https://mosaicbc.org/" className="underline hover:text-[#92ACA0]">MOSAIC</a></p>
        <p className="text-lg w-4/5">I am deeply passionate about data, reading books, and creating technology that benefits social good</p>
      </div>
      {/* Dummy sections for testing */}
      <section id="about" className="scroll-mt-16 min-h-screen bg-white p-12">About Me</section>
      <section id="experience" className="scroll-mt-16 min-h-screen bg-white] p-12">Experience</section>
      <section id="projects" className="scroll-mt-16 min-h-screen bg-white p-12">Projects</section>
      {/* <section id="blog" className="scroll-mt-16 min-h-screen bg-white p-12">Blog</section> */}
    </div>
  )
}

export default App

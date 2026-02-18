import './App.css'
import Nav from './components/nav.jsx'
import Footer from './components/footer.jsx'
import { TypeAnimation } from 'react-type-animation'
import heroImage from './assets/derek-notion-face.png'
import AboutSection from './components/about-section.jsx'
import ExperienceSection from './components/experience-section.jsx'
import ProjectsSection from './components/projects-section.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogPage from './pages/blog-page.jsx';
import BlogPost from './pages/blog-post.jsx';
import GalleryPage from './pages/gallery-page.jsx';
import useCurrentlyReading from './hooks/useCurrentlyReading.js';

function Home() {
  const book = useCurrentlyReading();
  const proofChips = [
    '20k+ fan recaps generated',
    'AI + Full-stack builder',
    'Data storytelling for social impact',
    'Doomscrolls books',
  ];
  return (
    <div className="dark:bg-[#1a2f2a] dark:bg-none dark:text-[#e8f0ee] bg-linear-65 from-white to-[#DDE5ED] text-[#3e5d58] pt-16">
      <Nav/>
      {/* hero */}
      <section className="relative isolate overflow-hidden p-8 md:p-12 mx-auto md:max-w-4/5 min-h-[100dvh] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
          <div>
            <p className="text-base uppercase tracking-wider text-[#92ACA0] mb-3">Hello, I&apos;m Derek Huang</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              I build data-driven products for social impact.
            </h1>
            <p className="text-lg mb-4">
              Business + computer science student at{' '}
              <a
                href="https://www.sfu.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#92ACA0] hover:text-[#A6192E] transition-colors"
              >
                Simon Fraser University
              </a>{' '}
              and software developer for MOSAIC and Cortico Health.
            </p>
            <TypeAnimation
              sequence={[
                "Building full-stack apps with data at the core.",
                1800,
                "Turning ideas into useful, human-centered products.",
                1800,
              ]}
              wrapper="p"
              className="text-base md:text-lg text-[#92ACA0] mb-6 min-h-10"
              speed={30}
              repeat={Infinity}
            />
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-[#92ACA0] text-white font-semibold hover:bg-[#6f8a84] transition-colors"
              >
                View Projects
              </a>
              <Link
                to="/blog"
                className="px-5 py-2.5 rounded-lg border border-[#92ACA0] text-[#3e5d58] dark:text-[#e8f0ee] font-semibold hover:bg-[#92ACA0]/20 transition-colors"
              >
                Read Blog
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {proofChips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-white/80 dark:bg-[#243b35] border border-[#92ACA0]/30"
                >
                  {chip}
                </span>
              ))}
            </div>
            {book ? (
              <p className="text-base mt-5">
                Currently reading{' '}
                <a
                  className="text-[#92ACA0] hover:underline hover:text-orange-400"
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.title}
                </a>{' '}
                by {book.author}
              </p>
            ) : null}
          </div>
          <div className="flex justify-center md:justify-end relative order-first md:order-last">
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-64 md:w-72 h-64 md:h-72 rounded-full bg-gradient-to-tr from-[#92ACA0]/40 via-[#6f8a84]/30 to-[#92ACA0]/40 blur-2xl animate-spin-slow" />
            <img
              src={heroImage}
              className="relative w-56 md:w-full max-w-sm h-auto rounded-3xl shadow-xl ring-1 ring-[#92ACA0]/30"
              alt="Portrait of Derek Huang"
            />
          </div>
        </div>
      </section>


      {/* About me section */}
      <section id="about" className="scroll-mt-16 min-h-screen font-bold md:max-w-4/5 mx-auto p-12">
        <h1 className='text-4xl mb-6'>About Me
        </h1>
        <AboutSection/>
      </section>

      {/* Experience section */}
      <section id="experience" className="scroll-mt-16 min-h-screen font-bold md:max-w-4/5 mx-auto p-12">
        <h1 className='text-4xl mb-6'>Experience</h1>
        <ExperienceSection/>
        </section>
      <section id="projects" className="scroll-mt-16 min-h-screen font-bold p-12 md:max-w-4/5 mx-auto p-12">
        <h1 className='text-4xl mb-6'>Projects</h1>
        <ProjectsSection/>
      </section>
      {/* <section id="blog" className="scroll-mt-16 min-h-screen bg-white p-12">Blog</section> */}
      <Footer/>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='blog' element={<BlogPage />} />
        <Route path= 'blog/:slug' element={<BlogPost />} />
        <Route path='gallery' element={<GalleryPage />} />
      </Routes>
    </Router>
  )
}

export default App

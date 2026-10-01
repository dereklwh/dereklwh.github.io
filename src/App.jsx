import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Hero from './components/Hero.jsx';
import SectionHeading from './components/SectionHeading.jsx';
import AboutSection from './components/about-section.jsx';
import ExperienceSection from './components/experience-section.jsx';
import ProjectsSection from './components/projects-section.jsx';
import BlogPage from './pages/blog-page.jsx';
import GalleryPage from './pages/gallery-page.jsx';
import NotFoundPage from './pages/not-found-page.jsx';
import useTitle from './hooks/useTitle.js';

// react-markdown and the tracker are only needed on their own routes
const BlogPost = lazy(() => import('./pages/blog-post.jsx'));
const BadmintonBudgetTracking = lazy(() => import('./pages/badminton-budget-tracking.jsx'));

function Home() {
  const { hash } = useLocation();
  useTitle();

  // Scroll to #about / #experience / #projects, including when arriving from another page
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  return (
    <>
      <Hero />

      <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <SectionHeading index="01" eyebrow="About" title="About Me" />
        <AboutSection />
      </section>

      <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <SectionHeading index="02" eyebrow="Experience" title="Experience" />
        <ExperienceSection />
      </section>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <SectionHeading index="03" eyebrow="Projects" title="Projects" />
        <ProjectsSection />
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<Suspense fallback={null}><BlogPost /></Suspense>} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="badminton-budget-tracking" element={<Suspense fallback={null}><BadmintonBudgetTracking /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;

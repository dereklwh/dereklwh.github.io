import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import Nav from './nav.jsx';
import Footer from './footer.jsx';
import CommandMenu from './CommandMenu.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function Layout() {
  const location = useLocation();
  // useOutlet freezes the outgoing page so it can animate out before the next one mounts
  const outlet = useOutlet();

  const handleExitComplete = () => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="min-h-screen pt-16"
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CommandMenu />
    </MotionConfig>
  );
}

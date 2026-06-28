import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { GitHubSection } from './sections/GitHubSection';
import { Resume } from './sections/Resume'; // This displays Education & CV Download
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lenis Smooth Scroll Setup (Lightweight)
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let animId;
    function raf(time) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    if (loading) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis.start();
      document.body.style.overflow = '';
    }

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />

          <main style={{ position: 'relative', zIndex: 2 }}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <GitHubSection />
            <Resume />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;

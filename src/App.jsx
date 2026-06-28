import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { WebGLBackground } from './components/WebGLBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Certifications } from './sections/Certifications';
import { Achievements } from './sections/Achievements';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Stop scrolling when preloading
    if (loading) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis.start();
      document.body.style.overflow = '';
    }

    return () => {
      lenis.destroy();
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      
      {!loading && (
        <>
          <CustomCursor />
          <WebGLBackground />
          <Navbar />
          
          <main style={{ position: 'relative', zIndex: 2 }}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Achievements />
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

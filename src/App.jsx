import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { WebGLBackground } from './components/WebGLBackground';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
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
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;

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
      {/* Film-grain noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Preloader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
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

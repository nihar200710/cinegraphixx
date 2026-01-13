import React, { useEffect, useLayoutEffect } from 'react';
// Using HashRouter for GitHub Pages support
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// --- COMPONENTS ---
import Navbar from './components/Navbar'; 
import Hero from './components/Hero';     
import Gallery from './components/Gallery'; 
import About from './components/About';

gsap.registerPlugin(ScrollTrigger);

/**
 * HOME COMPONENT
 * Contains the Hero and the Works Gallery
 */
function Home() {
  const location = useLocation();

  // Handle scroll to #works if coming from another page
  useEffect(() => {
    if (location.hash === '#works') {
      const elem = document.getElementById('works');
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <div id="works">
        <Gallery />
      </div>
    </>
  );
}

/**
 * LAYOUT COMPONENT
 * Handles Smooth Scroll (Lenis) and Scroll Restoration
 */
function Layout() {
  const location = useLocation();

  // 1. SCROLL RESTORATION FIX
  // Forces the browser to start at the top on refresh/route change
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 2. LENIS SMOOTH SCROLL SETUP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* <CustomCursor /> */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

/**
 * MAIN APP
 */
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
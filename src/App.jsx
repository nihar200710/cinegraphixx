import { useEffect, useLayoutEffect } from 'react'; // 1. Import useLayoutEffect
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import About from './components/About'; 

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
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

function Layout() {
  const location = useLocation();

  // --- FIX START: FORCE SCROLL TO TOP ON REFRESH ---
  useLayoutEffect(() => {
    // 1. Tell browser not to restore scroll position automatically
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // 2. Force scroll to top instantly
    window.scrollTo(0, 0);
  }, [location.pathname]);
  // --- FIX END ---

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Ensure Lenis also knows we are at the top
    lenis.scrollTo(0, { immediate: true });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <>
      <CustomCursor />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
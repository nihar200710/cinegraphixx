import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();

  // Logic to handle scroll when arriving from another page
  useEffect(() => {
    if (location.hash === '#works') {
      const element = document.getElementById('works');
      if (element) {
        // Small timeout ensures the DOM is ready before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '200vh' }}>
      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'Syne', fontSize: '4rem' }}>HERO SECTION</h1>
      </section>

      {/* Works Section - THIS ID IS REQUIRED */}
      <section id="works" style={{ height: '100vh', background: '#222', padding: '100px 5%' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '3rem' }}>SELECTED WORKS</h2>
        <p>Project 1</p>
        <p>Project 2</p>
        <p>Project 3</p>
      </section>
    </div>
  );
}
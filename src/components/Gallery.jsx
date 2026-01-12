import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Tilt from 'react-parallax-tilt';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. YOUR LOCAL IMAGES (Kept exactly as provided)
import cretaImg from '../assets/CRETA.jpg'; 
import monkeyImg from '../assets/monkey.jpg';
import vishnuImg from '../assets/vispor.jpg';
import artblackvid from '../assets/artbla.mp4';
import cousvid from '../assets/cousi.mp4';
import tarun from '../assets/tarunam.mp4';
import sepc from '../assets/specialocc.mp4';
import harati from '../assets/harati.mp4';
import coffe from '../assets/coffebar.mp4';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    title: "CAR", 
    category: "Photo", 
    src: cretaImg, 
    type: "Photo"
  },
  { 
    id: 2, 
    title: "Nature", 
    category: "Photo", 
    src: monkeyImg,
    type: "Photo"
  },
  { 
    id: 3, 
    title: "Commercial", 
    category: "Photo", 
    src: vishnuImg, 
    type: "Photo" 
  },
  { 
    id: 4, 
    title: "Festival", 
    category: "Video", 
    src: harati,
    type: "video" 
  },
  { 
    id: 5, 
    title: "Personal Shoot", 
    category: "Video", 
    src: cousvid,
    type: "video"
  },
  { 
    id: 6, 
    title: "Restaurant-Openings", 
    category: "Video", 
    src: tarun,
    type: "video"
  },
  { 
    id: 7, 
    title: "Restaurant-commercial", 
    category: "Video", 
    src: coffe,
    type: "video"
  },
  { 
    id: 8, 
    title: "Special Occasions", 
    category: "Video", 
    src: sepc,
    type: "video"
  },
  { 
    id: 9, 
    title: "Artistic", 
    category: "Video", 
    src: artblackvid,
    type: "video"
  },
];

export default function Gallery() {
  const container = useRef();
  const [selected, setSelected] = useState(null);
  
  // TRACK WHICH VIDEO HAS AUDIO ON
  const [activeAudioId, setActiveAudioId] = useState(null);

  // 1. Grid Animation
  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    cards.forEach(card => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, y: 0, duration: 1, ease: 'power2.out', 
          scrollTrigger: {
            trigger: card,
            start: "top 90%", 
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: container });

  // 2. Modal Logic
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
      setActiveAudioId(null); 
      
      gsap.fromTo(".modal-overlay", { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(".modal-media", 
        { scale: 0.9, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selected]);

  // Toggle Audio Helper
  const toggleAudio = (e, id) => {
    e.stopPropagation(); 
    if (activeAudioId === id) {
      setActiveAudioId(null); 
    } else {
      setActiveAudioId(id); 
    }
  };

  return (
    <section ref={container} style={{ padding: '10vh 5%', background: '#050505', minHeight: '100vh', position: 'relative' }}>
      
      {/* --- HEADER WITH NEW TEXT --- */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: '3rem', 
          color: 'white', 
          textTransform: 'uppercase',
          fontFamily: 'Syne',
          marginBottom: '1rem'
        }}>
          Selected Works
        </h2>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#888', 
          fontFamily: 'Syne', 
          fontWeight: '400',
          maxWidth: '600px', 
          lineHeight: '1.5'
        }}>
          Car & Bike Delivery Shoots • Weddings • Any Shoot Available • Cinematic Nature Films • Commercials • Music Videos • Short Films • And More
        </p>
      </div>
      
      {/* --- GRID LAYOUT (FIXED FOR MOBILE) --- */}
      {/* Changed 400px to 300px below */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        {projects.map((project, index) => (
          
          <Tilt 
            key={project.id} 
            tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000}
            className="project-trigger"
          >
            <div 
              className="project-card hover-trigger" 
              onClick={() => setSelected(project)}
              style={{ marginTop: index % 2 !== 0 ? '30%' : '0', cursor: 'pointer' }}
            >
              
              {/* MEDIA CONTAINER */}
              <div style={{ width: '100%', height: 'auto', overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
                
                {project.type === 'video' ? (
                   <div className="video-wrapper" style={{ position: 'relative' }}>
                     
                     <video 
                        muted={activeAudioId !== project.id}
                        autoPlay loop playsInline 
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                     >
                       <source src={project.src} type="video/mp4" />
                     </video>

                     {/* MUTE/UNMUTE ICON */}
                     <button 
                       onClick={(e) => toggleAudio(e, project.id)}
                       style={{
                         position: 'absolute', bottom: '15px', right: '15px',
                         background: 'rgba(0,0,0,0.6)', 
                         border: '1px solid rgba(255,255,255,0.2)',
                         borderRadius: '50%', width: '35px', height: '35px',
                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                         cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(4px)',
                         color: 'white', transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => e.target.style.background = '#ff3c3c'}
                       onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.6)'}
                     >
                       {activeAudioId === project.id ? (
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                       ) : (
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                       )}
                     </button>

                   </div>
                ) : (
                   <img src={project.src} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                )}
              </div>

              {/* CAPTION */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'Syne' }}>{project.title}</h3>
                <span style={{ color: '#ff3c3c' }}>{project.category}</span>
              </div>

            </div>
          </Tilt>
        ))}
      </div>

      {/* --- PREMIUM POP-UP MODAL --- */}
      {selected && (
        <div 
          className="modal-overlay"
          onClick={() => setSelected(null)} 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: 'rgba(5, 5, 5, 0.9)', backdropFilter: 'blur(15px)', cursor: 'pointer'
          }}
        >
          <div style={{ position: 'relative', width: '85%', maxWidth: '1400px', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
            
            <button 
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: -40, right: 0, background: 'none', border: 'none',
                color: '#ff3c3c', fontFamily: 'Syne', fontSize: '1.2rem', cursor: 'pointer',
                letterSpacing: '2px', pointerEvents: 'auto', fontWeight: 'bold'
              }}
            >
              CLOSE [X]
            </button>

            {selected.type === 'video' ? (
              <video 
                className="modal-media"
                src={selected.src} 
                controls autoPlay 
                onClick={(e) => e.stopPropagation()} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', pointerEvents: 'auto' }}
              />
            ) : (
              <img 
                className="modal-media"
                src={selected.src} 
                alt={selected.title} 
                onClick={(e) => e.stopPropagation()} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', pointerEvents: 'auto' }} 
              />
            )}

            <div style={{ position: 'absolute', bottom: -40, left: 0, display: 'flex', gap: '20px' }}>
              <h2 style={{ color: 'white', fontFamily: 'Syne', margin: 0 }}>{selected.title}</h2>
              <span style={{ color: '#ff3c3c' }}>// {selected.category}</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
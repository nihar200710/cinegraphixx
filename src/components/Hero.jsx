import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reveal Text
    tl.to(".reveal-text", {
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out"
    });

    // Parallax Image
    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <section ref={container} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Image - Replace URL with your best photo */}
      <div className="hero-bg" style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '130%',
        backgroundImage: 'url("https://i.pinimg.com/736x/5a/b8/b9/5ab8b957cd599ccc366a53c3910b21fc.jpg")',
        backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1,
        filter: 'brightness(0.5)'
      }}></div>

      <div style={{ textAlign: 'center', zIndex: 2 }}>
        {["CINEMATOGRAPHY","&", "EDITING"].map((text, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <h1 className="reveal-text" style={{ 
              fontSize: '8vw', textTransform: 'uppercase', lineHeight: 0.85, 
              transform: 'translateY(100%)', color: i === 2 ? '#ff3c3c' : 'white'
            }}>
              {text}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // QuickTo for high performance movement
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onHover = (e) => {
      // 1. Hovering a Project? Show "VIEW"
      if (e.target.closest('.project-card')) {
        gsap.to(cursorRef.current, { scale: 4, backgroundColor: '#fff', mixBlendMode: 'difference' });
        textRef.current.innerText = "VIEW";
        gsap.to(textRef.current, { opacity: 1 });
      } 
      // 2. Hovering a Link/Button? Scale up slightly
      else if (e.target.closest('a') || e.target.closest('button')) {
        gsap.to(cursorRef.current, { scale: 1.5, backgroundColor: '#ff3c3c', mixBlendMode: 'normal' });
        gsap.to(textRef.current, { opacity: 0 });
      } 
      // 3. Default State
      else {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: '#fff', mixBlendMode: 'difference' });
        gsap.to(textRef.current, { opacity: 0 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', onHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', onHover);
    };
  }, []);

  return (
    <div ref={cursorRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '15px', height: '15px',
      borderRadius: '50%', backgroundColor: '#fff',
      pointerEvents: 'none', zIndex: 9999,
      transform: 'translate(-50%, -50%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      mixBlendMode: 'difference'
    }}>
      <span ref={textRef} style={{ fontSize: '3px', fontWeight: 'bold', color: 'black', opacity: 0 }}></span>
    </div>
  );
}
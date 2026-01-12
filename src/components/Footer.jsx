import { FaYoutube, FaInstagram } from 'react-icons/fa'; 

export default function Footer() {
  return (
    <footer style={{ 
      background: '#050505', 
      color: 'white', 
      padding: '4rem 5%', 
      borderTop: '1px solid #222',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      textAlign: 'center'
    }}>

      {/* 1. CONTACT INFO SECTION */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'Syne', fontSize: '1.2rem' }}>
        
        {/* Mail ID */}
        <div>
          <span style={{ color: '#666' }}>Mail ID: </span>
          <a href="mailto:cinegraphixxx@gmail.com" style={{ color: 'white', textDecoration: 'none', marginLeft: '8px' }}>
            cinegraphixxx@gmail.com
          </a>
        </div>

        {/* Mobile */}
        <div>
          <span style={{ color: '#666' }}>Mobile: </span>
          <a href="tel:+919666995568" style={{ color: 'white', textDecoration: 'none', marginLeft: '8px' }}>
            +91 9666995568
          </a>
        </div>

      </div>

      {/* 2. SOCIAL LINKS */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem' }}>
        
        {/* YouTube Link */}
        <a 
          href="https://youtube.com/@cinegraphixx" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            color: 'white', textDecoration: 'none', 
            fontSize: '1.1rem', fontFamily: 'Syne', textTransform: 'uppercase',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ff3c3c'} 
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          YouTube <FaYoutube size={24} />
        </a>

        {/* Instagram Link */}
        <a 
          href="https://www.instagram.com/cinegraphixx" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            color: 'white', textDecoration: 'none', 
            fontSize: '1.1rem', fontFamily: 'Syne', textTransform: 'uppercase',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#E1306C'} 
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          Instagram <FaInstagram size={24} />
        </a>

      </div>

      {/* 3. COPYRIGHT & CREDITS */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginTop: '2rem' }}>
        
        {/* Copyright Line */}
        <div style={{ fontSize: '0.8rem', color: '#444', fontFamily: 'Inter' }}>
          © {new Date().getFullYear()} Cinegraphixx. All rights reserved.
        </div>

        {/* --- NEW SECTION: DEVELOPER CREDIT --- */}
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#333', // Darker grey for subtlety
          fontFamily: 'Syne', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          marginTop: '0.5rem'
        }}>
          Done by Nihar
        </div>

      </div>

    </footer>
  );
}
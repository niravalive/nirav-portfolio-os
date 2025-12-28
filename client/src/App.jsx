import React, { useState, useEffect } from 'react';
import DesktopLayout from './components/DesktopLayout';
import MobileLayout from './components/MobileLayout';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Screen Size Check Karne Ka Logic
  useEffect(() => {
    const checkScreenSize = () => {
      // Agar width 768px se kam hai to Mobile maano
      setIsMobile(window.innerWidth < 768);
    };

    // Shuru mein check karo
    checkScreenSize();

    // Jab bhi screen resize ho, tab bhi check karo
    window.addEventListener('resize', checkScreenSize);

    // Safayi abhiyan
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Conditional Rendering
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

export default App;
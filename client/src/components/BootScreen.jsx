import React from 'react';
import { motion } from 'framer-motion';

const BootScreen = ({ onComplete }) => {
  return (
    // Z-Index 5000: Sabse upar rahega
    <div className="fixed inset-0 bg-black z-[5000] flex flex-col items-center justify-center cursor-none">
      
      {/* 1. Apple Logo (Ab seedha PNG image hai) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-10"
      >
        <img 
          // Wikimedia ka Official White Logo URL
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1010px-Apple_logo_white.svg.png?20220821122232" 
          alt="Apple Logo" 
          className="w-24 h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* 2. Loading Bar Container */}
      <div className="w-56 h-1.5 bg-[#333] rounded-full overflow-hidden relative">
        {/* The White Filling Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }} // 3 Second ka boot time
          onAnimationComplete={onComplete} // Animation khatam hote hi Desktop dikhao
          className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        />
      </div>
      
    </div>
  );
};

export default BootScreen;
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Asli Apple Icons ke direct links (High Quality)
const apps = [
  { name: 'Finder', icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/4a2f1b4c5001a04f4cd2e54f7116d16c_low_res_Finder_Beta_2__Liquid_Glass_.png' },
  { name: 'Safari', icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/a0b8d534889b5695781a9a03f388e2d4_low_res_Safari__MacOS_Tahoe_.png' },
  { name: 'Terminal', icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/4aef21aa2a547d46d3f4469fe42dea12_low_res_Terminal.png' },
  { name: 'Notes', icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9b097d03bf6528496d8579a38917b76c_low_res_Notes.png' },
  { name: 'Messages', icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/bb5a4b5042f5dbd01baf9c1697460774_JQL8D8bMM2.png' },
  { name: 'Music', icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/43fc64dd49d0125e9b34d1d49204cafb_low_res_Music__MacOS_Tahoe_.png' },
  { name: 'Activity', icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/cd86d6c0730387a67de9a27ec6d727fa_12CLay7HdL.png' },
  { name: 'Trash', icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/c3be764d323d03b2ce9921be92216fca_yrypldfXBR.png' } 
];

// 1. Single Icon Component (Jo Magnify Hoga)
function DockIcon({ mouseX, img, name, onClick }) {
  const ref = useRef(null);

  // Mouse ka distance calculate karna
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Distance ke hisab se width change karna (Wave Effect)
  // Range: [-150, 0, 150] -> Mouse door hai, paas hai, ya dusri side door hai
  // Output: [50, 100, 50] -> Base size 50px, Max size 100px
  const widthSync = useTransform(distance, [-150, 0, 150], [63, 95, 63]);
  
  // Spring lagana taaki animation smooth (makkhan) ho
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="aspect-square w-full rounded-2xl flex items-center justify-center cursor-pointer relative group"
    >
      {/* Tooltip */}
      <span className="absolute -top-9 bg-gray-800/80 backdrop-blur-md text-white text-[12px] px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 pointer-events-none">
        {name}
      </span>
      
      {/* Icon Image */}
      <img src={img} alt={name} className="w-full h-full object-cover drop-shadow-lg active:brightness-75 transition-all" />
      
      {/* Active Dot (Optional) */}
      <div className="absolute -bottom-2 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100"></div>
    </motion.div>
  );
}

// 2. Main Dock Container
const Dock = ({ onAppClick }) => {
  // Mouse ki X value store karne ke liye
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 w-full flex justify-center z-[1000] px-4 pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-18 items-end gap-1 rounded-3xl bg-white/20 px-4 pb-1 backdrop-blur-2xl border border-white/20 pointer-events-auto shadow-2xl"
      >
        {apps.map((app) => (
          <DockIcon 
            key={app.name} 
            mouseX={mouseX} 
            img={app.icon} 
            name={app.name} 
            onClick={() => onAppClick(app.name)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Dock;
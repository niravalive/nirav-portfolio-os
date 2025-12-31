import React, { useState } from 'react';
// Apps Import (Paths check kar lena)
import Terminal from '../apps/Terminal'; 
import Safari from '../apps/Safari'; 
import Notes from '../apps/Notes';
import Music from '../apps/Music';
import Messages from '../apps/Messages';
import Finder from '../apps/Finder'; 
import Activity from '../apps/Activity';

const MobileLayout = () => {
  const [activeApp, setActiveApp] = useState(null);

  // === 1. Main Grid Apps (Upper Area) - TERA ORIGINAL DATA ===
  const apps = [
    { 
      name: 'Files', 
      img: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/4a2f1b4c5001a04f4cd2e54f7116d16c_low_res_Finder_Beta_2__Liquid_Glass_.png',
      component: <Finder /> 
    },
    { 
      name: 'Notes', 
      img: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9b097d03bf6528496d8579a38917b76c_low_res_Notes.png',
      component: <Notes /> 
    },
    { 
      name: 'Activity', 
      img: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/cd86d6c0730387a67de9a27ec6d727fa_12CLay7HdL.png',
      component: <Activity /> 
    },
    { 
      name: 'Trash', 
      img: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/c3be764d323d03b2ce9921be92216fca_yrypldfXBR.png',
      // Tera Custom Trash Component
      component: <div className="p-10 text-center flex flex-col items-center justify-center h-full"><span className="text-4xl">🗑️</span><p className="mt-4 text-gray-500">Trash is Empty</p></div> 
    },
  ];

  // === 2. Dock Apps (Bottom Area) - TERA ORIGINAL DATA ===
  const dockApps = [
    { 
      name: 'Messages', 
      img: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/cee55f864899c6136b35c6e6839edbed_DFcwi8OtIU.png',
      component: <Messages /> 
    },
    { 
      name: 'Safari', 
      img: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/a0b8d534889b5695781a9a03f388e2d4_low_res_Safari__MacOS_Tahoe_.png',
      component: <Safari /> 
    },
    { 
      name: 'Terminal', 
      img: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/4aef21aa2a547d46d3f4469fe42dea12_low_res_Terminal.png',
      component: <Terminal /> 
    },
    { 
      name: 'Music', 
      img: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/43fc64dd49d0125e9b34d1d49204cafb_low_res_Music__MacOS_Tahoe_.png',
      component: <Music /> 
    },
  ];

  return (
    // === OUTER LAYER (Black Background to hide browser bars) ===
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      
      {/* === PHONE FRAME (85% Size) === */}
      <div className="relative w-[88%] h-[90%] md:w-[375px] md:h-[800px] bg-black rounded-[50px] shadow-2xl border-[8px] border-[#1f1f1f] overflow-hidden ring-2 ring-white/10">
        
        {/* Dynamic Island (Notch) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] absolute right-4"></div>
        </div>

        {/* === SCREEN AREA (Tera Original Layout) === */}
        <div className="w-full h-full bg-cover bg-center relative overflow-hidden rounded-[42px] flex flex-col justify-between"
             style={{ 
               backgroundImage: !activeApp ? "url('https://i.pinimg.com/1200x/cc/10/91/cc1091f554fbb37ff1ab2b82a9cf1fa3.jpg')" : 'none', 
               backgroundColor: activeApp ? '#fff' : 'transparent' 
             }}>

            {/* --- CASE 1: APP OPEN --- */}
            {activeApp ? (
              <div className="absolute inset-0 z-40 flex flex-col animate-in slide-in-from-bottom duration-300 bg-white">
                 {/* Top Bar (Back Button) */}
                 <div className="h-14 bg-[#f2f2f2] border-b border-gray-300 flex items-end pb-2 px-4 justify-between shrink-0">
                    <button 
                      onClick={() => setActiveApp(null)}
                      className="text-[#007AFF] font-medium text-base flex items-center gap-1 active:opacity-50"
                    >
                      ‹ Back
                    </button>
                    <span className="font-semibold text-black text-sm mb-0.5">{activeApp.name}</span>
                    <div className="w-8"></div> 
                 </div>
                 {/* App Content */}
                 <div className="flex-grow overflow-hidden relative">
                    {activeApp.component}
                 </div>
              </div>
            ) : (
              // --- CASE 2: HOME SCREEN (Tera Original UI) ---
              <>
                 {/* Status Bar */}
                 <div className="absolute top-4 w-full px-8 flex justify-between text-white text-[14px] font-bold z-10">
                     <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                     <div className="flex gap-1 items-center">
                        <span className="text-[14px]">5G</span>
                        <div className="w-7 h-3 border border-white rounded-[4px]"></div>
                     </div>
                 </div>

                 {/* Grid Apps (Upar wale icons) */}
                 <div className="flex-grow px-6 pt-14 grid grid-cols-4 content-start gap-y-6 gap-x-2">
                    {apps.map((app) => (
                      <div key={app.name} onClick={() => setActiveApp(app)} className="flex flex-col items-center gap-1 group active:opacity-70 transition-opacity">
                        <div className="w-[68px] h-[68px] rounded-[16px] overflow-hidden shadow-lg transition-transform duration-200">
                           <img src={app.img} alt={app.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white text-[11px] font-medium drop-shadow-md tracking-tight">{app.name}</span>
                      </div>
                    ))}
                 </div>

                 {/* Dock Apps (Tera Glassmorphism Dock) */}
                 <div className="px-4 pb-6">
                    <div className="bg-white/20 backdrop-blur-2xl rounded-[35px] py-4 px-2 flex justify-around items-center shadow-2xl border border-white/10">
                       {dockApps.map((app) => (
                         <div key={app.name} onClick={() => setActiveApp(app)} className="flex flex-col items-center active:scale-90 transition-transform">
                            <div className="w-[64px] h-[64px] rounded-[14px] overflow-hidden shadow-lg">
                               <img src={app.img} alt={app.name} className="w-full h-full object-cover" />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </>
            )}

        </div>

        {/* Fake Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/60 rounded-full z-50 pointer-events-none"></div>

      </div>
    </div>
  );
};

export default MobileLayout;
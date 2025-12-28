import React, { useState } from 'react';
// Apps Import (Ensure paths are correct)
import Terminal from '../apps/Terminal'; 
import Safari from '../apps/Safari'; 
import Notes from '../apps/Notes';
import Music from '../apps/Music';
import Messages from '../apps/Messages';
import Finder from '../apps/Finder'; 
import Activity from '../apps/Activity';

const MobileLayout = () => {
  const [activeApp, setActiveApp] = useState(null);

  // === 1. Main Grid Apps (Upper Area) ===
  const apps = [
    { 
      name: 'File', 
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
      component: <div className="p-10 text-center flex flex-col items-center justify-center h-full"><span className="text-4xl">🗑️</span><p className="mt-4 text-gray-500">Trash is Empty</p></div> 
    },
  ];

  // === 2. Dock Apps (Bottom Area) ===
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

  // === APP OPEN VIEW (Full Screen) ===
  if (activeApp) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Top Bar */}
        <div className="h-12 bg-[#f2f2f2] border-b border-gray-300 flex items-center px-4 justify-between shrink-0 shadow-sm z-20">
          <button 
            onClick={() => setActiveApp(null)}
            className="text-[#007AFF] font-medium text-base flex items-center gap-1 active:opacity-50"
          >
            ‹ Back
          </button>
          <span className="font-semibold text-black">{activeApp.name}</span>
          <div className="w-8"></div> 
        </div>

        {/* App Content */}
        <div className="flex-grow overflow-hidden relative bg-white">
           {activeApp.component}
        </div>
      </div>
    );
  }

  // === IPHONE HOME SCREEN ===
  return (
    <div className="h-screen w-screen bg-cover bg-center overflow-hidden flex flex-col justify-between pb-6 select-none" 
         style={{ backgroundImage: "url('https://www.ytechb.com/wp-content/uploads/2025/07/iOS-26-Wallpaper-Shadow-472x1024.webp')" }}>
      
      {/* iOS Status Bar */}
      <div className="h-12 w-full flex justify-between items-center px-6 text-white text-sm font-semibold pt-2 z-10">
         <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
         <div className="flex gap-2 items-center">
            <span className="text-xs">5G</span>
            <div className="w-6 h-3 border border-white rounded-sm relative">
                <div className="absolute top-0.5 left-0.5 bottom-0.5 right-1 bg-white"></div>
            </div>
         </div>
      </div>

      {/* Grid Apps */}
      <div className="flex-grow px-6 pt-6 grid grid-cols-4 content-start gap-y-6 gap-x-2">
        {apps.map((app) => (
          <div key={app.name} onClick={() => setActiveApp(app)} className="flex flex-col items-center gap-1 group">
            <div className="w-[80px] h-[80px] rounded-[14px] overflow-hidden shadow-lg active:scale-90 active:brightness-75 transition-transform duration-200">
            <img src={app.img} alt={app.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-md tracking-tight">{app.name}</span>
          </div>
        ))}
      </div>

      {/* Dock Area */}
      <div className="px-4 mb-2">
        <div className="bg-white/20 backdrop-blur-2xl rounded-[35px] py-4 px-2 flex justify-around items-center shadow-2xl border border-white/10">
           {dockApps.map((app) => (
             <div key={app.name} onClick={() => setActiveApp(app)} className="flex flex-col items-center">
                <div className="w-[80px] h-[80px] rounded-[14px] overflow-hidden shadow-lg active:scale-90 active:brightness-75 transition-transform duration-200">
                <img src={app.img} alt={app.name} className="w-full h-full object-cover" />
                </div>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
};

export default MobileLayout;
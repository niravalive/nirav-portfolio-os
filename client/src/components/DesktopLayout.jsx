import React, { useState } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import BootScreen from './BootScreen'; 

// Apps Import
import Finder from '../apps/Finder'; 
import Terminal from '../apps/Terminal'; 
import Safari from '../apps/Safari'; 
import Notes from '../apps/Notes';
import Music from '../apps/Music';
import Messages from '../apps/Messages';
import Activity from '../apps/Activity';
import QuickPortfolio from './QuickPortfolio'; // Import sahi hai
import Admin from '../apps/Admin';

const DesktopLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // 👇 1. YE MISSING THA (State banayi)
  const [showQuickResume, setShowQuickResume] = useState(false);

  // === 📍 FIXED POSITIONS ===
  const appConfig = {
    Finder:   { x: 150, y: 80  },
    Safari:   { x: 300, y: 120 },
    Terminal: { x: 450, y: 200 },
    Notes:    { x: 600, y: 100 },
    Music:    { x: 350, y: 250 },
    Messages: { x: 200, y: 300 },
    Activity: { x: 100, y: 150 },
    Trash:    { x: 500, y: 180 },
    Admin:    { x: 100, y: 50 }
  };

  const [openApps, setOpenApps] = useState({
    Finder: false, Terminal: false, Trash: false, Notes: false,
    Safari: false, Music: false, Messages: false, Activity: false, Admin: false
  });

  const [activeApp, setActiveApp] = useState(null);

  const toggleApp = (appName) => {
    setOpenApps((prev) => ({ ...prev, [appName]: !prev[appName] }));
    setActiveApp(appName);
  };

  const closeApp = (appName) => {
    setOpenApps((prev) => ({ ...prev, [appName]: false }));
  };

  // 👇 2. YE LOGIC MISSING THA (Resume se Chat kholne ka logic)
  const handleQuickContact = () => {
    setShowQuickResume(false); // Resume band karo
    if (!openApps.Messages) {
        setOpenApps((prev) => ({ ...prev, Messages: true })); // Messages open karo
    }
    setActiveApp('Messages'); // Messages ko front me lao
  };

  if (isLoading) return <BootScreen onComplete={() => setIsLoading(false)} />;

  return (
    <div className="h-screen w-screen bg-cover bg-center overflow-hidden flex flex-col relative animate-in fade-in duration-1000" 
         style={{ backgroundImage: "url('https://wallpapershome.com/images/pages/pic_h/12000.jpg')" }}>
      
      <MenuBar />

      {/* Main Content Area */}
      <main className="flex-grow relative z-0">
        
        {/* === 📄 RESUME SHORTCUT === */}
        <div 
          onClick={() => {
            window.open('/resume.pdf', '_blank');
          }}
          className="absolute top-16 right-6 flex flex-col items-center gap-1 w-20 cursor-pointer group z-0 hover:brightness-110"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/337/337946.png" 
            alt="Resume" 
            className="w-12 h-12 object-contain drop-shadow-lg"
          />
          <span className="text-white text-[11px] font-bold drop-shadow-md px-1.5 py-0.5 rounded group-hover:bg-[#007AFF] transition-colors truncate w-full text-center">
            resume.pdf
          </span>
        </div>

        {/* === ⚡️ QUICK LOOK (The "Save Time" Button) === */}
        <div 
          onClick={() => setShowQuickResume(true)}
          className="absolute top-40 right-6 flex flex-col items-center gap-1 w-20 cursor-pointer group z-0 hover:scale-105 transition-transform"
        >
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
             <span className="text-2xl">👨‍🍳</span>
          </div>
          <span className="text-white text-[10px] font-bold drop-shadow-md px-1.5 py-0.5 rounded group-hover:bg-[#007AFF] transition-colors text-center leading-tight">
            Click here <br/>to save time
          </span>
        </div>

        {/* === 🔒 ADMIN LOCK SHORTCUT === */}
        <div 
          onClick={() => toggleApp('Admin')}
          className="absolute bottom-24 right-6 flex flex-col items-center gap-1 w-20 cursor-pointer group z-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png" 
            alt="Admin" 
            className="w-10 h-10 object-contain drop-shadow-lg"
          />
          <span className="text-white text-[11px] font-bold drop-shadow-md px-1.5 py-0.5 rounded bg-black/20 group-hover:bg-red-600 transition-colors truncate w-full text-center">
            Admin Lock
          </span>
        </div>

        {/* 👇 3. YE DISPLAY LOGIC MISSING THA (Ab ye dikhega) */}
        {showQuickResume && (
            <QuickPortfolio 
                onClose={() => setShowQuickResume(false)} 
                onContact={handleQuickContact} 
            />
        )}


        {/* === APPS (Windows) === */}
        
        {openApps.Finder && (
          <Window title="Finder" onClose={() => closeApp('Finder')}
            zIndex={activeApp === 'Finder' ? 20 : 1} onClick={() => setActiveApp('Finder')}
            defaultPosition={appConfig.Finder} 
          > <Finder /> </Window>
        )}
        
        {openApps.Terminal && (
          <Window title="Terminal — -zsh" onClose={() => closeApp('Terminal')}
            zIndex={activeApp === 'Terminal' ? 20 : 1} onClick={() => setActiveApp('Terminal')}
            defaultPosition={appConfig.Terminal} 
          > <Terminal /> </Window>
        )}

        {openApps.Safari && (
          <Window title="Safari — Start Page" onClose={() => closeApp('Safari')}
            zIndex={activeApp === 'Safari' ? 20 : 1} onClick={() => setActiveApp('Safari')}
            defaultPosition={appConfig.Safari} 
          > <Safari /> </Window>
        )}

        {openApps.Trash && (
          <Window title="Trash" onClose={() => closeApp('Trash')}
            zIndex={activeApp === 'Trash' ? 20 : 1} onClick={() => setActiveApp('Trash')}
            defaultPosition={appConfig.Trash} 
          > 
             <div className="grid grid-cols-4 gap-4 p-4 text-white text-center">
                <div className="flex flex-col items-center"><span className="text-5xl">📄</span><span className="text-xs">uski yaadein.txt</span></div>
             </div>
          </Window>
        )}
        
        {openApps.Notes && (
          <Window title="Notes" onClose={() => closeApp('Notes')}
            zIndex={activeApp === 'Notes' ? 20 : 1} onClick={() => setActiveApp('Notes')}
            defaultPosition={appConfig.Notes} 
          > <Notes /> </Window>
        )}

        {openApps.Music && (
          <Window title="Apple Music" onClose={() => closeApp('Music')}
            zIndex={activeApp === 'Music' ? 20 : 1} onClick={() => setActiveApp('Music')}
            defaultPosition={appConfig.Music} 
          > <Music /> </Window>
        )}

        {openApps.Messages && (
          <Window title="Messages" onClose={() => closeApp('Messages')}
            zIndex={activeApp === 'Messages' ? 20 : 1} onClick={() => setActiveApp('Messages')}
            defaultPosition={appConfig.Messages} 
          > <Messages /> </Window>
        )}

        {openApps.Activity && (
          <Window title="Skill Monitor" onClose={() => closeApp('Activity')}
            zIndex={activeApp === 'Activity' ? 20 : 1} onClick={() => setActiveApp('Activity')}
            defaultPosition={appConfig.Activity} 
          > <Activity /> </Window>
        )}

        {openApps.Admin && (
        <Window title="Admin Panel — Restricted" onClose={() => closeApp('Admin')}
            zIndex={activeApp === 'Admin' ? 20 : 1} onClick={() => setActiveApp('Admin')}
            defaultPosition={appConfig.Admin} 
        > <Admin /> </Window>
        )}

      </main>
      
      <Dock onAppClick={toggleApp} />
    </div>
  );
};

export default DesktopLayout;
import React, { useState } from 'react';
// Sibling components (Same folder mein hain)
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import BootScreen from './BootScreen'; 

// Apps ek folder piche hain (../apps)
import Finder from '../apps/Finder'; 
import Terminal from '../apps/Terminal'; 
import Safari from '../apps/Safari'; 
import Notes from '../apps/Notes';
import Music from '../apps/Music';
import Messages from '../apps/Messages';
import Activity from '../apps/Activity';

const DesktopLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  // FIX: Yahan Finder aur Activity missing the, maine add kar diye
  const [openApps, setOpenApps] = useState({
    Finder: false,
    Terminal: false,
    Trash: false,
    Notes: false,
    Safari: false,
    Music: false,
    Messages: false,
    Activity: false 
  });

  const [activeApp, setActiveApp] = useState(null);

  const toggleApp = (appName) => {
    setOpenApps((prev) => ({
      ...prev,
      [appName]: !prev[appName] 
    }));
    setActiveApp(appName);
  };

  const closeApp = (appName) => {
    setOpenApps((prev) => ({ ...prev, [appName]: false }));
  };

  if (isLoading) {
    return <BootScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="h-screen w-screen bg-cover bg-center overflow-hidden flex flex-col relative animate-in fade-in duration-1000" 
         style={{ backgroundImage: "url('https://wallpapershome.com/images/pages/pic_h/12000.jpg')" }}>
      
      <MenuBar />

      <main className="flex-grow relative">

        {/* === FINDER === */}
        {openApps.Finder && (
          <Window 
            title="Finder" 
            onClose={() => closeApp('Finder')}
            zIndex={activeApp === 'Finder' ? 10 : 1}
            onClick={() => setActiveApp('Finder')}
          >
            <Finder />
          </Window>
        )}
        
        {/* === TERMINAL === */}
        {openApps.Terminal && (
          <Window 
            title="Terminal — -zsh" 
            onClose={() => closeApp('Terminal')}
            zIndex={activeApp === 'Terminal' ? 10 : 1}
            onClick={() => setActiveApp('Terminal')}
          >
            <Terminal />
          </Window>
        )}

        {/* === SAFARI === */}
        {openApps.Safari && (
          <Window 
            title="Safari — Start Page" 
            onClose={() => closeApp('Safari')}
            zIndex={activeApp === 'Safari' ? 10 : 1}
            onClick={() => setActiveApp('Safari')}
          >
            <Safari />
          </Window>
        )}

        {/* === TRASH === */}
        {openApps.Trash && (
          <Window 
            title="Trash" 
            onClose={() => closeApp('Trash')}
            zIndex={activeApp === 'Trash' ? 10 : 1}
            onClick={() => setActiveApp('Trash')}
          >
             <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-2 hover:bg-white/10 rounded cursor-pointer transition-colors">
                   <span className="text-5xl mb-2">📄</span>
                   <span className="text-xs text-center text-white truncate w-full">ex-ki-yaadein.txt</span>
                   <span className="text-[10px] text-gray-400">239.6 MB</span>
                </div>
             </div>
          </Window>
        )}
        
        {/* === NOTES === */}
        {openApps.Notes && (
          <Window 
            title="Notes" 
            onClose={() => closeApp('Notes')}
            zIndex={activeApp === 'Notes' ? 10 : 1}
            onClick={() => setActiveApp('Notes')}
          >
            <Notes />
          </Window>
        )}

        {/* === MUSIC PLAYER === */}
        {openApps.Music && (
          <Window 
            title="Music" 
            onClose={() => closeApp('Music')}
            zIndex={activeApp === 'Music' ? 10 : 1}
            onClick={() => setActiveApp('Music')}
          >
            <Music />
          </Window>
        )}

        {/* === MESSAGES (CONTACT) === */}
        {openApps.Messages && (
          <Window 
            title="Messages" 
            onClose={() => closeApp('Messages')}
            zIndex={activeApp === 'Messages' ? 10 : 1}
            onClick={() => setActiveApp('Messages')}
          >
            <Messages />
          </Window>
        )}

        {/* === ACTIVITY MONITOR === */}
        {openApps.Activity && (
          <Window 
            title="Activity Monitor" 
            onClose={() => closeApp('Activity')}
            zIndex={activeApp === 'Activity' ? 10 : 1}
            onClick={() => setActiveApp('Activity')}
          >
            <Activity />
          </Window>
        )}

      </main>

      <Dock onAppClick={toggleApp} />
      
    </div>
  );
};

export default DesktopLayout;
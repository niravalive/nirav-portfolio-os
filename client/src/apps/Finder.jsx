import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Finder = () => {
  const activeTab = 'downloads'; 
  const [showGuide, setShowGuide] = useState(false);

  // === 🖼️ ICONS DATA ===
  const sidebarIcons = {
    recents: "./public/finderIcons/clock.png",
    desktop: "./public/finderIcons/computer.png",
    documents: "./public/finderIcons/folder.png",
    downloads: "./public/finderIcons/download.png",
    applications: "./public/finderIcons/app-store.png",
    music: "./public/finderIcons/music-player.png",
    icloud: "./public/finderIcons/icloud.png",
    airdrop: "./public/finderIcons/airdrop.png",
  };

  const fileIcons = {
    pdf: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
    txt: "https://img.icons8.com/?size=100&id=12434&format=png&color=FFFFFF",
  };

  const handleFileClick = (file) => {
    if (file.type === 'resume') {
      window.open('/resume.pdf', '_blank');
    } else if (file.type === 'guide') {
      setShowGuide(true);
    }
  };

  // Files Data
  const files = {
    downloads: [
      { 
        name: "resume.pdf", 
        size: "1.2 MB", 
        kind: "PDF", 
        date: "Today", 
        img: fileIcons.pdf, 
        type: "resume" 
      },
      { 
        name: "Portfolio_Guide", 
        size: "4 KB", 
        kind: "-", 
        date: "Yesterday", 
        img: fileIcons.txt, 
        type: "guide" 
      },
    ]
  };

  // === GUIDE MODAL (Dark Glass Theme) ===
  const GuideModal = () => (
    <div 
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300 p-4"
      onClick={() => setShowGuide(false)}
    >
      <div 
        className="bg-[#1e1e1e]/90 backdrop-blur-2xl w-[700px] max-w-full max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/10 relative text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#1e1e1e]/80 backdrop-blur-md border-b border-white/5 p-6 flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-blue-500/30">
                    🗺️
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">System Guide</h2>
                    <p className="text-gray-400 text-xs font-medium">for dock applications</p>
                </div>
            </div>
            <button onClick={() => setShowGuide(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                { icon: "📂", title: "Finder", desc: "Download Resume & navigate assets." },
                { icon: "💻", title: "Terminal", desc: "Interactive shell for geeks." },
                { icon: "🌐", title: "Safari", desc: "Browse Projects." },
                { icon: "📈", title: "Activity", desc: "Skill & Proficiency monitor." },
                { icon: "🎵", title: "Music", desc: "Bagging for subsription." },
                { icon: "📝", title: "Notes", desc: "Simple Information" },
                { icon: "💬", title: "Messages", desc: "Contact me." },
                { icon: "🗑️", title: "Trash", desc: "The place for forgotten things." }
            ].map((item, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all cursor-default">
                    <span className="text-3xl mb-3 block">{item.icon}</span>
                    <h3 className="font-bold mb-1 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showGuide && ReactDOM.createPortal(<GuideModal />, document.body)}

      {/* === MAIN CONTAINER (Dark Glass Theme) === */}
      <div className="h-full flex bg-[#121212]/80 backdrop-blur-2xl w-full text-xs font-sans text-white select-none overflow-hidden rounded-lg border border-white/10 shadow-2xl">
        
        {/* === 1. SIDEBAR (Darker Glass) === */}
        <div className="w-48 bg-[#1a1a1a]/60 backdrop-blur-xl flex flex-col pt-4 border-r border-white/5">
            
            {/* Favorites Section */}
            <div className="px-3 mb-4 mt-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2 mb-2 block opacity-80">Favorites</span>
                <div className="space-y-1"> 
                    {['Recents', 'Desktop', 'Documents', 'Downloads', 'Applications', 'Music'].map(item => (
                        <div 
                            key={item}
                            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl cursor-default transition-all ${
                            item.toLowerCase() === 'downloads' 
                                ? 'bg-[#333]/90 text-white shadow-lg border border-white/5' // Active: Dark Pill
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <img src={sidebarIcons[item.toLowerCase()]} alt={item} className="w-4 h-4 object-contain opacity-80" />
                            <span className="text-[12px]">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Locations Section */}
            <div className="px-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2 mb-2 block opacity-80">Locations</span>
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-default text-gray-400 hover:bg-white/5 hover:text-white">
                        <img src={sidebarIcons.icloud} alt="iCloud" className="w-4 h-4 object-contain opacity-80" />
                        <span className="text-[12px]">iCloud Drive</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-default text-gray-400 hover:bg-white/5 hover:text-white">
                        <img src={sidebarIcons.airdrop} alt="AirDrop" className="w-4 h-4 object-contain opacity-80" />
                        <span className="text-[12px]">AirDrop</span>
                    </div>
                </div>
            </div>
        </div>

        {/* === 2. CONTENT AREA (Lighter Dark Glass) === */}
        <div className="flex-grow flex flex-col bg-[#1c1c1c]/40">
            
            {/* Top Toolbar */}
            <div className="h-12 flex items-center justify-between px-5 border-b border-white/5 bg-[#1c1c1c]/60">
                
                {/* Back/Forward & Title */}
                <div className="flex gap-4 items-center">
                    <div className="flex gap-1 text-gray-400">
                        <button className="hover:text-white transition">‹</button>
                        <button className="hover:text-white transition opacity-50">›</button>
                    </div>
                    <span className="font-bold text-sm tracking-wide text-gray-200 capitalize">{activeTab}</span>
                </div>

                {/* Search / View */}
                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-2 bg-[#2a2a2a] px-2 py-1 rounded-xl border border-white/10 text-gray-400 w-36 shadow-sm">
                        {/* Emoji hataya, Image lagayi 👇 */}
                        <img 
                            src="/finderIcons/search.png" 
                            alt="Search" 
                            className="w-3 h-3 opacity-50 object-contain" 
                        />
                        <span className="text-[11px]">Search</span>
                    </div>
                </div>
            </div>

            {/* File Table */}
            <div className="flex-grow overflow-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#1e1e1e]/80 backdrop-blur-md text-gray-400 text-[11px] font-semibold border-b border-white/5 z-10">
                        <tr>
                            <th className="py-2 pl-6 w-[45%] font-medium">Name</th>
                            <th className="py-2 w-[15%] font-medium">Size</th>
                            <th className="py-2 w-[20%] font-medium">Kind</th>
                            <th className="py-2 w-[20%] font-medium">Date Added</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-[13px]">
                    {files.downloads.map((file, idx) => (
                        <tr 
                            key={idx} 
                            onClick={() => handleFileClick(file)}
                            // Hover: Dark Blue Glass Effect
                            className="group cursor-pointer even:bg-white/5 hover:bg-[#007AFF]/20 transition-all border-b border-transparent hover:border-[#007AFF]/30"
                        >
                            <td className="py-2 pl-6 flex items-center gap-3">
                                <img src={file.img} alt="icon" className="w-5 h-5 object-contain" />
                                <span className="truncate max-w-[250px] font-medium text-gray-200">{file.name}</span>
                            </td>
                            <td className="py-2 text-gray-500 group-hover:text-blue-200">{file.size}</td>
                            <td className="py-2 text-gray-500 group-hover:text-blue-200">{file.kind}</td>
                            <td className="py-2 text-gray-500 group-hover:text-blue-200">{file.date}</td>
                        </tr>
                    ))}
                    {/* Filler Rows */}
                    {[...Array(6)].map((_, i) => (
                        <tr key={`empty-${i}`} className="even:bg-white/5 h-8 border-b border-transparent"><td colSpan="4"></td></tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Path Bar */}
            <div className="h-7 border-t border-white/5 bg-[#1a1a1a]/80 flex items-center px-4 gap-2 text-[11px] text-gray-500 font-medium">
                <img src="https://cdn-icons-png.flaticon.com/512/3082/3082008.png" className="w-3 h-3 opacity-50 grayscale" alt="disk"/>
                <span className="opacity-60">Macintosh HD</span><span className="opacity-40">›</span>
                <span className="opacity-60">Users</span><span className="opacity-40">›</span>
                <span className="opacity-60">nirav</span><span className="opacity-40">›</span>
                <span className="text-gray-300 font-semibold capitalize">{activeTab}</span>
            </div>
        </div>
      </div>
    </>
  );
};

export default Finder;
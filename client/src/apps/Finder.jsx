import React, { useState } from 'react';

const Finder = () => {
  const [activeTab, setActiveTab] = useState('downloads');

  // File Data (Screenshot jaisa real data)
  const files = {
    downloads: [
      { name: "Screenshot 2025-12-26 at 11.22.03.png", size: "663 KB", kind: "PNG image", date: "26 Dec 2025" },
      { name: "GafurRingtone.mp3", size: "907 KB", kind: "MP3 audio", date: "24 Dec 2025" },
      { name: "MyTracker 2.0.apk", size: "8.5 MB", kind: "Document", date: "23 Dec 2025" },
      { name: "project_raktsetu_final.zip", size: "120 MB", kind: "ZIP archive", date: "20 Dec 2025" },
      { name: "client_feedback.pdf", size: "2.4 MB", kind: "PDF Document", date: "18 Dec 2025" },
      { name: "resume_nirav_v2.pdf", size: "1.2 MB", kind: "PDF Document", date: "15 Dec 2025" },
    ],
    desktop: [
      { name: "Portfolio Folder", size: "--", kind: "Folder", date: "Today" },
      { name: "todo_list.txt", size: "2 KB", kind: "Text File", date: "Yesterday" },
    ],
    documents: [
      { name: "Invoice_#1023.pdf", size: "450 KB", kind: "PDF Document", date: "10 Dec 2025" },
      { name: "College_Project_Report.docx", size: "15 MB", kind: "Word Doc", date: "01 Dec 2025" },
    ],
    applications: [
      { name: "Visual Studio Code", size: "500 MB", kind: "Application", date: "Nov 2025" },
      { name: "Spotify", size: "180 MB", kind: "Application", date: "Oct 2025" },
    ]
  };

  return (
    <div className="h-full flex bg-[#1e1e1e] w-full text-xs font-sans text-white select-none overflow-hidden rounded-lg">
      
      {/* 1. Sidebar (Darker Grey) */}
      <div className="w-48 bg-[#2d2d2d]/50 backdrop-blur-xl flex flex-col pt-4 border-r border-white/10">
        
        {/* Sidebar Groups */}
        <div className="px-4 mb-4">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-2">Favorites</span>
           <div className="mt-2 space-y-0.5">
              {['Recents', 'Desktop', 'Documents', 'Downloads', 'Applications', 'Music'].map(item => (
                 <div 
                    key={item}
                    onClick={() => setActiveTab(item.toLowerCase())}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                       activeTab === item.toLowerCase() ? 'bg-[#007AFF] text-white' : 'text-gray-300 hover:bg-white/10'
                    }`}
                 >
                    <span className={`text-lg ${activeTab === item.toLowerCase() ? 'text-white' : 'text-[#007AFF]'}`}>
                       {item === 'Downloads' ? '⬇️' : item === 'Desktop' ? '🖥️' : item === 'Documents' ? '📄' : item === 'Music' ? '🎵' : item === 'Recents' ? '🕒' : '🚀'}
                    </span>
                    <span className="font-medium">{item}</span>
                 </div>
              ))}
           </div>
        </div>

        <div className="px-4">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-2">Locations</span>
           <div className="mt-2 space-y-0.5">
               <div className="flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer text-gray-300 hover:bg-white/10">
                  <span className="text-lg text-gray-400">☁️</span>
                  <span>iCloud Drive</span>
               </div>
               <div className="flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer text-gray-300 hover:bg-white/10">
                  <span className="text-lg text-gray-400">📡</span>
                  <span>AirDrop</span>
               </div>
           </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-grow flex flex-col bg-[#1c1c1c]">
        
        {/* Top Bar (Title & View Options) */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-white/10">
            <div className="flex gap-4 items-center">
               <div className="flex gap-4 text-gray-500">
                  <button className="hover:text-white">{'<'}</button>
                  <button className="hover:text-white">{'>'}</button>
               </div>
               <span className="font-bold text-sm capitalize">{activeTab}</span>
            </div>
            
            <div className="flex gap-3 text-gray-400">
               <span className="hover:text-white cursor-pointer">🔍</span>
               <div className="flex bg-[#3a3a3a] rounded-md p-0.5 gap-1">
                   <button className="p-1 hover:bg-white/20 rounded">▦</button>
                   <button className="p-1 bg-white/20 text-white rounded">☰</button> {/* List view active */}
                   <button className="p-1 hover:bg-white/20 rounded">|||</button>
               </div>
            </div>
        </div>

        {/* File List Table */}
        <div className="flex-grow overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#1c1c1c] text-gray-400 text-[11px] font-medium border-b border-white/10">
                    <tr>
                        <th className="py-2 pl-4 w-[40%]">Name</th>
                        <th className="py-2 w-[15%]">Size</th>
                        <th className="py-2 w-[20%]">Kind</th>
                        <th className="py-2 w-[20%]">Date Added</th>
                    </tr>
                </thead>
                <tbody className="text-gray-300 text-[12px]">
                   {(files[activeTab] || []).map((file, idx) => (
                      <tr key={idx} className="hover:bg-[#007AFF]/20 cursor-default odd:bg-white/5 even:bg-transparent">
                         <td className="py-1.5 pl-4 flex items-center gap-2">
                            <span className="text-base">
                                {file.kind.includes("image") ? '🖼️' : file.kind.includes("audio") ? '🎵' : file.kind.includes("Folder") ? '📂' : '📄'}
                            </span>
                            <span className="truncate max-w-[200px]">{file.name}</span>
                         </td>
                         <td className="py-1.5 text-gray-500">{file.size}</td>
                         <td className="py-1.5 text-gray-500">{file.kind}</td>
                         <td className="py-1.5 text-gray-500">{file.date}</td>
                      </tr>
                   ))}
                </tbody>
            </table>
            
            {(!files[activeTab]) && (
               <div className="flex items-center justify-center h-full text-gray-500">
                  Folder is empty
               </div>
            )}
        </div>

        {/* Bottom Breadcrumbs */}
        <div className="h-6 border-t border-white/10 bg-[#2d2d2d] flex items-center px-3 gap-2 text-[10px] text-gray-400">
           <span className="opacity-60">Macintosh HD</span>
           <span>›</span>
           <span className="opacity-60">Users</span>
           <span>›</span>
           <span className="opacity-60">nirav</span>
           <span>›</span>
           <span className="text-white">{activeTab}</span>
           <span className="ml-auto opacity-50">{(files[activeTab] || []).length} items</span>
        </div>

      </div>
    </div>
  );
};

export default Finder;
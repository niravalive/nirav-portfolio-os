import React, { useState } from 'react';

const Notes = () => {
  const [activeNote, setActiveNote] = useState('resume');

  // Tera Content Database
  const notesData = {
    resume: {
      title: "My Resume",
      date: "Today",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Nirav Chaudhari</h2>
          <p className="text-gray-400">MERN Stack Developer | Surat, India</p>
          
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-yellow-400 font-bold uppercase text-sm mb-2">Summary</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Bold, curious, and future-focused developer. I explore, learn, and implement.
              Currently focused on scaling applications and mastering Full Stack Development.
              Also, a passionate musician (Stream 'Fallen' now!).
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-yellow-400 font-bold uppercase text-sm mb-2">Education</h3>
            <ul className="list-disc list-inside text-sm text-gray-300">
              <li>Information & Network Security (Current)</li>
              <li>Relevant Coursework: React, Node.js, Python</li>
            </ul>
          </div>
        </div>
      )
    },
    raktsetu: {
      title: "Project: RaktSetu",
      date: "Active",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#B22222]">RaktSetu — A Bridge of Hope</h2>
          <p className="text-gray-400 text-sm">Design Philosophy: Professional & Urgent</p>
          
          <div className="bg-[#333] p-3 rounded-lg border-l-4 border-[#B22222]">
            <p className="text-white text-sm">
              "Connecting blood donors with those in need seamlessly."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
             <div className="bg-white/5 p-2 rounded text-center">
                <span className="block text-xs text-gray-500">Primary Color</span>
                <span className="text-[#B22222] font-bold">Deep Red</span>
             </div>
             <div className="bg-white/5 p-2 rounded text-center">
                <span className="block text-xs text-gray-500">Status</span>
                <span className="text-green-400 font-bold">In Development</span>
             </div>
          </div>
        </div>
      )
    },
    skills: {
      title: "Tech Stack",
      date: "Updated",
      content: (
        <div className="space-y-6">
           <div>
             <h3 className="text-blue-400 font-bold mb-2">Frontend</h3>
             <div className="flex flex-wrap gap-2">
                {['React.js', 'Tailwind CSS', 'Framer Motion', 'Vite'].map(s => (
                    <span key={s} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30">{s}</span>
                ))}
             </div>
           </div>
           <div>
             <h3 className="text-green-400 font-bold mb-2">Backend</h3>
             <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express', 'MongoDB', 'REST APIs'].map(s => (
                    <span key={s} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs border border-green-500/30">{s}</span>
                ))}
             </div>
           </div>
        </div>
      )
    }
  };

  return (
    <div className="h-full flex bg-[#1e1e1e] text-white w-full">
      
      {/* 1. Sidebar (List of Notes) */}
      <div className="w-1/3 bg-[#2d2d2d]/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Search Bar */}
        <div className="p-3">
            <input type="text" placeholder="Search" className="w-full bg-[#1c1c1c] text-sm text-white px-3 py-1 rounded-md outline-none border border-transparent focus:border-yellow-600 transition-colors placeholder-gray-500" />
        </div>
        
        {/* Notes List */}
        <div className="flex-grow overflow-auto">
            {Object.keys(notesData).map((key) => (
                <div 
                    key={key}
                    onClick={() => setActiveNote(key)}
                    className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${activeNote === key ? 'bg-[#dda63b] text-black' : ''}`}
                >
                    <h4 className={`font-bold text-sm ${activeNote === key ? 'text-black' : 'text-white'}`}>
                        {notesData[key].title}
                    </h4>
                    <div className="flex gap-2 text-[10px] mt-1 opacity-70">
                        <span>{notesData[key].date}</span>
                        <span className="truncate">No additional text</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="w-2/3 flex flex-col h-full bg-[#1c1c1c]">
        <div className="p-8 overflow-auto h-full">
            <div className="max-w-2xl mx-auto">
                <span className="text-gray-500 text-xs mb-4 block text-center">
                    {new Date().toLocaleString()}
                </span>
                {notesData[activeNote].content}
            </div>
        </div>
      </div>

    </div>
  );
};

export default Notes;
import React from 'react';

const QuickPortfolio = ({ onClose, onContact }) => {
  // Social Links Handlers
  const openLink = (url) => window.open(url, '_blank');

  return (
    // 1. BACKDROP
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
    >
      
      {/* 2. MAIN CARD */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-[90%] md:w-[85%] h-[85%] bg-[#F2F2F7]/90 backdrop-blur-3xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-white/50 animate-in zoom-in-95 duration-300 relative"
      >
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 bg-gray-200/80 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold transition z-20 text-sm"
        >
            ✕
        </button>

        {/* === SCROLLABLE CONTENT === */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10 no-scrollbar">
            
            {/* === HEADER SECTION (UPDATED) === */}
            {/* Ab yahan 'justify-between' use kiya hai taaki Socials Right me chale jayein */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative">
                
                {/* Left Side: Profile & Name */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img 
                        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/man-icon-svg-download-png-8351129.png?f=webp&w=512" 
                        className="w-28 h-28 rounded-full object-cover shadow-xl border-4 border-white"
                        alt="Profile"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">Nirav Chaudhari</h1>
                        <p className="text-base text-gray-500 font-medium mt-1">Full Stack Web Developer (MERN Stack)</p>
                        <div className="flex gap-2 justify-center md:justify-start mt-3">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Available</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Surat, IN</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Social Icons (New) */}
                <div className="flex gap-3 md:pr-12"> {/* pr-12 taaki close button ke niche na dab jaye */}
                    
                    {/* LinkedIn */}
                    <button 
                        onClick={() => openLink('https://www.linkedin.com/in/nirav-chaudhari-067b22375/')} 
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0077b5] hover:scale-110 hover:shadow-md transition border border-gray-100"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </button>

                    {/* GitHub */}
                    <button 
                        onClick={() => openLink('https://github.com/niravalive')} // 
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-800 hover:scale-110 hover:shadow-md transition border border-gray-100"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </button>

                    {/* Instagram */}
                    <button 
                        onClick={() => openLink('https://www.instagram.com/niravalive')} 
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#E1306C] hover:scale-110 hover:shadow-md transition border border-gray-100"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </button>
                    
                </div>
            </div>

            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* 1. About Me */}
                <div className="col-span-1 md:col-span-2 bg-white rounded-[24px] p-6 shadow-sm hover:shadow-md transition border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">About Me</h2>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        I build things that live on the internet. Whether it's a complex web app, a creative music project, or automating boring tasks—I'm all in. 
                        My approach is bold, experimental, and always user-focused. I blend Code with Creativity.
                    </p>
                </div>

                {/* 2. Quick Chat (CTA) */}
                <div className="col-span-1 bg-gradient-to-br from-[#007AFF] to-[#0055b3] rounded-[24px] p-6 shadow-lg text-white flex flex-col justify-between items-start hover:scale-[1.02] transition cursor-pointer"
                     onClick={onContact}>
                    <div>
                        <h2 className="text-xl font-bold mb-1">Let's Talk?</h2>
                        <p className="text-blue-100 text-sm">Recruiting? Let's discuss.</p>
                    </div>
                    <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-full font-bold text-s shadow-md w-full hover:bg-gray-50 transition">
                        Message Me 
                    </button>
                </div>

                {/* === NEW ROW: DETAILS === */}

                {/* 3. Contact Details */}
                <div className="col-span-1 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
                    <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Info</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm">📧</div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                                <p className="text-[14px] font-bold text-gray-800 break-all">niravonwork@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">📞</div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p>
                                <p className="text-[14px] font-bold text-gray-800">+91 76229 62751</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm">📍</div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Location</p>
                                <p className="text-[14px] font-bold text-gray-800">Surat, Gujarat</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Languages */}
                <div className="col-span-1 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
                    <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Languages</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                            <span className="text-sm font-bold text-gray-800">English</span>
                            <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Fluent</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                            <span className="text-sm font-bold text-gray-800">Hindi</span>
                            <span className="text-[12px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Native</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-800">Gujarati</span>
                            <span className="text-[12px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Native</span>
                        </div>
                    </div>
                </div>

                {/* 5. Education */}
                <div className="col-span-1 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
                     <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Education</h2>
                     <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-1 bg-gray-200 rounded-full h-full"></div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">Computer Engineering</div>
                                <div className="text-xs text-gray-500 font-medium">Bhagwan Mahavir</div>
                                <div className="text-[10px] text-gray-400 font-bold mt-0.5">2023 - 2026</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-1 bg-gray-200 rounded-full h-full"></div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">HSC Science</div>
                                <div className="text-xs text-gray-500 font-medium">GSEB Board</div>
                                <div className="text-[10px] text-gray-400 font-bold mt-0.5">2023</div>
                            </div>
                        </div>
                     </div>
                </div>

                {/* 6. Tech Stack (Clean Pills) */}
                <div className="col-span-1 md:col-span-3 bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                    <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Tech Arsenal</h2>
                    <div className="flex flex-wrap gap-2">
                        {["React.js", "Firebase", "Node.js", "Tailwind CSS", "Python", "HTML 5/CSS 3", "Framer Motion", "DSA"].map(skill => (
                            <span key={skill} className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-[13px] font-bold border border-gray-200 transition cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 7. Projects (Medium Cards) */}
                <div className="col-span-1 md:col-span-3 bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                     <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Featured Projects</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-300 transition cursor-pointer">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-xl shadow-sm">🎵</div>
                            <div>
                                <h3 className="font-bold text-sm text-gray-900">Fallen (Music)</h3>
                                <p className="text-xs text-gray-600 mt-0.5 font-medium">Composed & Produced original track available on platforms.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-300 transition cursor-pointer">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl shadow-sm">🏥</div>
                            <div>
                                <h3 className="font-bold text-sm text-gray-900">RaktSetu</h3>
                                <p className="text-xs text-gray-600 mt-0.5 font-medium">A bridge for hope. Connecting blood donors with those in need.</p>
                            </div>
                        </div>
                     </div>
                </div>

            </div>

            {/* Footer */}
            <div className="mt-8 mb-4 text-center">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Nirav OS • Portfolio v2.0
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default QuickPortfolio;
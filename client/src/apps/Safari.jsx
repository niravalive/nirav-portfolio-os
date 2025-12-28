import React, { useState } from 'react';

const Safari = () => {
  const [url, setUrl] = useState('nirav-portfolio.com');
  const [showMeme, setShowMeme] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white w-full relative">
      
      {/* 1. Safari Toolbar */}
      <div className="h-12 bg-[#f1f1f1] border-b border-[#d1d1d1] flex items-center px-4 gap-4 shrink-0 z-20">
        <div className="flex gap-4 text-gray-500">
          <button className="hover:text-black"><svg width="10" height="16" viewBox="0 0 12 20" fill="currentColor"><path d="M10 2L2 10L10 18" stroke="currentColor" strokeWidth="2" fill="none"/></svg></button>
          <button className="hover:text-black"><svg width="10" height="16" viewBox="0 0 12 20" fill="currentColor"><path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2" fill="none"/></svg></button>
        </div>

        <span className="text-gray-500">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M7 0L14 3V7C14 11.5 7 16 7 16C7 16 0 11.5 0 7V3L7 0Z" fill="gray"/></svg>
        </span>

        {/* Address Input (THE TRAP) */}
        <div className="flex-grow flex justify-center">
            <input 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                // JAADU YAHAN HAI: Click karte hi Meme aayega
                onFocus={() => setShowMeme(true)}
                className="bg-[#e3e3e3] rounded-lg px-3 py-1 w-[80%] text-center text-xs font-medium text-black/70 outline-none focus:bg-white border border-transparent focus:border-blue-400 transition-all"
            />
        </div>

        <div className="flex gap-4 text-gray-500">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </div>
      </div>

      {/* 2. Main Content vs MEME Overlay */}
      <div className="flex-grow relative overflow-hidden bg-gray-50" onClick={() => setShowMeme(false)}>
        
        {/* === MEME OVERLAY === */}
        {showMeme && (
            <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center animate-in fade-in duration-200">
                <img 
                    src="https://img-cdn.inc.com/image/upload/f_webp,q_auto,c_fit/images/panoramic/getty_1055500818_386933.jpg" 
                    alt="Tim Cook" 
                    className="w-64 rounded-xl shadow-2xl mb-4"
                />
                <h2 className="text-white text-2xl font-bold">"Not happening, buddy."</h2>
                <p className="text-gray-400 mt-2">Sirf Nirav ka portfolio dekhne ki permission hai.</p>
                <button 
                    onClick={() => setShowMeme(false)}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                    Sorry Tim 😔
                </button>
            </div>
        )}

        {/* === ASLI WEBSITE CONTENT === */}
        <div className={`h-full w-full p-8 flex flex-col items-center overflow-auto ${showMeme ? 'blur-sm grayscale' : ''}`}>
            <div className="max-w-2xl text-center mt-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My Digital Space</h1>
                <p className="text-gray-600 mb-8 text-lg">
                    I build apps, hack systems (legally 😉), and create music.
                    <br /> Currently working on <span className="text-red-600 font-bold">RaktSetu</span>.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-10 text-left">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                        <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-2xl mb-4">🩸</div>
                        <h3 className="font-bold text-gray-800">RaktSetu</h3>
                        <p className="text-xs text-gray-500 mt-2">Connecting blood donors seamlessly.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl mb-4">🎵</div>
                        <h3 className="font-bold text-gray-800">Music Production</h3>
                        <p className="text-xs text-gray-500 mt-2">Listen to "Fallen" & my latest beats.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Safari;
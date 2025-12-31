import React from 'react';

const Music = () => {
  return (
    <div className="h-full w-full relative overflow-hidden select-none font-sans bg-black">
      
      {/* === 1. BACKGROUND LAYER (Fake Content) === */}
      {/* Ye dikhayega ki piche kuch hai (Album Arts) par blur hai */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="grid grid-cols-3 gap-2 p-2 h-full w-full transform scale-110">
            {/* Fake Album Covers (Red/Dark Theme) */}
            <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1621360841013-c768371e93cf?w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1621360841013-c768371e93cf?w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
            
        </div>
      </div>

      {/* === 2. RED BLUR OVERLAY === */}
      {/* Ye heavy blur aur Red Tint add karega */}
      <div className="absolute inset-0 z-0 bg-[#fa233b]/40 backdrop-blur-xl"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>


      {/* === 3. FOREGROUND POP-UP (Apple Style) === */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-6 animate-in zoom-in-95 duration-500">
        
        {/* Glass Card */}
        <div className="bg-gray-900/40 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl border border-white/10 w-full max-w-[280px] text-center flex flex-col items-center relative overflow-hidden">
            
            {/* Glossy Reflection Effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

            {/* Apple Music Icon */}
            <div className="w-16 h-16 bg-[#fa233b] rounded-xl shadow-lg flex items-center justify-center mb-5 relative z-10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
            </div>

            {/* Title */}
            <h2 className="text-white text-xl font-bold tracking-tight mb-2 relative z-10">
                Subscription Ended
            </h2>

            {/* The Message */}
            <p className="text-white/80 font-medium text-sm leading-relaxed italic relative z-10">
                "I love music, plz someone give me subscription."
            </p>

        </div>
      </div>

    </div>
  );
};

export default Music;
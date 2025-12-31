import React, { useState, useEffect } from 'react';

const Activity = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  // Sirf ek simple trigger state animation start karne ke liye
  const [animate, setAnimate] = useState(false);

  // === 💾 SKILL DATA ===
  const skillsData = {
    Frontend: [
      { name: "React.js", percent: 80, exp: "Learning" },
      { name: "Tailwind CSS", percent: 90, exp: "Learning" },
      { name: "JavaScript (ES6+)", percent: 85, exp: "Learning" },
      { name: "Framer Motion", percent: 85, exp: "Learning" },
      { name: "HTML5 / CSS3", percent: 95, exp: "2 Yrs" },
    ],
    Backend: [
      { name: "Node.js", percent: 80, exp: "Learning" },
      { name: "Express.js", percent: 80, exp: "Learning" },
      { name: "MongoDB", percent: 85, exp: "Learning" },
      { name: "Python", percent: 75, exp: "Learning" },
      { name: "REST APIs", percent: 90, exp: "Learning" },
    ],
    Creative: [
      { name: "Video Editing", percent: 99, exp: "3 Yrs" },
      { name: "Music Production", percent: 80, exp: "Keep Going" },
      { name: "Graphic Design", percent: 80, exp: "-" },
      { name: "Cybersecurity", percent: 60, exp: "Learning" },
    ]
  };

  const themes = {
    Frontend: { 
      text: 'text-blue-600', 
      gradient: 'from-blue-600 to-cyan-400', 
      shadow: 'hover:shadow-blue-200/50',
      border: 'hover:border-blue-200'
    },
    Backend: { 
      text: 'text-emerald-600', 
      gradient: 'from-emerald-600 to-teal-400', 
      shadow: 'hover:shadow-emerald-200/50',
      border: 'hover:border-emerald-200'
    },
    Creative: { 
      text: 'text-purple-600', 
      gradient: 'from-purple-600 to-pink-500', 
      shadow: 'hover:shadow-purple-200/50',
      border: 'hover:border-purple-200'
    },
  };

  const currentTheme = themes[activeTab];

  // Logic: Jab Tab change ho, animate ko reset karo fir turant true karo
  useEffect(() => {
    setAnimate(false);
    // 50ms ka micro-delay taaki React render kar sake (Smoothness hack)
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="h-full flex flex-col bg-[#F5F5F7] w-full text-xs font-sans select-none overflow-hidden">
      
      {/* 1. Header & Pill Tabs */}
      <div className="pt-6 pb-4 px-6 bg-[#F5F5F7] shrink-0 z-20">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Skills & Stats</h2>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-white shadow-sm border border-gray-100 ${currentTheme.text}`}>
              {skillsData[activeTab].length} Skills
            </span>
        </div>

        {/* Pill Tabs */}
        <div className="bg-gray-200/80 p-1 rounded-full flex relative shadow-inner">
            {['Frontend', 'Backend', 'Creative'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-full text-[11px] font-bold transition-all duration-300 relative z-10 ${
                        activeTab === tab 
                        ? 'bg-white text-gray-900 shadow-md scale-100' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {/* 2. Grid Content (Cards Stable Rahenge) */}
      <div className="flex-grow px-6 pb-6 overflow-hidden">
        {/* Removed 'animate-in slide-in' from grid */}
        <div className="grid grid-cols-2 gap-4 h-full content-start">
            
            {skillsData[activeTab].map((skill, idx) => (
                <div 
                    key={idx}
                    className={`group bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${currentTheme.shadow} ${currentTheme.border}`}
                >
                    <div className="flex items-end justify-between mb-3">
                        <h3 className="text-[13px] font-bold text-gray-700 tracking-tight leading-none group-hover:text-black transition-colors">
                            {skill.name}
                        </h3>
                        <span className={`text-sm font-extrabold ${currentTheme.text} leading-none`}>
                            {skill.percent}%
                        </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden relative mb-2 shadow-inner">
                        {/* 👇 SMOOTH BAR LOGIC:
                            - width 0 se start hoga.
                            - 'duration-1000' (1 second) me fill hoga.
                            - 'ease-out' natural feel dega.
                        */}
                        <div 
                            style={{ width: animate ? `${skill.percent}%` : '0%' }} 
                            className={`h-full rounded-full bg-gradient-to-r ${currentTheme.gradient} shadow-sm transition-all duration-1000 ease-out`}
                        >
                            {/* Subtle Shine */}
                            <div className="w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-1">
                       <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Experience</span>
                       <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md group-hover:bg-gray-100 transition-colors border border-gray-100">
                           {skill.exp}
                       </span>
                    </div>
                </div>
            ))}

        </div>
      </div>

    </div>
  );
};

export default Activity;
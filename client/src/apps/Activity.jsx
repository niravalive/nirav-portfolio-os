import React, { useState, useEffect } from 'react';

const Activity = () => {
  // Fake "Brain Usage" stats
  const [brainLoad, setBrainLoad] = useState(65);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setBrainLoad(Math.floor(Math.random() * (90 - 60 + 1) + 60)); // 60-90% active range
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // YAHAN TERI SKILLS HAIN
  const skills = [
    { name: "React.js", prof: "95%", exp: "2.5 Yrs", category: "Frontend" },
    { name: "Tailwind CSS", prof: "98%", exp: "2 Yrs", category: "Design" },
    { name: "Node.js (Backend)", prof: "85%", exp: "1.5 Yrs", category: "Backend" },
    { name: "Express.js", prof: "88%", exp: "1.5 Yrs", category: "Backend" },
    { name: "MongoDB", prof: "82%", exp: "1 Yr", category: "Database" },
    { name: "Python", prof: "75%", exp: "3 Yrs", category: "Scripting" },
    { name: "Video Editing", prof: "90%", exp: "4 Yrs", category: "Creative" },
    { name: "Music Production", prof: "80%", exp: "2 Yrs", category: "Creative" },
    { name: "Cybersecurity", prof: "60%", exp: "Learning", category: "Security" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-white w-full text-xs font-mono">
      
      {/* Header Toolbar */}
      <div className="h-10 bg-[#2d2d2d] border-b border-black flex items-center px-4 gap-4">
        <div className="flex gap-1 bg-[#1e1e1e] p-1 rounded-md">
            <button className="bg-gray-600 px-3 py-0.5 rounded text-white shadow-sm">Proficiency</button>
            <button className="px-3 py-0.5 text-gray-400 hover:text-white">Experience</button>
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-gray-400">Status: Hired & Working</span>
        </div>
      </div>

      {/* Graphs Area */}
      <div className="h-28 bg-[#181818] border-b border-gray-700 flex p-4 gap-4">
         {/* Graph 1: Brain Load */}
         <div className="flex-1 bg-black/50 rounded border border-gray-700 p-2 flex flex-col justify-end relative overflow-hidden group">
             <span className="absolute top-1 left-2 font-bold text-gray-500 group-hover:text-blue-400 transition-colors">Total Skill Capacity</span>
             <span className="absolute top-1 right-2 font-bold text-blue-400 text-lg">{brainLoad}%</span>
             
             {/* Dynamic Bars */}
             <div className="flex items-end gap-0.5 h-full pt-6 opacity-80">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="flex-1 bg-blue-500 rounded-t-sm transition-all duration-500" 
                         style={{ height: `${Math.random() * brainLoad}%` }}></div>
                ))}
             </div>
         </div>

         {/* Graph 2: Experience Bar */}
         <div className="flex-1 bg-black/50 rounded border border-gray-700 p-2 flex flex-col justify-center relative">
             <span className="absolute top-1 left-2 font-bold text-gray-500">Learning Curve</span>
             <div className="w-full flex items-center justify-between px-2 mt-2">
                <span className="text-xs text-gray-400">Beginner</span>
                <span className="text-xs text-green-400 font-bold">Pro</span>
             </div>
             <div className="w-full bg-gray-800 h-3 rounded-full mt-1 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full w-[85%] animate-[pulse_2s_infinite]"></div>
             </div>
         </div>
      </div>

      {/* Skills Table */}
      <div className="flex-grow overflow-auto bg-[#1e1e1e]">
        <table className="w-full text-left border-collapse">
            <thead className="bg-[#2d2d2d] sticky top-0 z-10 shadow-sm">
                <tr>
                    <th className="py-1.5 px-4 font-normal text-gray-400 border-r border-gray-700">Skill Name</th>
                    <th className="py-1.5 px-4 font-normal text-gray-400 border-r border-gray-700 w-24">% Prof.</th>
                    <th className="py-1.5 px-4 font-normal text-gray-400 border-r border-gray-700 w-24">Experience</th>
                    <th className="py-1.5 px-4 font-normal text-gray-400">Category</th>
                </tr>
            </thead>
            <tbody>
                {skills.map((skill, idx) => (
                    <tr key={idx} className="hover:bg-[#007AFF]/30 cursor-default border-b border-gray-800 transition-colors">
                        <td className="py-1.5 px-4 flex items-center gap-2">
                             {/* Auto Icons based on category */}
                            <span>{skill.category === 'Frontend' ? '🎨' : skill.category === 'Backend' ? '⚙️' : skill.category === 'Database' ? '🗄️' : '🧠'}</span>
                            {skill.name}
                        </td>
                        <td className="py-1.5 px-4 font-bold text-green-400">{skill.prof}</td>
                        <td className="py-1.5 px-4 text-gray-300">{skill.exp}</td>
                        <td className="py-1.5 px-4 text-gray-500 italic">{skill.category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

    </div>
  );
};

export default Activity;
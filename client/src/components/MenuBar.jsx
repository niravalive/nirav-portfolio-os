import React, { useState, useEffect } from 'react';

const MenuBar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 w-full h-7 bg-black/10 backdrop-blur-xl flex items-center justify-between px-4 text-[13px] text-white z-[1000] border-b border-white/10">
      <div className="flex items-center gap-5">
        <span className="font-bold text-lg leading-none mt-[-2px]"></span>
        <span className="font-bold">Finder</span>
        {/* Tere blueprint ke options */}
        <span className="hidden md:block opacity-90 font-medium">File</span>
        <span className="hidden md:block opacity-90 font-medium">Edit</span>
        <span className="hidden md:block opacity-90 font-medium">View</span>
        <span className="hidden md:block opacity-90 font-medium">Go</span>
      </div>
      <div className="flex items-center gap-4 font-medium">
        <span>{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        <span>{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default MenuBar;
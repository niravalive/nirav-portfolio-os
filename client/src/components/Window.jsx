import React, { useRef } from 'react';
import Draggable from 'react-draggable';

// 👇 Yahan 'defaultPosition' prop add kiya
const Window = ({ title, children, onClose, zIndex, onClick, defaultPosition }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".window-header" 
      // 👇 IMPORTANT: Agar position mili to wahan khulega, nahi to 0,0 pe
      defaultPosition={defaultPosition || {x: 0, y: 0}}
    >
      {/* 👇 CSS Change: 'top-10 left-2' hata ke 'top-0 left-0' kiya hai.
         Kyunki agar hum position control kar rahe hain, to CSS se offset nahi dena chahiye.
      */}
      <div 
        ref={nodeRef}
        onClick={onClick}
        style={{ zIndex: zIndex }}
        className="absolute top-0 left-0 
                   w-[95%] h-[60%] md:w-[700px] md:h-[500px] 
                   bg-[#1e1e1e]/95 backdrop-blur-2xl border border-white/10 
                   rounded-xl shadow-2xl flex flex-col overflow-hidden animate-[pop_0.2s_ease-out]"
      >
        
        {/* Header */}
        <div className="window-header h-9 bg-[#2d2d2d] flex items-center px-4 border-b border-black/50 select-none cursor-grab active:cursor-grabbing relative shrink-0">
          <div className="flex gap-2 group">
            <button 
              onTouchEnd={(e) => { e.stopPropagation(); onClose(); }} 
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-75 flex items-center justify-center"
            ></button>
            <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a023] hover:brightness-75"></button>
            <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] hover:brightness-75"></button>
          </div>
          
          <span className="absolute left-1/2 -translate-x-1/2 text-white/60 text-[13px] font-semibold">
            {title}
          </span>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto p-0 text-white font-sans cursor-auto" onMouseDown={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
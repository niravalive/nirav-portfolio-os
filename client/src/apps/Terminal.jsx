import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Nirav-OS v1.0.0' },
    { type: 'output', content: "Type 'help' to see available commands." }
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Har baar naya command aane par auto-scroll niche jaye
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    inputRef.current?.focus();
  }, [history]);

  // Click karne par focus hamesha input par rahe
  const handleFocus = () => inputRef.current?.focus();

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      
      // Pehle user ka command history mein add karo
      const newHistory = [...history, { type: 'command', content: input }];

      // Phir logic check karo (Tere Blueprint ke hisab se)
      switch (command) {
        case 'help':
          newHistory.push({ type: 'output', content: 'Available commands: about, skills, social, hobby, clear' });
          break;
        case 'about':
          newHistory.push({ type: 'output', content: 'I am Nirav, a MERN Stack Developer from Surat. I love exploring new tech and building cool stuff.' });
          break;
        case 'skills':
          newHistory.push({ type: 'output', content: 'Frontend: React, Tailwind, GSAP\nBackend: Node.js, Express, MongoDB\nTools: Git, Postman, Docker' });
          break;
        case 'social':
          newHistory.push({ type: 'output', content: 'GitHub: github.com/nirav\nLinkedIn: linkedin.com/in/nirav\nInstagram: @nirav_music' });
          break;
        case 'hobby':
          newHistory.push({ type: 'output', content: 'Creating Music (Check out "Fallen"), Coding, Gaming (BGMI)' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          newHistory.push({ type: 'error', content: `Command not found: ${command}` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="h-full w-full bg-[#1e1e1e] text-green-400 font-mono text-sm p-2 overflow-auto" onClick={handleFocus}>
      {/* Puran History Render Karna */}
      {history.map((line, index) => (
        <div key={index} className={`${line.type === 'error' ? 'text-red-400' : 'text-green-400'} mb-1 whitespace-pre-wrap`}>
          {line.type === 'command' ? `nirav@macbook ~ % ${line.content}` : line.content}
        </div>
      ))}

      {/* Input Area */}
      <div className="flex items-center">
        <span className="mr-2 text-white">nirav@macbook ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none text-white flex-grow font-mono caret-white"
          autoFocus
        />
      </div>
      {/* Ye invisible div hamesha bottom mein rahega */}
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
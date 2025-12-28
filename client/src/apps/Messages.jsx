import React, { useState, useEffect, useRef } from 'react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(0); 
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // File track karne ke liye
  const [chatHistory, setChatHistory] = useState({
    0: [ 
       { sender: 'them', text: "Hey there! 👋 I'm Nirav." },
       { sender: 'them', text: "Feel free to drop a message regarding projects or collaborations." }
    ],
    1: [ 
       { sender: 'me', text: "Haan mummy kha liya." },
       { sender: 'them', text: "Jhooth mat bol, tu abhi bhi laptop pe hai." },
       { sender: 'them', text: "Time pe so jana beta. 😠" }
    ],
    2: [ 
       { sender: 'them', text: "Bro, this Nirav-OS is better than Windows." },
       { sender: 'me', text: "Thanks Elon! Tesla ke dashboard ke liye chahiye kya?" },
       { sender: 'them', text: "Let's talk. Bringing the jet to Surat." }
    ]
  });

  const bottomRef = useRef(null);
  const fileInputRef = useRef(null); // Hidden file input ka reference

  const contacts = [
    { id: 0, name: "Nirav Chaudhari", role: "Portfolio Owner", avatar: "https://avatars.githubusercontent.com/u/1?v=4", status: "Online" },
    { id: 1, name: "Mom ❤️", role: "Boss", avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png", status: "Typing..." },
    { id: 2, name: "Elon Musk", role: "Mars Guy", avatar: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg", status: "Away" }
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, activeChat]);

  // File Selection Logic
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 25MB Size Check (25 * 1024 * 1024 bytes)
    if (file.size > 25 * 1024 * 1024) {
      alert("Bhai file bohot badi hai! Max 25MB allow hai.");
      return;
    }
    setSelectedFile(file);
  };

  const handleSend = (e) => {
    e.preventDefault();
    
    // Agar na text hai na file, to kuch mat bhejo
    if (!messageText.trim() && !selectedFile) return;

    // Message Object Create Karo
    const newMessage = { 
      sender: 'me', 
      text: messageText,
      file: selectedFile ? {
        name: selectedFile.name,
        size: (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB',
        type: selectedFile.type,
        url: URL.createObjectURL(selectedFile) // Preview ke liye fake URL
      } : null
    };
    
    // Update Chat History
    setChatHistory(prev => ({
      ...prev,
      [activeChat]: [...prev[activeChat], newMessage]
    }));
    
    // Reset Inputs
    setMessageText('');
    setSelectedFile(null);

    // Auto-Reply Logic (Sirf Nirav ke liye)
    if (activeChat === 0) {
      setTimeout(() => {
        setChatHistory(prev => ({
          ...prev,
          [0]: [...prev[0], { sender: 'them', text: "Received! I'll check the attachment and get back to you. 🚀" }]
        }));
      }, 1500);
    }
  };

  const currentContact = contacts.find(c => c.id === activeChat);
  const activeMessages = chatHistory[activeChat];

  return (
    <div className="h-full flex bg-white w-full font-sans">
      
      {/* Sidebar (Contacts) */}
      <div className="w-[30%] md:w-1/4 bg-[#f5f5f5]/90 border-r border-gray-300 flex flex-col pt-4 backdrop-blur-xl">
        <div className="px-4 mb-2 flex justify-between items-center">
             <h2 className="text-lg font-bold text-black">Messages</h2>
             <span className="text-blue-500 text-xl cursor-pointer">📝</span>
        </div>
        <div className="px-3 mb-2">
            <input type="text" placeholder="Search" className="w-full bg-[#e5e5e5] text-xs px-3 py-1.5 rounded-lg outline-none focus:bg-white transition-colors" />
        </div>
        <div className="flex-grow overflow-auto">
            {contacts.map((contact) => (
                <div 
                    key={contact.id}
                    onClick={() => setActiveChat(contact.id)}
                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 ${activeChat === contact.id ? 'bg-[#dbeafe]' : ''}`}
                >
                    <div className="relative">
                        <img src={contact.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                        {contact.id === 0 && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>}
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold text-sm text-black truncate">{contact.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{contact.role}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-[70%] md:w-3/4 flex flex-col bg-white">
        
        {/* Header */}
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white/50 backdrop-blur-md sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-2 flex-col items-start leading-none justify-center">
                <span className="font-bold text-sm text-black">To: {currentContact.name}</span>
                <span className="text-[10px] text-gray-400">{currentContact.status}</span>
            </div>
            <span className="text-blue-500 text-xs font-bold cursor-pointer">Details</span>
        </div>

        {/* Messages Feed */}
        <div className="flex-grow p-4 overflow-auto space-y-2 bg-gradient-to-b from-white to-gray-50">
            {activeMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm flex flex-col gap-2 ${
                        msg.sender === 'me' 
                        ? 'bg-[#007AFF] text-white rounded-br-none' 
                        : 'bg-[#e9e9eb] text-black rounded-bl-none'
                    }`}>
                        
                        {/* FILE DISPLAY LOGIC */}
                        {msg.file && (
                          <div className={`flex items-center gap-3 p-2 rounded-lg ${msg.sender === 'me' ? 'bg-white/20' : 'bg-white'}`}>
                            {/* Agar Image hai to Preview dikhao */}
                            {msg.file.type.startsWith('image/') ? (
                              <img src={msg.file.url} className="w-20 h-20 object-cover rounded-md" alt="attachment" />
                            ) : (
                              // Varna File Icon dikhao
                              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xl">📄</div>
                            )}
                            <div className="flex flex-col overflow-hidden">
                              <span className="truncate font-bold text-xs">{msg.file.name}</span>
                              <span className="text-[10px] opacity-70">{msg.file.size}</span>
                            </div>
                          </div>
                        )}

                        {/* TEXT DISPLAY LOGIC */}
                        {msg.text && <span>{msg.text}</span>}
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#f5f5f5] border-t border-gray-300">
            {/* Show Selected File Preview above Input */}
            {selectedFile && (
              <div className="flex items-center justify-between bg-white px-3 py-1 mb-2 rounded-lg border border-gray-200 shadow-sm">
                 <span className="text-xs text-gray-600 truncate max-w-[200px]">{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                 <button onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-700">✕</button>
              </div>
            )}

            <form onSubmit={handleSend} className="relative flex items-center gap-2">
                
                {/* HIDDEN FILE INPUT */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                />

                {/* PLUS ICON (Trigger) */}
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer flex items-center justify-center text-gray-600 hover:text-white transition-all pb-0.5 text-xl font-light"
                >
                  +
                </div>

                <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`iMessage`} 
                    className="flex-grow bg-white border border-gray-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-blue-400 transition-colors"
                />
                <button 
                    type="submit" 
                    disabled={!messageText.trim() && !selectedFile}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all ${
                        messageText.trim() || selectedFile ? 'bg-[#007AFF] hover:bg-blue-600 scale-100' : 'bg-gray-300 scale-90'
                    }`}
                >
                    ↑
                </button>
            </form>
        </div>

      </div>
    </div>
  );
};

export default Messages;
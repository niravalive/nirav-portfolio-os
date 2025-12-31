import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'; // 👈 Ab seedha import kar rahe hain (Sahi tarika)
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

const Messages = () => {
  const [activeChat, setActiveChat] = useState(0); 
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); 
  const [isSending, setIsSending] = useState(false);

  // Fake History for UI (User ko dikhane ke liye)
  const [chatHistory, setChatHistory] = useState({
    0: [ 
       { sender: 'them', text: "Hey there! 👋 I'm Nirav." },
       { sender: 'them', text: "Drop a message here with ur name and details, it will sync to my Admin Panel." }
    ],
    1: [ 
       { sender: 'me', text: "Haan bolo?." },
       { sender: 'them', text: "dmart se detergent lete ana." }
    ],
    2: [ 
       { sender: 'them', text: "Bro, u r so cool." },
       { sender: 'me', text: "i said that before!" }
    ]
  });

  const bottomRef = useRef(null);
  const fileInputRef = useRef(null); 

  const contacts = [
    { id: 0, name: "Nirav Chaudhari", role: "Owner", avatar: "https://cdn.iconscout.com/icon/premium/png-512-thumb/man-icon-svg-download-png-8351129.png?f=webp&w=512", status: "Online" },
    { id: 1, name: "Mom ❤️", role: "Boss", avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png", status: "Typing..." },
    { id: 2, name: "Elon Musk", role: "Mars Guy", avatar: "https://i.guim.co.uk/img/media/066294df8d069050e0cdf72024b2165ead413632/290_0_3188_2550/master/3188.jpg?width=465&dpr=1&s=none&crop=none", status: "Away" }
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, activeChat]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedFile) return;

    // --- FIREBASE LOGIC START ---
    // Sirf 'Nirav' (ID 0) ko bheja gaya message hi database me jayega
    if (activeChat === 0) {
        setIsSending(true);
        try {
            await addDoc(collection(db, "messages"), {
                text: messageText || "File Attachment",
                sender: "Visitor",
                createdAt: serverTimestamp(),
                read: false,
                fileName: selectedFile ? selectedFile.name : null
            });
            console.log("Message Sent to Firebase Successfully!"); 
        } catch (error) {
            console.error("Error sending to DB:", error);
            // Agar fail hua to alert dega, par UI me message dikhayega taaki user ko bura na lage
        } finally {
            setIsSending(false);
        }
    }
    // --- FIREBASE LOGIC END ---

    // UI Update (Optimistic update - turant dikhega)
    const newMessage = { 
      sender: 'me', 
      text: messageText,
      file: selectedFile ? {
          name: selectedFile.name,
          size: '1 MB', // Dummy size for display
          type: selectedFile.type,
          url: URL.createObjectURL(selectedFile)
      } : null
    };

    setChatHistory(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));

    setMessageText('');
    setSelectedFile(null);
  };

  const currentContact = contacts.find(c => c.id === activeChat);
  const activeMessages = chatHistory[activeChat] || [];

  return (
    <div className="h-full flex bg-white w-full font-sans">
      
      {/* Sidebar */}
      <div className="w-[30%] md:w-1/4 bg-[#f5f5f5]/90 border-r border-gray-300 flex flex-col pt-4 backdrop-blur-xl">
        <div className="px-4 mb-2 flex justify-between items-center">
             <h2 className="text-lg font-bold text-black">Messages</h2>
             <span className="text-blue-500 text-xl cursor-pointer"></span>
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
                        <img src={contact.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-200" alt="avatar"/>
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

      {/* Chat Area */}
      <div className="w-[70%] md:w-3/4 flex flex-col bg-white">
        
        {/* Header */}
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white/50 backdrop-blur-md sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-2 flex-col items-start leading-none justify-center">
                <span className="font-bold text-sm text-black">To: {currentContact.name}</span>
                <span className="text-[10px] text-gray-400">{currentContact.status}</span>
            </div>
            <span className="text-blue-500 text-xs font-bold cursor-pointer">Details</span>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-auto space-y-2 bg-gradient-to-b from-white to-gray-50">
            {activeMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm flex flex-col gap-2 ${
                        msg.sender === 'me' ? 'bg-[#007AFF] text-white rounded-br-none' : 'bg-[#e9e9eb] text-black rounded-bl-none'
                    }`}>
                        {msg.file && (
                          <div className={`flex items-center gap-3 p-2 rounded-lg ${msg.sender === 'me' ? 'bg-white/20' : 'bg-white'}`}>
                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xl">📄</div>
                            <div className="flex flex-col overflow-hidden">
                              <span className="truncate font-bold text-xs">{msg.file.name}</span>
                            </div>
                          </div>
                        )}
                        {msg.text && <span>{msg.text}</span>}
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-[#f5f5f5] border-t border-gray-300">
            {selectedFile && (
              <div className="flex items-center justify-between bg-white px-3 py-1 mb-2 rounded-lg border border-gray-200 shadow-sm">
                 <span className="text-xs text-gray-600 truncate max-w-[200px]">{selectedFile.name}</span>
                 <button onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-700">✕</button>
              </div>
            )}
            <form onSubmit={handleSend} className="relative flex items-center gap-2">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                <div onClick={() => fileInputRef.current.click()} className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer flex items-center justify-center text-gray-600 pb-0.5 text-xl font-light">+</div>
                <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="iMessage" className="flex-grow bg-white text-black border border-gray-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-blue-400" />
                <button type="submit" className="w-7 h-7 rounded-full flex items-center justify-center bg-[#007AFF] text-white text-xs font-bold">↑</button>
            </form>
        </div>

      </div>
    </div>
  );
};

export default Messages;
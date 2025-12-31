import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase connection
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Messages');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // === 1. LOGIN LOGIC ===
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'nirav6969') { 
      setIsLoggedIn(true);
      fetchMessages();
    } else {
      alert("Chal bhag! Wrong Password. 🔒");
    }
  };

  // === 2. FETCH MESSAGES (Realtime) ===
  const fetchMessages = () => {
    try {
      if (!db) {
        // Agar Firebase connect nahi hai to Fake Data dikhao
        setMessages([
            { id: 1, sender: 'Visitor', text: 'Firebase not connected yet!', createdAt: { seconds: Date.now()/1000 } },
            { id: 2, sender: 'Mom', text: 'Demo message for Admin.', createdAt: { seconds: Date.now()/1000 } }
        ]);
        setLoading(false);
        return;
      }

      // Real Data
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(msgs);
        setLoading(false);
      });
      return unsubscribe;

    } catch (err) {
      console.error("Admin Error:", err);
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-full w-full bg-black flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
            🔒
        </div>
        <h2 className="text-xl font-bold mb-4">Restricted Access</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin PIN"
                className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-center text-white outline-none focus:border-red-500"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 py-2 rounded font-bold">Unlock</button>
        </form>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#1e1e1e] text-white flex font-sans">
      
      {/* Sidebar */}
      <div className="w-48 bg-[#111] border-r border-gray-800 p-4 flex flex-col gap-2">
         <div className="flex items-center gap-2 mb-6 text-gray-400">
             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
             <span className="text-xs font-bold tracking-widest uppercase">Admin Panel</span>
         </div>
         
         <button onClick={() => setActiveTab('Dashboard')} className={`text-left px-3 py-2 rounded text-sm ${activeTab === 'Dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-400'}`}>📊 Dashboard</button>
         <button onClick={() => setActiveTab('Messages')} className={`text-left px-3 py-2 rounded text-sm ${activeTab === 'Messages' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-400'}`}>💬 Inbox ({messages.length})</button>
         <button onClick={() => setIsLoggedIn(false)} className="mt-auto text-left px-3 py-2 rounded text-sm text-red-400 hover:bg-red-900/20">Log Out</button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-auto bg-[#1e1e1e]">
         
         {activeTab === 'Dashboard' && (
             <div className="grid grid-cols-2 gap-4">
                 <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                     <h3 className="text-gray-400 text-xs uppercase font-bold">Total Messages</h3>
                     <p className="text-4xl font-bold mt-2">{messages.length}</p>
                 </div>
                 <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                     <h3 className="text-gray-400 text-xs uppercase font-bold">Site Visits</h3>
                     <p className="text-4xl font-bold mt-2 text-green-400">1,240</p>
                     <p className="text-[10px] text-gray-500 mt-1">Fake stat for now</p>
                 </div>
             </div>
         )}

         {activeTab === 'Messages' && (
             <div className="space-y-3">
                 <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
                 {loading ? <p>Loading...</p> : messages.length === 0 ? <p className="text-gray-500">No messages yet.</p> : (
                     messages.map((msg) => (
                         <div key={msg.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                             <div className="flex justify-between items-start mb-2">
                                 <span className="font-bold text-blue-400">{msg.sender || 'Anonymous'}</span>
                                 <span className="text-[10px] text-gray-500">
                                    {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                                 </span>
                             </div>
                             <p className="text-sm text-gray-300 bg-black/30 p-2 rounded">{msg.text}</p>
                             {msg.fileName && (
                                 <div className="mt-2 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded w-fit">
                                     📎 Attachment: {msg.fileName}
                                 </div>
                             )}
                         </div>
                     ))
                 )}
             </div>
         )}

      </div>
    </div>
  );
};

export default Admin;
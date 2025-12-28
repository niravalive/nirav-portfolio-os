import React, { useState, useRef, useEffect } from 'react';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')); // Default placeholder

  // Tera "Database" yahi hai (Static Array)
  const songs = [
    {
      id: 1,
      title: "Fallen",
      artist: "Nirav Music",
      album: "Singles",
      duration: "3:45",
      cover: "./public/Picsart_25-02-07_19-29-16-489.jpg", // Dark red vibe
      url: "./public/fallen.wav" // Yahan apne asli song ka path daalna (e.g., /fallen.mp3)
    },
    {
      id: 2,
      title: "Coding Late Night",
      artist: "Nirav Lo-Fi",
      album: "Dev Vibes",
      duration: "2:20",
      cover: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    {
      id: 3,
      title: "RaktSetu Theme",
      artist: "Nirav OST",
      album: "Projects",
      duration: "1:50",
      cover: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000&auto=format&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ];

  const currentSong = songs[currentSongIndex];

  // Play/Pause Logic
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Song Change Logic
  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    audioRef.current.src = songs[index].url;
    audioRef.current.play();
  };

  // Progress Bar Logic
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      const val = (audio.currentTime / audio.duration) * 100;
      setProgress(val || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentSongIndex]);

  return (
    <div className="h-full flex bg-white text-black w-full overflow-hidden select-none">
      
      {/* 1. Sidebar */}
      <div className="w-1/4 bg-[#f9f9f9] border-r border-gray-200 flex flex-col pt-8 pb-4 px-4">
         <h2 className="text-xl font-bold text-red-500 mb-6 px-2 flex items-center gap-2">
             Music
         </h2>
         
         <div className="space-y-1">
            <div className="bg-gray-200 text-red-500 font-semibold px-3 py-2 rounded-lg cursor-pointer">Listen Now</div>
            <div className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition">Browse</div>
            <div className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition">Radio</div>
         </div>

         <div className="mt-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 px-3">Library</h3>
            <div className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition">Recently Added</div>
            <div className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition">Songs</div>
         </div>
      </div>

      {/* 2. Main Content */}
      <div className="w-3/4 flex flex-col bg-white">
        
        {/* Album Art Header */}
        <div className="flex-grow p-8 flex items-end bg-gradient-to-b from-gray-100 to-white relative overflow-hidden">
            {/* Background Blur */}
            <img src={currentSong.cover} className="absolute top-0 left-0 w-full h-full object-cover opacity-10 blur-3xl" />
            
            <div className="relative z-10 flex gap-6 items-end w-full">
                <img src={currentSong.cover} className="w-48 h-48 shadow-2xl rounded-lg" />
                <div className="mb-2">
                    <h5 className="text-sm font-bold text-red-500 uppercase">Single</h5>
                    <h1 className="text-5xl font-bold text-gray-900 tracking-tight">{currentSong.title}</h1>
                    <p className="text-xl text-gray-500 mt-2 font-medium">{currentSong.artist} • {currentSong.album}</p>
                </div>
            </div>
        </div>

        {/* Song List */}
        <div className="px-8 pb-24 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-gray-400 text-xs border-b border-gray-200">
                        <th className="py-2 font-medium">#</th>
                        <th className="py-2 font-medium">TITLE</th>
                        <th className="py-2 font-medium">ARTIST</th>
                        <th className="py-2 font-medium text-right">TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, idx) => (
                        <tr 
                           key={song.id} 
                           onClick={() => playSong(idx)}
                           className={`group cursor-pointer hover:bg-gray-50 transition-colors ${currentSongIndex === idx ? 'bg-gray-100 text-red-500' : 'text-gray-600'}`}
                        >
                            <td className="py-3 text-sm pl-2">
                                {currentSongIndex === idx && isPlaying ? (
                                    <span className="animate-pulse">III</span> // Fake equalizer animation
                                ) : (
                                    idx + 1
                                )}
                            </td>
                            <td className="py-3 text-sm font-medium">{song.title}</td>
                            <td className="py-3 text-sm">{song.artist}</td>
                            <td className="py-3 text-sm text-right pr-2">{song.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* 3. Player Bar Controls */}
        <div className="h-20 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex items-center px-4 justify-between fixed bottom-0 w-[calc(100%-1.5rem)] md:w-[698px] rounded-b-xl z-20">
            {/* Song Info */}
            <div className="w-1/3 flex items-center gap-3">
                <img src={currentSong.cover} className="w-10 h-10 rounded shadow bg-gray-200" />
                <div>
                    <div className="text-sm font-bold text-gray-800 line-clamp-1">{currentSong.title}</div>
                    <div className="text-xs text-gray-500">{currentSong.artist}</div>
                </div>
            </div>

            {/* Controls */}
            <div className="w-1/3 flex flex-col items-center">
                <div className="flex items-center gap-6 text-gray-800">
                     <button className="hover:text-red-500 text-xl">⏮</button>
                     <button onClick={togglePlay} className="text-3xl hover:scale-110 transition-transform text-red-500">
                        {isPlaying ? '⏸' : '▶'}
                     </button>
                     <button className="hover:text-red-500 text-xl">⏭</button>
                </div>
                {/* Progress Bar */}
                <div className="w-full mt-2 h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                    <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Volume / Extra */}
            <div className="w-1/3 flex justify-end gap-3 text-gray-400">
                <span>🔈</span>
                <div className="w-20 h-1 bg-gray-300 rounded-full mt-2"></div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Music;
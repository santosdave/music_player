import React from "react";
import {playAudio} from "../components/PlayAudio";
function LibrarySong({
    name,
    artist,
    cover,
    id,
    setCurrentSong,
    songs,
    audioRef,
    isPlaying,
    setSongs,
    active,
  }) {
    const songSelectHandler = () => {
        const selectedSong = songs.filter((state) => state.id === id);
        setCurrentSong({ ...selectedSong[0] });
        //Set Active in library
        const newSongs = songs.map((song) => {
          if (song.id === id) {
            return {
              ...song,
              active: true,
            };
          } else {
            return {
              ...song,
              active: false,
            };
          }
        });
        setSongs(newSongs);
    
        //Play audio
        playAudio(isPlaying, audioRef);
      };
    return (
        <div onClick={songSelectHandler} className={`flex p-2 items-center cursor-pointer transition-all ${active ? "selected" : ""}`}>
            <img src="https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg" className="object-contain rounded-full h-12 md:h-full" alt="song"/>
            <div className="px-3">
                <h3 className="text-xl font-medium">{name}</h3>
                <h4 className="text-sm font-medium">{artist}</h4>
            </div>
        </div>
        
    )
}

export default LibrarySong

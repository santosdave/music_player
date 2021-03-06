import Head from 'next/head'
import React, { useState, useRef } from "react";
import Library from '../components/Library'
import Nav from '../components/Nav'
import Player from '../components/Player'
import Song from '../components/Song'
import kenyanMusic from './data'
import {playAudio} from '../components/PlayAudio';
export default function Home() {
  const audioRef = useRef(null);
  const [songs, setSongs]=useState(kenyanMusic());
  const [currentSong, setCurrentSong]=useState(songs[0]);
  const [isPlaying, setIsPlaying]=useState(false);
  const [songInfo, setSongInfo]=useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });
  const [libraryStatus, setLibraryStatus]=useState(false);
  const timeUpdateHandler=(e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent= Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent/roundedDuration)*100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    playAudio(isPlaying, audioRef);
    return;
  };
  return (
    <div className="">
      <Head>
        <title>Music Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`p-3 ${libraryStatus ? "-translate-x-0 opacity-1" : ""}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
        <Song isPlaying={isPlaying} currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        isPlaying={isPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
       
      ></audio>
      </main>
      
    </div>
  )
}

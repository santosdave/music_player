import Button from "@material-tailwind/react/Button";
import React, {useState} from "react";

import Icon from "@material-tailwind/react/Icon";
import {playAudio} from "../components/PlayAudio";
function Player({
    isPlaying,
    setIsPlaying,
    audioRef,
    songInfo,
    setSongInfo,
    currentSong,
    songs,
    setCurrentSong,
    setSongs,
  }){
    const [iconName ,setIconName]=useState("play_circle_filled");
    
    
    const [activeVolume, setActiveVolume] = useState(false);
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
          if (song.id === nextPrev.id) {
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
      };
      const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
      };
      function getTime(time) {
        return (
          Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
      }
      const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
      };
    
      const playSongHandler = () => {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(!isPlaying);
          setIconName("play_circle_filled");
        } else {
          audioRef.current.play();
          setIsPlaying(!isPlaying);
          setIconName("pause");
        }
      };
      const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    
        //Forward BAck
        if (direction === "skip-forward") {
          await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
          activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === "skip-back") {
          if ((currentIndex - 1) % songs.length === -1) {
            await setCurrentSong(songs[songs.length - 1]);
            activeLibraryHandler(songs[songs.length - 1]);
            playAudio(isPlaying, audioRef);
            return;
          }
          await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
          activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
      };
      const changeVolume = (e) => {
        let value = e.target.value;
        audioRef.current.volume = value;
        setSongInfo({ ...songInfo, volume: value });
      };
    return (
        <div className=" container h-24 min-h-full flex flex-col justify-between items-center">
            <div className="flex p-2 items-center w-auto">
                <p className="mr-2 bg-gray-500 rounded-md p-1">{getTime(songInfo.currentTime)}</p>
                <div className=" w-max h-4 relative overflow-hidden rounded-lg bg-gradient-to-l md:bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                    <input className="w-auto bg-transparent cursor-pointer" type="range" value={songInfo.currentTime} min={0} max={songInfo.duration || 0} onChange={dragHandler} />
                    <div style={trackAnim} className="w-max h-full absolute  transform p-1 pointer-events-none"></div>
                </div>
                <p className="ml-2 bg-gray-500 rounded-md p-1">{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="flex items-center justify-between p-1 w-auto">
                        <Button
                            color="white"
                            buttonType="outline"
                            onClick={() => skipTrackHandler("skip-back")}
                            rounded={true}
                            iconOnly={true}
                            ripple={"dark"}
                            className="  h-15 w-10 border-0"
                        >
                            <Icon name="arrow_left" size="3xl" color="gray"/>
                        </Button>
                        <Button
                            color="white"
                            onClick={playSongHandler}
                            buttonType="outline"
                            rounded={true}
                            iconOnly={true}
                            ripple={"dark"}
                            className="  h-15 w-10 border-0"
                        >
                            {/* play_circle_filled */}
                            <Icon name={iconName} size="3xl" color="gray"/>
                        </Button>
                        <Button
                            color="white"
                            buttonType="outline"
                            rounded={true}
                            onClick={() => skipTrackHandler("skip-forward")}
                            iconOnly={true}
                            ripple={"dark"}
                            className="  h-15 w-10 border-0"
                        >
                            <Icon name="arrow_right" size="3xl" color="gray"/>
                        </Button>
                        <Button
                            color="white"
                            buttonType="outline"
                            onClick={() => setActiveVolume(!activeVolume)}
                            rounded={true}
                            iconOnly={true}
                            ripple={"dark"}
                            className="  h-15 w-10 border-0"
                        >
                            <Icon name="volume_down" size="3xl" color="gray"/>
                        </Button>
                        {activeVolume && (
                            <input  className="focus:outline-none w-auto  "  onChange={changeVolume}  value={songInfo.volume} type="range" max="1" min="0" step="0.01"/>
                        )}
                        
            </div>
            
        </div>
    )
}

export default Player

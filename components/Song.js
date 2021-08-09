function Song({ currentSong, isPlaying }) {
    return (
        <div className={" flex flex-col items-center justify-center h-50  w-auto  md:min-h-full "}>
            <img className={`object-contain rounded-full h-48  md:min-h-full transition-all   ease-in-out ${isPlaying ? "animate-pulse" : ""}`} src={currentSong.cover} alt="song"/>
            <h2 className={"pt-3 px-1 font-semibold"}>{currentSong.name}</h2>
            <h3 className={"text-sm font-normal"}>{currentSong.artist}</h3>
        </div>
    )
}

export default Song

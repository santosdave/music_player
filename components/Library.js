import LibrarySong from "./LibrarySong"

function Library({
    songs,
    setCurrentSong,
    audioRef,
    isPlaying,
    setSongs,
    libraryStatus,
  }) {

    return (
        <>
        
             <div className= {`fixed shadow-md rounded-lg  w-auto h-screen overflow-y-auto  top-20 bg-gray-500 overflow-hidden overflow-scroll   transition-all ease-out -translate-x-full opacity-1 ${libraryStatus ? "-translate-x-0 opacity-1" : " "}`}>
           
             <div className="bg-white text-center">
                <h2 className="p-2 text-2xl font-semibold shadow-xl">Library</h2>
            </div>
            <div className="">
                    {songs.map((song) => (
                        <LibrarySong
                            songs={songs}
                            cover={song.cover}
                            name={song.name}
                            artist={song.artist}
                            active={song.active}
                            key={song.id}
                            id={song.id}
                            setCurrentSong={setCurrentSong}
                            audioRef={audioRef}
                            isPlaying={isPlaying}
                            setSongs={setSongs}
                        />
                ))}
            </div>
           
       </div>
        </>
        
    )
}

export default Library

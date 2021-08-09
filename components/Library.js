import LibrarySong from "./LibrarySong"

function Library() {
    return (
        <div className="fixed shadow-md rounded-lg  w-auto h-full  bg-gray-500  transition-all ease-out -translate-x-full opacity-0">
            
            <h2 className="p-2">Library</h2>
            <LibrarySong/>
        </div>
    )
}

export default Library

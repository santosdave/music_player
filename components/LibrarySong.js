import React from "react";

function LibrarySong() {
    return (
        <div className="flex items-center cursor-pointer transition-all">
            <img src="https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg" className="object-contain rounded-full h-12 md:h-full" alt="song"/>
            <div className="px-3">
                <h3 className="text-xl font-medium">Nadekeswa</h3>
                <h4 className="text-sm font-medium">Mbosso</h4>
            </div>
        </div>
    )
}

export default LibrarySong

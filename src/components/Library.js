import React from "react";
import LibrarySong from "./LibrarySong";

const Libary = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return (
                        <LibrarySong
                            setSongs={setSongs}
                            audioRef={audioRef}
                            songs={songs}
                            song={song}
                            setCurrentSong={setCurrentSong}
                            key={song.id}
                            isPlaying={isPlaying} 
                            />
                    )
                })}
            </div>
        </div>
    )
}
export default Libary;
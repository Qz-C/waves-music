import React, { useRef, useState } from "react";
import LibrarySong from "./LibrarySong";

const Libary = ({songs}) => {
    return(
        <div className="library">
            <h2>Libary</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return(
                        <LibrarySong song={song}/>
                    )
                })}
            </div>
        </div>
    )
}
export default Libary; 
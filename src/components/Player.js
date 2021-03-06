import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
    currentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    setSongInfo,
    songInfo,
    songs,
    setCurrentSong,
    setSongs
}) => {

    useEffect(() => {
        const newSongs = songs.map((each) => {
            if (each.id === currentSong.id)
                return {
                    ...each,
                    active: true
                }
            else return {
                ...each,
                active: false
            }
        })
        setSongs(newSongs);
    }, [currentSong])

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    const skipTrackHandler = async (direction) => {

        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        if (direction === 'skip-forward') {
            if (currentIndex === songs.length - 1)
                await setCurrentSong(songs[0]);
            else
                await setCurrentSong(songs[currentIndex + 1]);
        } if (direction === 'skip-back') {
            if (currentIndex === 0)
                await setCurrentSong(songs[songs.length - 1]);
            else
                await setCurrentSong(songs[currentIndex - 1]);
        }
        if (isPlaying) audioRef.current.play();
    }

    const trackAnimation = {
        transform: `translateX(${songInfo.percentage}%)`
    }

    const getTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }

    const timeUpdateHandler = (event) => {
        const current = event.target.currentTime;
        const duration = event.target.duration;
        setSongInfo({ ...songInfo, currentTime: current, duration });
    }

    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongInfo({ ...songInfo, currentTime: event.target.value });
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track">
                    <input
                        onChange={dragHandler}
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        type="range"
                    />
                    <div style={trackAnimation} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" onClick={() => { skipTrackHandler('skip-back') }} />
                <FontAwesomeIcon className="play" onClick={playSongHandler} icon={isPlaying ? faPause : faPlay} size="2x" />
                <FontAwesomeIcon className="skip-forward" icon={faAngleRight} size="2x" onClick={() => { skipTrackHandler('skip-forward') }} />
            </div>
        </div>
    )
}
export default Player;
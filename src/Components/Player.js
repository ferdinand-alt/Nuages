import React, {  } from "react";
// Component fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icons van de Component
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  songInfo,
  setSongInfo,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  currentSong,
  setCurrentSong,
  setSongs,
}) {

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
  }
  

  // STATE, DEZE STATE IS OOK VERPLAATST
  // const [songInfo, setSongInfo] = useState({
  //   currentTime: 0,
  //   duration: 0,
  // });

  // // REF OM TE KOPPELEN AAN ELEMENT en te gebruiken in de playSongHandler
  // const audioRef = useRef(null);

  // NUMMER HANDLER MET STOP EN PLAY
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // UPADATE HANDLER, DEZE STATE IS OOK GELIFT
  // const timeUpdateHandler = (e) => {
  //   const current = e.target.currentTime;
  //   const duration = e.target.duration;
  //   setSongInfo({ ...songInfo, currentTime: current, duration });
  // };

  // HANDLER VOOR DE SCROLL
  const dragHandler = (e) => {
    // je moet de audio tag update + de state
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // TIJD FUNCTIE
  const getTime = (time) => {
    return (
      // VAN STACK OVERFLOW
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if(isPlaying) audioRef.current.play()
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }

  return (
    <div className="player">
      <div className="time-control">
        {/* TIME CONTROL */}
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>

        {/* BUTTONS */}
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipTrackHandler("skip-back")}
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => skipTrackHandler("skip-forward")}
          icon={faAngleRight}
          size="2x"
        />
      </div>

      {/* AUDIO ELEMENT
      AUDIO IS VERPLAATST
      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
      ></audio> */}
    </div>
  );
}

export default Player;

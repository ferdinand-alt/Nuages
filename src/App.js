
import React, {useState, useRef} from 'react';
import Player from './Components/Player';
import Song from './Components/Song';
import Library from "./Components/Library";
import Nav from "./Components/Nav";
import './styles/app.scss';
import data from './data';


function App() {

  // STATE
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // REF
  const audioRef = useRef(null);


  // HANDLER
   const timeUpdateHandler = (e) => {
     const current = e.target.currentTime;
     const duration = e.target.duration;
     const roundedCurrent = Math.round(current)
     const roundedDuration = Math.round(duration)
     const animation = Math.round((roundedCurrent / roundedDuration) * 100)
     setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation });
   };
  
  const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  }
  
  // CONTENT
  return (
    <div className={`App ${libraryStatus ? 'library-active': ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        timeUpdateHandler={timeUpdateHandler}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      {/* AUDIO ELEMENT */}
      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;

import React from 'react'

function LibrarySong({ song, setCurrentSong, audioRef, isPlaying, songs, id, setSongs}) {
      
   const songSelectorHandler = async () => {
     await setCurrentSong(song);

       const newSongs = songs.map((song) => {
         if (song.id === id) {
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
     setSongs(newSongs)
     // check is the slected song is playing
     // video 15, eerst de audio
     if (isPlaying) audioRef.current.play();
   };

    return (
    <div onClick={songSelectorHandler} className={`library-song ${song.active ? 'selected': '' }`}>
        <img src={song.cover} alt={song.name}></img>
        <div className="song-description">
          <h3>{song.name}</h3>
          <h4>{song.artist}</h4>
        </div>
      </div>
    );
}

export default LibrarySong

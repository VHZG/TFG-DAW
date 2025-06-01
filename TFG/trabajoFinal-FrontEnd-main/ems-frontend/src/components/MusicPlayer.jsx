import { useRef, useState, useEffect } from 'react';

function MusicPlayer() {
  const songs = [
    'mango-breeze.mp3',
    'Tobu - Bliss.mp3',
    'Vexento & Dexento - Anesthesia.mp3',
    'Vexento - Wild.mp3'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  const nextSong = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
  };

  const prevSong = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => nextSong();

    if (audio) {
      audio.addEventListener('ended', handleEnded);
      audio.load();
      audio.play();
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentIndex]);

  return (
    <div
      style={{
        width: '400px',
        margin: '20px auto',
        padding: '2rem',
        backgroundColor: 'rgb(47, 44, 69)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(255, 255, 255, 0.82)',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '20px', fontWeight: 'bold', color: 'white' }}>
        {songs[currentIndex].replace('.mp3', '')}
      </div>
      <audio ref={audioRef} controls style={{ width: '100%', borderRadius: '8px' }}>
        <source
          src={`http://localhost:8080/music/${songs[currentIndex]}`}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      <div style={{ marginTop: '20px' }}>
        <button onClick={prevSong} style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '50px'}}>Previous</button>
        <button onClick={nextSong} style={{padding: '10px 20px', borderRadius: '50px'}}>Following</button>
      </div>


    </div>
  );
}

export default MusicPlayer;

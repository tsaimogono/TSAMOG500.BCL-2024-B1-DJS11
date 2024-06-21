import { useRef, useEffect, useState } from 'react';

const AudioPlayer = ({ src, onPlay, onPause }) => {
  const audioRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedData = () => {
      console.log('Audio loaded');
      if (audioPlaying) {
        audioElement.play().catch((error) => {
          console.error('Play interrupted:', error);
        });
      }
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
    };

    audioElement.addEventListener('loadeddata', handleLoadedData);
    audioElement.addEventListener('error', handleError);

    return () => {
      audioElement.removeEventListener('loadeddata', handleLoadedData);
      audioElement.removeEventListener('error', handleError);
    };
  }, [src, audioPlaying]);

  const handlePlay = () => {
    setAudioPlaying(true);
    onPlay(); // Call onPlay callback if provided
  };

  const handlePause = () => {
    setAudioPlaying(false);
    onPause(); // Call onPause callback if provided
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioPlaying) {
      if (audioElement.paused) {
        audioElement.play().catch((error) => {
          console.error('Play interrupted:', error);
        });
      }
    } else {
      if (!audioElement.paused) {
        audioElement.pause();
      }
    }
  }, [audioPlaying]);

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} />
      {audioPlaying ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handlePlay}>Play</button>
      )}
    </div>
  );
};

export default AudioPlayer;

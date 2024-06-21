import { useRef, useEffect, useState } from 'react';

const AudioPlayer = ({ src, onPlay, onPause }) => {
  const audioRef = useRef(null);// Ref to hold the audio element
  const [audioPlaying, setAudioPlaying] = useState(false); // State to track whether audio is playing or paused

 // Effect to handle audio loading and playback
  useEffect(() => {
    const audioElement = audioRef.current; // Reference to the audio element
// Function to handle when audio data is loaded
    const handleLoadedData = () => {
      console.log('Audio loaded');
      if (audioPlaying) {// If audio should be playing
        audioElement.play().catch((error) => {
          console.error('Play interrupted:', error);
        });
      }
    };
// Function to handle audio errors
    const handleError = (e) => {
      console.error('Audio error:', e);
    };
 // Add event listeners for loaded data and error
    audioElement.addEventListener('loadeddata', handleLoadedData);
    audioElement.addEventListener('error', handleError);
 // Clean up: remove event listeners when component unmounts or dependencies change
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
  }, [audioPlaying]);// Dependency: audioPlaying state
  
// Render the AudioPlayer component
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

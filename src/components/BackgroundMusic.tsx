import { useRef, useState, useEffect } from 'react';
import type { RefObject } from 'react';
import './BackgroundMusic.css';

type Props = {
  src?: string;
  /** When provided, use this audio element (owned by parent). Enables autoplay on user gesture. */
  audioRef?: RefObject<HTMLAudioElement | null>;
};

export default function BackgroundMusic({ src = '/music/music.mp3', audioRef: externalRef }: Props) {
  const internalRef = useRef<HTMLAudioElement>(null);
  const audioRef = externalRef ?? internalRef;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume, audioRef]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    setIsPlaying(!el.paused);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    if (!externalRef) {
      const tryPlay = () => el.play().catch(() => {});
      el.addEventListener('canplaythrough', tryPlay);
      el.addEventListener('loadeddata', tryPlay);
      const t = setTimeout(tryPlay, 100);
      return () => {
        clearTimeout(t);
        el.removeEventListener('play', onPlay);
        el.removeEventListener('pause', onPause);
        el.removeEventListener('canplaythrough', tryPlay);
        el.removeEventListener('loadeddata', tryPlay);
      };
    }
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
    };
  }, [audioRef, externalRef]);

  return (
    <div className="background-music" role="group" aria-label="Background music">
      {!externalRef && <audio ref={internalRef} src={src} loop preload="auto" />}
      <button
        type="button"
        className="background-music__play"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <label className="background-music__volume-wrap">
        <span className="background-music__volume-icon" aria-hidden>♪</span>
        <input
          type="range"
          className="background-music__volume"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
        />
      </label>
    </div>
  );
}

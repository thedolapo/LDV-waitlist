import { useState, useCallback, useRef } from 'react';
import LDVLogoScreen from './components/LDVLogoScreen';
import ComingSoonPage from './components/ComingSoonPage';
import './App.css';

const MUSIC_SRC = '/music/A%20good%20day-Habib%20Ayoade.mp3';
type Screen = 'logo' | 'coming-soon';

export default function App() {
  const [screen, setScreen] = useState<Screen>('logo');
  const audioRef = useRef<HTMLAudioElement>(null);

  const goToComingSoon = useCallback(() => setScreen('coming-soon'), []);
  const startMusic = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" className="app__audio" />
      {screen === 'logo' && (
        <LDVLogoScreen onEnter={goToComingSoon} onUserGesture={startMusic} />
      )}
      {screen === 'coming-soon' && (
        <div className="app__coming-soon-wrap" key="coming-soon">
          <ComingSoonPage audioRef={audioRef} musicSrc={MUSIC_SRC} />
        </div>
      )}
    </>
  );
}

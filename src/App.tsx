import { useState, useCallback } from 'react';
import LDVLogoScreen from './components/LDVLogoScreen';
import ComingSoonPage from './components/ComingSoonPage';
import './App.css';

type Screen = 'logo' | 'coming-soon';

export default function App() {
  const [screen, setScreen] = useState<Screen>('logo');

  const goToComingSoon = useCallback(() => {
    setScreen('coming-soon');
  }, []);

  return (
    <>
      {screen === 'logo' && (
        <LDVLogoScreen onEnter={goToComingSoon} />
      )}
      {screen === 'coming-soon' && (
        <ComingSoonPage />
      )}
    </>
  );
}

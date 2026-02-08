import { useEffect, useState } from 'react';
import './LDVLogoScreen.css';

type Props = {
  onEnter: () => void;
};

export default function LDVLogoScreen({ onEnter }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onEnter();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onEnter]);

  return (
    <section
      className={`ldv-logo-screen ${visible ? 'ldv-logo-screen--visible' : ''}`}
      onClick={onEnter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEnter();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Enter LDV"
    >
      {/* Background brushstroke shapes from Figma (L, D, V) */}
      <div
        className="ldv-logo-screen__bg-strokes"
        aria-hidden
        style={{ backgroundImage: 'url(/ldv-bg-strokes.svg)' }}
      />

      <div className="ldv-logo-screen__content">
        <h1 className="ldv-logo-screen__title">
          <img src="/ldv-logo.svg" alt="LDV" className="ldv-logo-screen__logo" />
        </h1>
        <p className="ldv-logo-screen__est">est. MMXV</p>
        <hr className="ldv-logo-screen__line" />
      </div>

      <p className="ldv-logo-screen__est-corner" aria-hidden>est. MMXV</p>
      <p className="ldv-logo-screen__hint">Click or press Enter</p>
    </section>
  );
}

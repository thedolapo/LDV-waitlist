import { useEffect, useState, useRef, useCallback } from 'react';
import './LDVLogoScreen.css';

const LOAD_DURATION_MS = 2500;
const HINT_DELAY_MS = 3000;

type Props = {
  onEnter: () => void;
  /** Called immediately on click/key so audio play() runs in same user gesture (required for autoplay in Chrome/Firefox). */
  onUserGesture?: () => void;
};

export default function LDVLogoScreen({ onEnter, onUserGesture }: Props) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [exiting, setExiting] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Progress bar animation (Lusion-style: fill left to right)
  useEffect(() => {
    if (!visible) return;
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const start = startTimeRef.current ?? now;
      const elapsed = now - start;
      const p = Math.min(1, elapsed / LOAD_DURATION_MS);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  // Auto-navigate when progress completes
  useEffect(() => {
    if (progress < 1) return;
    setExiting(true);
    const t = setTimeout(() => {
      onEnter();
    }, 400);
    return () => clearTimeout(t);
  }, [progress, onEnter]);

  // Show hint only if page didn't load automatically (fallback after delay)
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setShowHint(true);
    }, HINT_DELAY_MS);
    return () => clearTimeout(t);
  }, [visible]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onUserGesture?.();
        setExiting(true);
        setTimeout(onEnter, 300);
      }
    },
    [onEnter, onUserGesture]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const handleClick = useCallback(() => {
    onUserGesture?.();
    setExiting(true);
    setTimeout(onEnter, 300);
  }, [onEnter, onUserGesture]);

  return (
    <section
      className={`ldv-logo-screen ${visible ? 'ldv-logo-screen--visible' : ''} ${exiting ? 'ldv-logo-screen--exiting' : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Enter LDV"
    >
      <div
        className="ldv-logo-screen__bg-strokes"
        aria-hidden
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}ldv-bg-strokes.svg)` }}
      />

      <div className="ldv-logo-screen__content">
        <h1 className="ldv-logo-screen__title">
          <img src={`${import.meta.env.BASE_URL}ldv-logo.svg`} alt="LDV" className="ldv-logo-screen__logo" />
        </h1>
        <div className="ldv-logo-screen__line" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
          <span className="ldv-logo-screen__line-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="ldv-logo-screen__audio-icon" aria-hidden>♪</span>
      </div>

      {showHint && !exiting && (
        <p className="ldv-logo-screen__hint">Click or press Enter</p>
      )}
    </section>
  );
}

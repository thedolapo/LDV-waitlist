import type { RefObject } from 'react';
import HeroText from './HeroText';
import EmailWaitlistForm from './EmailWaitlistForm';
import BackgroundMusic from './BackgroundMusic';
import './ComingSoonPage.css';

type Props = {
  audioRef: RefObject<HTMLAudioElement | null>;
  musicSrc: string;
};

export default function ComingSoonPage({ audioRef, musicSrc }: Props) {
  return (
    <main
      className="coming-soon-page"
      role="main"
      aria-label="LA DOLCE VITA coming soon"
    >
      <div
        className="coming-soon-page__bg"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}ldvbackground-beach.png)` }}
        aria-hidden
      />
      <div className="coming-soon-page__overlay" aria-hidden />
      <div className="coming-soon-page__content">
        <header className="coming-soon-page__hero" aria-label="Logo">
          <img
            src={`${import.meta.env.BASE_URL}ldv-logo.svg`}
            alt="LA DOLCE VITA"
            className="coming-soon-page__logo"
          />
        </header>
        <div className="coming-soon-page__hero-text-wrap">
          <HeroText />
        </div>
        <div className="coming-soon-page__cta-wrap">
          <EmailWaitlistForm />
        </div>
        <BackgroundMusic audioRef={audioRef} src={musicSrc} />
      </div>
    </main>
  );
}

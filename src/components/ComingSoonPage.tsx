import HeroText from './HeroText';
import EmailWaitlistForm from './EmailWaitlistForm';
import './ComingSoonPage.css';

export default function ComingSoonPage() {
  return (
    <main
      className="coming-soon-page"
      role="main"
      aria-label="LA DOLCE VITA coming soon"
    >
      <div className="coming-soon-page__overlay" aria-hidden />
      <div className="coming-soon-page__content">
        <header className="coming-soon-page__hero" aria-label="Logo">
          <img
            src="/ldv-logo.svg"
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
      </div>
    </main>
  );
}

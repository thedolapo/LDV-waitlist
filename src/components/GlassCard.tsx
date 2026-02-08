import EmailWaitlistForm from './EmailWaitlistForm';
import './GlassCard.css';

type Props = {
  beachPreviewSrc?: string;
};

export default function GlassCard({ beachPreviewSrc }: Props) {
  return (
    <div className="glass-card">
      <div className="glass-card__frame">
        {beachPreviewSrc ? (
          <img
            src={beachPreviewSrc}
            alt=""
            className="glass-card__preview"
          />
        ) : (
          <div className="glass-card__preview-placeholder" />
        )}
      </div>
      <div className="glass-card__cta">
        <EmailWaitlistForm />
      </div>
    </div>
  );
}

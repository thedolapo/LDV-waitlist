import { useForm, ValidationError } from '@formspree/react';
import './EmailWaitlistForm.css';

const FORM_ID = 'xgolennl';

export default function EmailWaitlistForm() {
  const [state, handleSubmit] = useForm(FORM_ID);

  if (state.succeeded) {
    return (
      <p className="email-waitlist-form__success" role="status">
        Thanks for joining!
      </p>
    );
  }

  return (
    <form className="email-waitlist-form" onSubmit={handleSubmit}>
      <label htmlFor="waitlist-email" className="email-waitlist-form__label">
        Email address
      </label>
      <div className="email-waitlist-form__row">
        <input
          id="waitlist-email"
          type="email"
          name="email"
          placeholder="Enter email"
          required
          disabled={state.submitting}
          className="email-waitlist-form__input"
          autoComplete="email"
          aria-describedby="waitlist-email-error"
        />
        <button
          type="submit"
          disabled={state.submitting}
          className="email-waitlist-form__submit"
          aria-label="Submit email"
        >
          <img src={`${import.meta.env.BASE_URL}arrow-submit.svg`} alt="" width={10} height={12} aria-hidden />
        </button>
      </div>
      <ValidationError
        id="waitlist-email-error"
        prefix="Email"
        field="email"
        errors={state.errors}
        className="email-waitlist-form__error"
      />
    </form>
  );
}

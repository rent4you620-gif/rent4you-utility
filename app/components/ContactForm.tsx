'use client';

import { useState, type FormEvent } from 'react';

const ITEMS = ['Washer', 'Dryer', 'Washer & Dryer Set', 'Something else'];
const TERMS = ['Day rental', 'Month-to-Month', 'Rent-to-Own'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'That did not go through.');
      }

      form.reset();
      setStatus('sent');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'That did not go through.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <form className="inquiry" onSubmit={(event) => event.preventDefault()}>
        <h3>Got it — thanks.</h3>
        <p className="form-note">
          We’ll come back to you with pricing and availability, usually within a few hours.
          If it’s urgent, call or text and we’ll pick up.
        </p>
        <button type="button" className="btn btn-dark" onClick={() => setStatus('idle')}>
          Send another
        </button>
      </form>
    );
  }

  return (
    <form className="inquiry" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="item">What do you need?</label>
          <select id="item" name="item" defaultValue={ITEMS[0]}>
            {ITEMS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="term">For how long?</label>
          <select id="term" name="term" defaultValue={TERMS[1]}>
            {TERMS.map((term) => (
              <option key={term}>{term}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Anything else? (optional)</label>
        <textarea id="message" name="message" rows={3} />
      </div>

      <button type="submit" className="btn btn-dark" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Request a rental'}
      </button>

      {status === 'error' ? (
        <p className="form-note" role="alert">
          {error} Please call or text us instead — we’ll sort it out.
        </p>
      ) : (
        <p className="form-note">
          No obligation. We’ll reply with a price for your term before anything is booked.
        </p>
      )}
    </form>
  );
}

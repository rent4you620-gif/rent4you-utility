'use client';

import { useState } from 'react';

const ITEMS = ['Washer', 'Dryer', 'Washer + dryer set', 'Something else'];
const TERMS = ['Day', 'Month-to-Month', 'Rent-to-Own'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="inquiry" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
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
          <label htmlFor="item">Item</label>
          <select id="item" name="item" defaultValue={ITEMS[0]}>
            {ITEMS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="term">Term</label>
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

      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send request'}
      </button>

      <p className="form-note" role="status">
        {status === 'sent'
          ? 'Thanks — we got it and will follow up shortly.'
          : status === 'error'
            ? 'Something went wrong. Call or text us and we will sort it out.'
            : 'We reply within one business day. No spam, no hard credit pull.'}
      </p>
    </form>
  );
}

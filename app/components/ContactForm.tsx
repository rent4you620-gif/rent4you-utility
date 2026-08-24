'use client';

import { FormEvent, useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="inquiry" name="rental-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="rental-inquiry" />
      <p className="honeypot" aria-hidden="true"><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="field-row">
        <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" required autoComplete="tel" /></div>
      </div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="item">What do you need?</label>
          <select id="item" name="item" required defaultValue="">
            <option value="" disabled>Select an item</option>
            <option>Washer</option><option>Dryer</option><option>Washer + dryer</option><option>Other household item</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="term">Preferred term</label>
          <select id="term" name="term" required defaultValue="">
            <option value="" disabled>Select a term</option>
            <option>Day rental</option><option>Month-to-month</option><option>Rent-to-own</option><option>Not sure yet</option>
          </select>
        </div>
      </div>
      <div className="field"><label htmlFor="message">Anything else?</label><textarea id="message" name="message" rows={3} /></div>
      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Request availability'}</button>
      <p className={`form-note ${status}`} role="status">
        {status === 'success' && 'Thanks — your request was received. We’ll follow up soon.'}
        {status === 'error' && 'Something went wrong. Please email us directly and we’ll help.'}
        {status === 'idle' && 'No obligation. We use these details only to respond to your request.'}
      </p>
    </form>
  );
}

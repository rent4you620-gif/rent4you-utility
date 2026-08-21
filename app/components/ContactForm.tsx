'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useAppContext } from './AppContext';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'hello@rent4youutility.com';

const ITEM_OPTIONS = [
  'Washer',
  'Dryer',
  'Washer & Dryer Set',
  'Something else — rent-to-own',
  'Not sure yet',
];

export function ContactForm() {
  const { requestedItem } = useAppContext();
  const [item, setItem] = useState('Washer');

  // Month-to-month catalog card -> prefill this select + scroll (handled in context)
  useEffect(() => {
    if (requestedItem && ITEM_OPTIONS.includes(requestedItem)) {
      setItem(requestedItem);
    }
  }, [requestedItem]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const phone = String(data.get('phone') || '');
    const email = String(data.get('email') || '');
    const term = String(data.get('term') || '');
    const message = String(data.get('message') || '');

    const subject = `Rental request: ${item} (${term})`;
    const body =
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n` +
      `Item: ${item}\nTerm: ${term}\nMessage: ${message}`;

    // EDIT ME: this opens a pre-filled email. Replace with a real backend / form service before launch.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="inquiry" onSubmit={handleSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="item">Item</label>
          <select id="item" name="item" value={item} onChange={(e) => setItem(e.target.value)}>
            {ITEM_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="term">Term</label>
          <select id="term" name="term" defaultValue="Month-to-Month">
            <option>Day</option>
            <option>Month-to-Month</option>
            <option>Rent-to-Own</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Message (optional)</label>
        <textarea id="message" name="message" rows={3} />
      </div>
      <button type="submit" className="btn btn-primary">
        Send request
      </button>
      <p className="form-note">
        This opens your email app with the details pre-filled — EDIT ME to wire up a real backend before launch.
      </p>
    </form>
  );
}

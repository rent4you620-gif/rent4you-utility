'use client';

import { useEffect, useState } from 'react';
import { onApplyRequest, type RTOItem } from './rto-store';

const TOTAL_STEPS = 4;

type Applicant = {
  name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
};

const EMPTY_APPLICANT: Applicant = { name: '', dob: '', phone: '', email: '', address: '' };

export function RTOModal() {
  const [item, setItem] = useState<RTOItem | null>(null);
  const [step, setStep] = useState(1);
  const [applicant, setApplicant] = useState<Applicant>(EMPTY_APPLICANT);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () =>
      onApplyRequest((next) => {
        setItem(next);
        setStep(1);
        setApplicant(EMPTY_APPLICANT);
        setConsent(false);
        setError(null);
      }),
    [],
  );

  useEffect(() => {
    if (!item) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setItem(null);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item]);

  if (!item) return null;

  const detailsComplete =
    applicant.name !== '' &&
    applicant.dob !== '' &&
    applicant.phone !== '' &&
    applicant.email !== '' &&
    applicant.address !== '';

  function update(field: keyof Applicant, value: string) {
    setApplicant((previous) => ({ ...previous, [field]: value }));
  }

  async function submit() {
    if (!item) return;
    setSending(true);
    setError(null);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item.name, tier: item.tier, ...applicant }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStep(4);
    } catch {
      setError('We could not submit that application. Please try again or give us a call.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-label={`Apply for ${item.name}`}>
      <div className="modal">
        <button className="modal-close" type="button" aria-label="Close" onClick={() => setItem(null)}>
          ✕
        </button>

        <p className="modal-eyebrow">
          {item.tier === 'self' ? 'Approved in house' : 'Financing partner'}
        </p>
        <h2>{item.name}</h2>
        <p className="modal-item-price">
          Est. ${item.monthly.toLocaleString('en-US')} / mo · {item.term}
        </p>

        <div className="progress-track" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span key={index} className={index < step ? 'done' : undefined} />
          ))}
        </div>

        <div className={step === 1 ? 'modal-step active' : 'modal-step'}>
          <div className="field">
            <label htmlFor="applicant-name">Full name</label>
            <input
              id="applicant-name"
              value={applicant.name}
              onChange={(event) => update('name', event.target.value)}
            />
          </div>
          <div className="field-row" style={{ marginTop: '14px' }}>
            <div className="field">
              <label htmlFor="applicant-dob">Date of birth</label>
              <input
                id="applicant-dob"
                type="date"
                value={applicant.dob}
                onChange={(event) => update('dob', event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="applicant-phone">Phone</label>
              <input
                id="applicant-phone"
                type="tel"
                value={applicant.phone}
                onChange={(event) => update('phone', event.target.value)}
              />
            </div>
          </div>
          <div className="field" style={{ marginTop: '14px' }}>
            <label htmlFor="applicant-email">Email</label>
            <input
              id="applicant-email"
              type="email"
              value={applicant.email}
              onChange={(event) => update('email', event.target.value)}
            />
          </div>
          <div className="field" style={{ marginTop: '14px' }}>
            <label htmlFor="applicant-address">Delivery address</label>
            <input
              id="applicant-address"
              value={applicant.address}
              onChange={(event) => update('address', event.target.value)}
            />
          </div>
          <div className="modal-nav">
            <span />
            <button
              className="btn btn-dark"
              type="button"
              disabled={!detailsComplete}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        </div>

        <div className={step === 2 ? 'modal-step active' : 'modal-step'}>
          <div className="consent-box">
            <p>
              {item.tier === 'self'
                ? 'We run a soft credit check ourselves. It does not affect your credit score.'
                : 'Your application is handed to our lease-to-own financing partner, who fronts the cost of the item and carries the payment risk.'}
            </p>
            <ul>
              <li>No item is ordered until your approval comes back.</li>
              <li>Payments apply toward ownership over the term shown.</li>
              <li>You can return the item and stop payments at any time.</li>
            </ul>
            <label className="check-row">
              <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
              <span>I authorize this check and agree to be contacted about my application.</span>
            </label>
          </div>
          <div className="modal-nav">
            <button className="btn btn-back" type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn btn-dark" type="button" disabled={!consent} onClick={() => setStep(3)}>
              Review
            </button>
          </div>
        </div>

        <div className={step === 3 ? 'modal-step active' : 'modal-step'}>
          <div className="confirm-box">
            <span>
              <b>Item:</b> {item.name}
            </span>
            <span>
              <b>Applicant:</b> {applicant.name}
            </span>
            <span>
              <b>Contact:</b> {applicant.phone} · {applicant.email}
            </span>
            <span>
              <b>Deliver to:</b> {applicant.address}
            </span>
            <span>
              <b>Route:</b> {item.tier === 'self' ? 'In-house approval' : 'Financing partner'}
            </span>
          </div>
          {error ? <p className="form-note">{error}</p> : null}
          <div className="modal-nav">
            <button className="btn btn-back" type="button" onClick={() => setStep(2)}>
              Back
            </button>
            <button className="btn btn-dark" type="button" disabled={sending} onClick={submit}>
              {sending ? 'Submitting…' : 'Submit application'}
            </button>
          </div>
        </div>

        <div className={step === 4 ? 'modal-step active' : 'modal-step'}>
          <div className="success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p>
            Application received. {item.tier === 'self'
              ? 'We will run the soft check and get back to you within one business day.'
              : 'Our financing partner will reach out with a decision, usually the same day.'}
          </p>
          <div className="modal-nav">
            <span />
            <button className="btn btn-dark" type="button" onClick={() => setItem(null)}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

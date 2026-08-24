'use client';

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from 'react';
import { SELF_APPROVAL_THRESHOLD, tierFor, type RTOItem } from '../lib/rto';
import {
  closeApplication,
  getSelectedItem,
  getServerSnapshot,
  subscribe,
} from './rtoStore';

export function RTOModal() {
  const item = useSyncExternalStore(subscribe, getSelectedItem, getServerSnapshot);

  useEffect(() => {
    if (!item) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeApplication();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [item]);

  if (!item) return null;

  // `key` resets every field and the step counter when a different item is picked.
  return <ApplicationDialog item={item} key={item.id} />;
}

const EMPTY = { name: '', dob: '', phone: '', email: '', address: '' };
const TOTAL_INPUT_STEPS = 3;

function ApplicationDialog({ item }: { item: RTOItem }) {
  const [step, setStep] = useState(0);
  const [consented, setConsented] = useState(false);
  const [fields, setFields] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const partner = tierFor(item.cost, SELF_APPROVAL_THRESHOLD) === 'partner';
  const tier = partner ? 'partner' : 'self';

  function update(name: keyof typeof EMPTY, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item.name, itemId: item.id, tier, ...fields }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'We could not submit that application.');
      }

      setStep(3);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'We could not submit that application.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${item.name}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeApplication();
      }}
    >
      <div className="modal">
        <button type="button" className="modal-close" onClick={closeApplication} aria-label="Close">
          ✕
        </button>

        <p className="modal-eyebrow">Rent-to-own application</p>
        <h2>{item.name}</h2>
        <p className="modal-item-price">
          {item.weekly}/wk · {item.term} · {partner ? 'financing partner' : 'approved by us'}
        </p>

        {step < TOTAL_INPUT_STEPS ? (
          <div className="progress-track" aria-hidden="true">
            {Array.from({ length: TOTAL_INPUT_STEPS }, (_, index) => (
              <span key={index} className={index <= step ? 'done' : undefined} />
            ))}
          </div>
        ) : null}

        {/* Step 1 — what they are agreeing to */}
        <div className={`modal-step${step === 0 ? ' active' : ''}`}>
          <div className="consent-box">
            <p>Before we run anything, here is exactly what happens:</p>
            <ul>
              {partner ? (
                <>
                  <li>Your details go to our lease-to-own financing partner.</li>
                  <li>They run a soft check — it does not affect your credit score.</li>
                  <li>They buy the item and carry the payment risk, not you.</li>
                </>
              ) : (
                <>
                  <li>We review your application in-house, usually same day.</li>
                  <li>We run a soft check only — it does not affect your credit score.</li>
                  <li>We order the item new once you are approved.</li>
                </>
              )}
              <li>Nothing ships and nothing is charged until you approve the final terms.</li>
            </ul>
            <label className="check-row">
              <input
                type="checkbox"
                checked={consented}
                onChange={(event) => setConsented(event.target.checked)}
              />
              <span>
                I agree to a soft credit check and to being contacted about this application.
              </span>
            </label>
          </div>

          <div className="modal-nav">
            <button type="button" className="btn btn-back" onClick={closeApplication}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!consented}
              onClick={() => setStep(1)}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Step 2 — their details */}
        <div className={`modal-step${step === 1 ? ' active' : ''}`}>
          <div className="field">
            <label htmlFor="app-name">Full name</label>
            <input
              id="app-name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={(event) => update('name', event.target.value)}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="app-dob">Date of birth</label>
              <input
                id="app-dob"
                type="date"
                value={fields.dob}
                onChange={(event) => update('dob', event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="app-phone">Phone</label>
              <input
                id="app-phone"
                type="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={(event) => update('phone', event.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="app-email">Email</label>
            <input
              id="app-email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={(event) => update('email', event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="app-address">Delivery address</label>
            <input
              id="app-address"
              type="text"
              autoComplete="street-address"
              value={fields.address}
              onChange={(event) => update('address', event.target.value)}
            />
          </div>

          <div className="modal-nav">
            <button type="button" className="btn btn-back" onClick={() => setStep(0)}>
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={Object.values(fields).some((value) => value.trim() === '')}
              onClick={() => setStep(2)}
            >
              Review
            </button>
          </div>
        </div>

        {/* Step 3 — confirm and send */}
        <form className={`modal-step${step === 2 ? ' active' : ''}`} onSubmit={submit}>
          <div className="confirm-box">
            <span>
              <b>Item:</b> {item.name}
            </span>
            <span>
              <b>Name:</b> {fields.name}
            </span>
            <span>
              <b>Phone:</b> {fields.phone}
            </span>
            <span>
              <b>Email:</b> {fields.email}
            </span>
            <span>
              <b>Deliver to:</b> {fields.address}
            </span>
            <span>
              <b>Routed to:</b> {partner ? 'Financing partner' : 'In-house approval'}
            </span>
          </div>

          {error ? (
            <p className="form-note" role="alert">
              {error} Please call or text us and we will take it down by phone.
            </p>
          ) : null}

          <div className="modal-nav">
            <button type="button" className="btn btn-back" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit application'}
            </button>
          </div>
        </form>

        {/* Step 4 — done */}
        <div className={`modal-step${step === 3 ? ' active' : ''}`}>
          <div className="success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 12.5l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Application received</h2>
          <p className="form-note">
            {partner
              ? 'We have passed this to our financing partner. Expect a decision by email, usually within one business day.'
              : 'We are reviewing it now and will come back to you today with a decision and a delivery window.'}
          </p>
          <div className="modal-nav">
            <span />
            <button type="button" className="btn btn-dark" onClick={closeApplication}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

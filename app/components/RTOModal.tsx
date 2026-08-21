'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from './AppContext';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'hello@rent4youutility.com';

const EMPTY_FORM = { name: '', dob: '', phone: '', email: '', address: '' };

export function RTOModal() {
  const { isRtoOpen, rtoItem, closeRto } = useAppContext();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [consentSelf, setConsentSelf] = useState(false);
  const [consentPartner, setConsentPartner] = useState(false);

  const tier = rtoItem?.tier ?? 'self';

  // Reset to step 1 whenever a new application is opened.
  useEffect(() => {
    if (isRtoOpen) {
      setStep(1);
      setConsentSelf(false);
      setConsentPartner(false);
    }
  }, [isRtoOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isRtoOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeRto();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isRtoOpen, closeRto]);

  if (!isRtoOpen || !rtoItem) {
    return <div className="modal-overlay" aria-hidden="true" />;
  }

  const itemLine = `${rtoItem.name} — ${rtoItem.price}${
    tier === 'partner' ? ' (partner-financed)' : ' (approved by us)'
  }`;

  function update(field: keyof typeof EMPTY_FORM, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function continueFromTier() {
    if (tier === 'self' && !consentSelf) {
      alert('Please check the box to authorize the soft credit check before continuing.');
      return;
    }
    if (tier === 'partner' && !consentPartner) {
      alert('Please check the box to continue to the financing partner review.');
      return;
    }
    setStep(3);
  }

  function submit() {
    const subject = `Rent-to-own application (${tier}): ${rtoItem!.name}`;
    const body =
      `Item: ${rtoItem!.name}\nTier: ${tier}\nName: ${form.name}\nDOB: ${form.dob}\n` +
      `Phone: ${form.phone}\nEmail: ${form.email}\nDelivery address: ${form.address}\n` +
      `Approval path: ${tier === 'partner' ? 'Financing partner' : 'Soft credit check authorized'}`;
    // EDIT ME: replace with a real backend + soft-credit-check provider (self tier)
    // and/or your financing partner's embedded application widget (partner tier).
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStep(4);
  }

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeRto();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="rtoModalTitle">
        <button className="modal-close" onClick={closeRto} aria-label="Close application">
          ✕
        </button>

        <p className="modal-eyebrow">Rent-to-own application</p>
        <h2 id="rtoModalTitle">Apply to rent</h2>
        <p className="modal-item-price">{itemLine}</p>

        <div className="progress-track">
          <span className={step >= 1 ? 'done' : ''} />
          <span className={step >= 2 ? 'done' : ''} />
          <span className={step >= 3 ? 'done' : ''} />
        </div>

        {/* Step 1: your info */}
        {step === 1 && (
          <div className="modal-step active">
            <div className="field-row">
              <div className="field">
                <label htmlFor="rtoName">Full name</label>
                <input
                  type="text"
                  id="rtoName"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="rtoDob">Date of birth</label>
                <input
                  type="date"
                  id="rtoDob"
                  value={form.dob}
                  onChange={(e) => update('dob', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="rtoPhone">Phone</label>
                <input
                  type="tel"
                  id="rtoPhone"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="rtoEmail">Email</label>
                <input
                  type="email"
                  id="rtoEmail"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="rtoAddress">Delivery address</label>
              <input
                type="text"
                id="rtoAddress"
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                required
              />
            </div>
            <div className="modal-nav">
              <span />
              <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2a: self-approval tier */}
        {step === 2 && tier === 'self' && (
          <div className="modal-step active">
            <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', margin: '0 0 4px' }}>
              This item is approved directly by us. We run a quick soft credit check as part of that.
            </p>
            <div className="consent-box">
              <p>
                <b style={{ color: 'var(--ink)' }}>What this means:</b>
              </p>
              <ul>
                <li>
                  This is a <b style={{ color: 'var(--ink)' }}>soft inquiry</b> — it does not affect your credit score.
                </li>
                <li>It helps us confirm approval terms, not deny people outright.</li>
                <li>
                  Results are only used for this application and are not shared beyond what&apos;s needed to approve your
                  rental.
                </li>
              </ul>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={consentSelf}
                  onChange={(e) => setConsentSelf(e.target.checked)}
                  required
                />
                <span>
                  I authorize Rent4You Utility to run a soft credit check to evaluate this rental application.
                </span>
              </label>
            </div>
            <p className="form-note" style={{ marginBottom: '6px' }}>
              EDIT ME: connect this to a real soft-check provider before launch — nothing is submitted to a credit
              bureau yet.
            </p>
            <div className="modal-nav">
              <button type="button" className="btn btn-back" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={continueFromTier}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2b: partner-financed tier */}
        {step === 2 && tier === 'partner' && (
          <div className="modal-step active">
            <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', margin: '0 0 4px' }}>
              This item is financed through our lease-to-own partner, not by us directly.
            </p>
            <div className="consent-box">
              <p>
                <b style={{ color: 'var(--ink)' }}>What this means:</b>
              </p>
              <ul>
                <li>
                  Our financing partner reviews your application and fronts the cost of the item —{' '}
                  <b style={{ color: 'var(--ink)' }}>not you paying us upfront.</b>
                </li>
                <li>Approval is typically instant and doesn&apos;t require a traditional credit check.</li>
                <li>
                  Once approved, you make lease payments directly to the partner. We handle ordering and delivery.
                </li>
              </ul>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={consentPartner}
                  onChange={(e) => setConsentPartner(e.target.checked)}
                  required
                />
                <span>
                  I understand this application will be reviewed by Rent4You Utility&apos;s financing partner, and I
                  agree to their approval process.
                </span>
              </label>
            </div>
            <p className="form-note" style={{ marginBottom: '6px' }}>
              EDIT ME: once you&apos;ve signed with a partner (e.g. Katapult or Acima), replace this step with their
              embedded application widget.
            </p>
            <div className="modal-nav">
              <button type="button" className="btn btn-back" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={continueFromTier}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: review & submit */}
        {step === 3 && (
          <div className="modal-step active">
            <div className="confirm-box">
              <span>
                Item: <b>{rtoItem.name}</b>
              </span>
              <span>
                Name: <b>{form.name || '—'}</b>
              </span>
              <span>
                Phone: <b>{form.phone || '—'}</b>
              </span>
              <span>
                Email: <b>{form.email || '—'}</b>
              </span>
              <span>
                Delivery address: <b>{form.address || '—'}</b>
              </span>
              <span>
                {tier === 'partner'
                  ? 'Approval: Reviewed by financing partner'
                  : 'Soft credit check: Authorized'}
              </span>
            </div>
            <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={submit}>
              Submit application
            </button>
            <div className="modal-nav">
              <button type="button" className="btn btn-back" onClick={() => setStep(2)}>
                Back
              </button>
              <span />
            </div>
          </div>
        )}

        {/* Step 4: success */}
        {step === 4 && (
          <div className="modal-step active">
            <div className="success-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: '1.3rem' }}>Application received</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', margin: '0 0 20px' }}>
              We&apos;ll review your application and follow up by phone or email with your approval status and next
              steps. Nothing ships until you&apos;re approved.
            </p>
            <button type="button" className="btn btn-dark" style={{ width: '100%' }} onClick={closeRto}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

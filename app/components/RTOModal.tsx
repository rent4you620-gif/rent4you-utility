'use client';

import { useEffect, useState } from 'react';

export function RTOModal() {
  const [item, setItem] = useState('');

  useEffect(() => {
    const open = (event: Event) => setItem((event as CustomEvent<{ item: string }>).detail.item);
    window.addEventListener('open-rto', open);
    return () => window.removeEventListener('open-rto', open);
  }, []);

  useEffect(() => {
    if (!item) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setItem('');
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [item]);

  return (
    <div className={`modal-overlay ${item ? 'open' : ''}`} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setItem('')}>
      {item && (
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="rto-title">
          <button className="modal-close" type="button" onClick={() => setItem('')} aria-label="Close">×</button>
          <p className="modal-eyebrow">Rent-to-own request</p>
          <h2 id="rto-title">Let’s talk about {item}</h2>
          <p className="modal-item-price">Availability and terms are confirmed before any commitment.</p>
          <div className="consent-box">
            <p>Here’s what happens next:</p>
            <ul>
              <li>Tell us how to reach you through the inquiry form.</li>
              <li>We confirm the item, total cost, and approval route.</li>
              <li>You review every term before deciding.</li>
            </ul>
          </div>
          <div className="modal-nav">
            <button className="btn btn-back" type="button" onClick={() => setItem('')}>Not yet</button>
            <a className="btn btn-dark" href="#contact" onClick={() => setItem('')}>Continue to request</a>
          </div>
        </section>
      )}
    </div>
  );
}

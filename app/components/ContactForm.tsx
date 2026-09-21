'use client';

import { useState } from 'react';

interface ContactFormProps {
  requestedItems: string[];
  onRemoveItem: (item: string) => void;
  onClearRequest: () => void;
}

export default function ContactForm({ requestedItems, onRemoveItem, onClearRequest }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    item: '',
    term: 'day',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
        const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            item: requestedItems.length ? requestedItems.join(', ') : formData.item,
          }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }
      
      setMessage(`✓ Thanks ${formData.name}! We received your inquiry.`);
      onClearRequest();
      setFormData({ name: '', phone: '', email: '', item: '', term: 'day', message: '' });
      
      // Auto-clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage(
        `✗ ${error instanceof Error ? error.message : 'Something went wrong. Please try again or call us.'}`
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {requestedItems.length > 0 && (
        <div className="request-list" aria-live="polite">
          <div className="request-list-heading">Your rental request</div>
          {requestedItems.map((item) => (
            <div key={item} className="request-item">
              <span>{item}</span>
              <button type="button" onClick={() => onRemoveItem(item)} aria-label={`Remove ${item}`}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required={requestedItems.length === 0}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="item">What are you interested in? *</label>
        <select
          id="item"
          name="item"
          value={formData.item}
          onChange={handleChange}
          required
        >
          <option value="">Select an item</option>
          <option value="washer">Washer</option>
          <option value="dryer">Dryer</option>
          <option value="combo">Washer/Dryer Combo</option>
          <option value="household">Household Items</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="term">Rental Term *</label>
        <select
          id="term"
          name="term"
          value={formData.term}
          onChange={handleChange}
          required
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="own">Rent-to-Own</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Additional Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Sending...' : 'Send Inquiry'}
      </button>

      {message && (
        <div className={`form-message ${message.startsWith('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <style jsx>{`
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 500px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .request-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding: 1rem;
          border: 2px solid var(--color-primary);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
        }

        .request-list-heading {
          font-weight: 700;
        }

        .request-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .request-item button {
          padding: 0;
          border: 0;
          background: transparent;
          color: inherit;
          text-decoration: underline;
          cursor: pointer;
        }

        label {
          font-weight: 600;
          color: var(--color-text-primary);
          font-size: 0.95rem;
        }

        input,
        select,
        textarea {
          padding: 0.75rem;
          border: 2px solid var(--color-border);
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }

        .btn-primary {
          padding: 0.75rem 1.5rem;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-message {
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
        }

        .form-message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .form-message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </form>
  );
}

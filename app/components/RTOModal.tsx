'use client';

import { useState } from 'react';

interface RTOModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: string;
  tier: string;
  price: number;
}

export default function RTOModal({ isOpen, onClose, item, tier, price }: RTOModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          item,
          tier,
          price,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      console.log('RTO Application submitted:', {
        ...formData,
        item,
        tier,
        price,
      });
      
      setMessage(
        `✓ Application received! Item: ${item} (${tier}) - $${price}/month`
      );
      
      setTimeout(() => {
        onClose();
        setFormData({
          name: '',
          dob: '',
          phone: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zipcode: '',
        });
      }, 3000);
    } catch (error) {
      setMessage('✗ Failed to submit. Please try again or call us.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2>Rent-to-Own Application</h2>
        <p className="modal-subtitle">
          {item} - {tier} (${price}/month)
        </p>

        <form onSubmit={handleSubmit} className="rto-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth *</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
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
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="CA"
                maxLength={2}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipcode">ZIP Code *</label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>

          {message && (
            <div className={`form-message ${message.startsWith('✓') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modal-content {
            background-color: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          }

          .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
          }

          h2 {
            margin: 0 0 0.5rem 0;
            color: var(--color-text-primary);
          }

          .modal-subtitle {
            color: #666;
            margin: 0 0 1.5rem 0;
            font-size: 0.95rem;
          }

          .rto-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }

          label {
            font-weight: 600;
            color: var(--color-text-primary);
            font-size: 0.9rem;
          }

          input {
            padding: 0.6rem;
            border: 2px solid var(--color-border);
            border-radius: 6px;
            font-size: 0.95rem;
            font-family: inherit;
            transition: border-color 0.2s;
          }

          input:focus {
            outline: none;
            border-color: var(--color-primary);
          }

          .btn-submit {
            padding: 0.8rem 1.5rem;
            background-color: var(--color-primary);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-top: 0.5rem;
          }

          .btn-submit:hover:not(:disabled) {
            background-color: var(--color-primary-dark);
          }

          .btn-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .form-message {
            padding: 0.75rem;
            border-radius: 6px;
            text-align: center;
            font-weight: 500;
            font-size: 0.9rem;
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

          @media (max-width: 600px) {
            .modal-content {
              padding: 1.5rem;
              width: 95%;
            }

            .form-row {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

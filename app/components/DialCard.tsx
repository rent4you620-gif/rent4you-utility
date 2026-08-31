'use client';

import { useState } from 'react';

export function DialCard() {
  const [selectedTerm, setSelectedTerm] = useState<'day' | 'month' | 'own'>('month');

  const terms = {
    day: {
      label: 'Day',
      description: 'Quick rental for immediate needs',
      example: 'Starting at $15/day',
    },
    month: {
      label: 'Month-to-Month',
      description: 'Flexible rental without long-term commitment',
      example: 'Starting at $40/month',
    },
    own: {
      label: 'Rent-to-Own',
      description: 'Build equity with every payment toward ownership',
      example: 'Starting at $45/month',
    },
  };

  return (
    <div className="dial-card">
      <div className="dial-content">
        <div className="dial-display">
          <h3>{terms[selectedTerm].label}</h3>
          <p className="dial-description">{terms[selectedTerm].description}</p>
          <p className="dial-example">{terms[selectedTerm].example}</p>
        </div>

        <div className="dial-controls">
          {(['day', 'month', 'own'] as const).map((term) => (
            <button
              key={term}
              className={`dial-button ${selectedTerm === term ? 'active' : ''}`}
              onClick={() => setSelectedTerm(term)}
            >
              {terms[term].label}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dial-card {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: 16px;
          padding: 2rem;
          color: white;
          min-width: 300px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .dial-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dial-display {
          text-align: center;
        }

        .dial-display h3 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .dial-description {
          margin: 0.75rem 0 0 0;
          font-size: 0.95rem;
          opacity: 0.95;
          line-height: 1.4;
        }

        .dial-example {
          margin: 1rem 0 0 0;
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffd700;
        }

        .dial-controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .dial-button {
          padding: 0.75rem 1.25rem;
          background-color: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .dial-button:hover {
          background-color: rgba(255, 255, 255, 0.3);
          border-color: white;
        }

        .dial-button.active {
          background-color: white;
          color: var(--color-primary);
          border-color: white;
        }

        @media (max-width: 768px) {
          .dial-card {
            padding: 1.5rem;
          }

          .dial-display h3 {
            font-size: 1.5rem;
          }

          .dial-example {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}

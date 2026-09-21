export function DialCard() {
  return (
    <div className="dial-card">
      <div className="dial-content">
        <div className="dial-display">
          <h3>Monthly rentals</h3>
          <p className="dial-description">Simple pricing with free delivery, installation, and maintenance.</p>
          <p className="dial-example">Starting at $50/month</p>
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

'use client';

const RTO_ITEMS = [
  {
    id: 1,
    name: 'Standard Washer',
    image: '/products/IMG_0922.WEBP',
    tiers: [
      { name: 'Free delivery, install & maintenance', price: 50 },
    ],
  },
  {
    id: 2,
    name: 'Standard Dryer',
    image: '/products/IMG_0923.WEBP',
    tiers: [
      { name: 'Free delivery, install & maintenance', price: 50 },
    ],
  },
  {
    id: 3,
    name: 'Washer & Dryer Combo',
    image: '/products/IMG_9434.AVIF',
    tiers: [
      { name: 'Free delivery, install & maintenance', price: 80 },
    ],
  },
];

interface RTOGridProps {
  onOpenModal: (item: string, tier: string, price: number) => void;
}

export function RTOGrid({ onOpenModal }: RTOGridProps) {
  return (
    <div className="rto-grid">
      {RTO_ITEMS.map((item) => (
        <div key={item.id} className="rto-card">
          {item.image ? (
            <img className="rto-image" src={item.image} alt={item.name} />
          ) : (
            <div className="rto-card-icon">📦</div>
          )}
          <h3>{item.name}</h3>
          <div className="rto-tiers">
            {item.tiers.map((tier, idx) => (
              <button
                key={idx}
                className="rto-tier-btn"
                disabled
                onClick={() => onOpenModal(item.name, tier.name, tier.price)}
              >
                <span className="tier-name">Coming soon</span>
                <span className="tier-price">${tier.price}/mo</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .rto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .rto-card {
          background: white;
          border: 2px solid var(--color-border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .rto-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .rto-card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .rto-image {
          width: 100%;
          height: 180px;
          object-fit: contain;
          background: #f6f7f5;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .rto-card h3 {
          margin: 0 0 1.5rem 0;
          color: var(--color-text-primary);
          font-size: 1.2rem;
        }

        .rto-tiers {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .rto-tier-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background-color: var(--color-secondary);
          border: 2px solid var(--color-secondary);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
        }

        .rto-tier-btn:disabled {
          cursor: not-allowed;
          opacity: 0.75;
        }

        .rto-tier-btn:hover:not(:disabled) {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .tier-name {
          font-size: 0.9rem;
          text-align: left;
        }

        .tier-price {
          font-size: 0.9rem;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .rto-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

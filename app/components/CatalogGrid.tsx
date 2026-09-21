const CATALOG_ITEMS = [
  {
    id: 1,
    name: 'Standard Washer',
    daily: 15,
    monthly: 45,
    image: '/products/IMG_0922.WEBP',
    icon: '🔄',
  },
  {
    id: 2,
    name: 'Standard Dryer',
    daily: 12,
    monthly: 40,
    image: '/products/IMG_0923.WEBP',
    icon: '🌬️',
  },
  {
    id: 3,
    name: 'Washer & Dryer Combo',
    daily: 25,
    monthly: 80,
    image: '/products/IMG_9434.AVIF',
    icon: '⚙️',
  },
  {
    id: 4,
    name: 'Skid Steer Electric Cement Mixer',
    daily: null,
    monthly: null,
    image: '/products/IMG_0784.jpeg',
    icon: '🏗️',
  },
];

interface CatalogGridProps {
  requestedItems: string[];
  onAddToRequest: (item: string) => void;
}

export function CatalogGrid({ requestedItems, onAddToRequest }: CatalogGridProps) {
  return (
    <div className="catalog-grid">
      {CATALOG_ITEMS.map((item) => (
        <div key={item.id} className="catalog-card">
          {item.image ? (
            <img className="catalog-image" src={item.image} alt={item.name} />
          ) : (
            <div className="catalog-icon">{item.icon}</div>
          )}
          <h3>{item.name}</h3>
          <div className="catalog-pricing">
            <div className="price-tier">
              <span className="price-label">Day</span>
              <span className="price-amount">{item.daily ? `$${item.daily}` : 'Contact'}</span>
            </div>
            <div className="price-tier">
              <span className="price-label">Month</span>
              <span className="price-amount">{item.monthly ? `$${item.monthly}` : 'for pricing'}</span>
            </div>
          </div>
          <button
            type="button"
            className={`btn btn-outline ${requestedItems.includes(item.name) ? 'added' : ''}`}
            onClick={() => onAddToRequest(item.name)}
          >
            {requestedItems.includes(item.name) ? 'Added to request' : 'Add to request'}
          </button>
        </div>
      ))}

      <style jsx>{`
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .catalog-card {
          background: white;
          border: 2px solid var(--color-border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .catalog-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .catalog-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .catalog-image {
          width: 100%;
          height: 180px;
          object-fit: contain;
          background: #f6f7f5;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .catalog-card h3 {
          margin: 0 0 1.5rem 0;
          color: var(--color-text-primary);
          font-size: 1.2rem;
        }

        .catalog-pricing {
          display: flex;
          justify-content: space-around;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background-color: var(--color-secondary);
          border-radius: 8px;
        }

        .price-tier {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .price-label {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          font-weight: 600;
        }

        .price-amount {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-top: 0.25rem;
        }

        .btn.btn-outline {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--color-primary);
          color: var(--color-primary);
          background: transparent;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
        }

        .btn.btn-outline:hover {
          background-color: var(--color-primary);
          color: white;
        }

        @media (max-width: 768px) {
          .catalog-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

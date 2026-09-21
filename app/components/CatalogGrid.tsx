const CATALOG_ITEMS = [
  {
    id: 1,
    name: 'Standard Washer',
    monthly: 50,
    image: '/products/IMG_0922.WEBP',
    icon: '🔄',
  },
  {
    id: 2,
    name: 'Standard Dryer',
    monthly: 50,
    image: '/products/IMG_0923.WEBP',
    icon: '🌬️',
  },
  {
    id: 3,
    name: 'Washer & Dryer Combo',
    monthly: 80,
    image: '/products/IMG_9434.AVIF',
    icon: '⚙️',
  },
  {
    id: 4,
    name: 'Bauer 2000 PSI Pressure Washer',
    daily: 50,
    monthly: null,
    image: '/products/IMG_0925.WEBP',
    icon: '💦',
  },
  {
    id: 5,
    name: 'Skid Steer Electric Cement Mixer',
    daily: 150,
    monthly: null,
    image: '/products/IMG_0784.jpeg',
    images: ['/products/IMG_0784.jpeg'],
    icon: '🏗️',
  },
];

interface CatalogGridProps {
  requestedItems: string[];
  onAddToRequest: (item: string) => void;
}

export function CatalogGrid({ requestedItems, onAddToRequest }: CatalogGridProps) {
  return (
    <div className="catalog-section">
      {requestedItems.length > 0 && (
        <div className="request-status" aria-live="polite">
          <strong>{requestedItems.length} item{requestedItems.length === 1 ? '' : 's'} added to your request</strong>
          <a href="#contact">Review and send request</a>
        </div>
      )}
      <div className="catalog-grid">
        {CATALOG_ITEMS.map((item) => {
          const isRequested = requestedItems.includes(item.name);
          const displayImages = item.images && item.images.length > 0 ? item.images : item.image ? [item.image] : [];

          return (
            <div key={item.id} className={`catalog-card ${isRequested ? 'requested' : ''}`}>
              {isRequested && <span className="requested-badge">Added</span>}

              {displayImages.length > 1 ? (
                <div className="catalog-gallery">
                  <img className="catalog-image" src={displayImages[0]} alt={item.name} />
                  <div className="catalog-gallery-thumbs">
                    {displayImages.slice(1).map((image, index) => (
                      <img
                        key={`${item.id}-thumb-${index}`}
                        className="catalog-gallery-thumb"
                        src={image}
                        alt={`${item.name} view ${index + 2}`}
                      />
                    ))}
                  </div>
                </div>
              ) : displayImages.length > 0 ? (
                <img className="catalog-image" src={displayImages[0]} alt={item.name} />
              ) : (
                <div className="catalog-icon">{item.icon}</div>
              )}

              <h3>{item.name}</h3>
              <div className="catalog-pricing">
                {item.daily !== null && item.daily !== undefined && (
                  <div className="price-tier">
                    <span className="price-label">Daily rental</span>
                    <span className="price-amount">${item.daily}</span>
                  </div>
                )}
                <div className="price-tier">
                  <span className="price-label">Monthly rental</span>
                  <span className="price-amount">{item.monthly ? `$${item.monthly}` : 'for pricing'}</span>
                </div>
              </div>
              <button
                type="button"
                className={`btn btn-outline ${isRequested ? 'added' : ''}`}
                onClick={() => onAddToRequest(item.name)}
              >
                {isRequested ? 'Added to request' : 'Add to request'}
              </button>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .request-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin: 2rem 0;
          padding: 1rem 1.25rem;
          border: 2px solid var(--color-primary);
          border-radius: 8px;
          background: #eaf6ee;
          color: var(--color-text-primary);
        }

        .request-status a {
          color: var(--color-primary);
          font-weight: 700;
          text-decoration: underline;
          white-space: nowrap;
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .catalog-card {
          position: relative;
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

        .catalog-card.requested {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(41, 120, 75, 0.16);
        }

        .requested-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          z-index: 1;
          padding: 0.35rem 0.65rem;
          border-radius: 999px;
          background: var(--color-primary);
          color: white;
          font-size: 0.8rem;
          font-weight: 700;
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

        .catalog-gallery {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .catalog-gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
          gap: 0.5rem;
          width: 100%;
        }

        .catalog-gallery-thumb {
          width: 100%;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          background: #f6f7f5;
          border: 1px solid var(--color-border);
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

        .btn.btn-outline.added {
          background-color: var(--color-primary);
          color: white;
        }

        @media (max-width: 600px) {
          .request-status {
            align-items: flex-start;
            flex-direction: column;
          }
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

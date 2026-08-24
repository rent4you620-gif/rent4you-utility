const items = [
  { name: 'Washer', type: 'Laundry', capacity: 'Standard & large', terms: 'Day or monthly', icon: 'washer' },
  { name: 'Dryer', type: 'Laundry', capacity: 'Electric models', terms: 'Day or monthly', icon: 'dryer' },
  { name: 'Washer + Dryer', type: 'Laundry set', capacity: 'Matched pair', terms: 'Monthly or own', icon: 'set' },
];

function ApplianceIcon({ type }: { type: string }) {
  return (
    <svg className="icon" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="7" y="4" width={type === 'set' ? 15 : 34} height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
      {type === 'set' && <rect x="26" y="4" width="15" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />}
      <circle cx={type === 'set' ? 14.5 : 24} cy="27" r={type === 'set' ? 5 : 11} fill="none" stroke="currentColor" strokeWidth="2.5" />
      {type === 'set' && <circle cx="33.5" cy="27" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />}
      <path d={type === 'set' ? 'M11 10h3m19-0h3' : 'M13 11h5m4 0h4'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CatalogGrid() {
  return (
    <div className="catalog-grid">
      {items.map((item) => (
        <article className="plate" key={item.name}>
          <div className="plate-top">
            <ApplianceIcon type={item.icon} />
            <span className="status-chip">Available by request</span>
          </div>
          <div className="plate-body">
            <h3>{item.name}</h3>
            <div className="spec-row"><span>Category</span><span>{item.type}</span></div>
            <div className="spec-row"><span>Options</span><span>{item.capacity}</span></div>
            <div className="spec-row"><span>Terms</span><span>{item.terms}</span></div>
            <a className="plate-cta" href="#contact">Check availability</a>
          </div>
        </article>
      ))}
    </div>
  );
}

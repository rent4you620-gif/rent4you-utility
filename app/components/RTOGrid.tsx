'use client';

const items = [
  { name: 'Laundry set', category: 'Appliances', route: 'Direct review', terms: 'Flexible ownership' },
  { name: 'Refrigerator', category: 'Kitchen', route: 'Partner review', terms: 'Flexible ownership' },
  { name: 'Living room set', category: 'Furniture', route: 'Partner review', terms: 'Flexible ownership' },
];

export function RTOGrid() {
  const openApplication = (item: string) => {
    window.dispatchEvent(new CustomEvent('open-rto', { detail: { item } }));
  };

  return (
    <>
      <div className="catalog-grid">
        {items.map((item) => (
          <article className="plate" key={item.name}>
            <div className="plate-top">
              <svg className="icon" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M9 38h30M12 38V18l12-8 12 8v20M19 38V26h10v12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              </svg>
              <span className={`status-chip ${item.route === 'Partner review' ? 'partner' : ''}`}>{item.route}</span>
            </div>
            <div className="plate-body">
              <h3>{item.name}</h3>
              <div className="spec-row"><span>Category</span><span>{item.category}</span></div>
              <div className="spec-row"><span>Approval</span><span>{item.route}</span></div>
              <div className="spec-row"><span>Path</span><span>{item.terms}</span></div>
              <button className="plate-cta" type="button" onClick={() => openApplication(item.name)}>Start a request</button>
            </div>
          </article>
        ))}
      </div>
      <div className="chip-row" aria-label="Expanding catalog">
        {['Bedroom', 'Dining', 'Electronics', 'More appliances'].map((item) => (
          <span className="chip" key={item}><span className="pulse" />{item} coming soon</span>
        ))}
      </div>
    </>
  );
}

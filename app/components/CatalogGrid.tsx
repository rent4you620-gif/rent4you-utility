type CatalogItem = {
  name: string;
  status: string;
  specs: [string, string][];
};

const ITEMS: CatalogItem[] = [
  {
    name: 'Washer',
    status: 'In network',
    specs: [
      ['Day rate', '$XX / day'],
      ['Month-to-month', '$XX / mo'],
      ['Delivery', 'Included'],
    ],
  },
  {
    name: 'Dryer',
    status: 'In network',
    specs: [
      ['Day rate', '$XX / day'],
      ['Month-to-month', '$XX / mo'],
      ['Delivery', 'Included'],
    ],
  },
  {
    name: 'Washer + dryer set',
    status: 'In network',
    specs: [
      ['Day rate', '$XX / day'],
      ['Month-to-month', '$XX / mo'],
      ['Delivery', 'Included'],
    ],
  },
];

const COMING_SOON = ['Refrigerators', 'Freezers', 'Sofas', 'Mattresses', 'Dining sets', 'Lawn equipment'];

function ApplianceIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3.5" y="2.5" width="17" height="19" rx="2.5" />
      <path d="M3.5 7h17" />
      <circle cx="12" cy="14.5" r="4.5" />
      <circle cx="17.3" cy="4.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CatalogGrid() {
  return (
    <>
      <div className="catalog-grid">
        {ITEMS.map((item) => (
          <article className="plate" key={item.name}>
            <div className="plate-top">
              <ApplianceIcon />
              <span className="status-chip">{item.status}</span>
            </div>
            <div className="plate-body">
              <h3>{item.name}</h3>
              {item.specs.map(([label, value]) => (
                <div className="spec-row" key={label}>
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
              <a className="plate-cta" href="#contact">
                Request this
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="chip-row" style={{ marginTop: '26px' }}>
        {COMING_SOON.map((label) => (
          <span className="chip" key={label}>
            <span className="pulse" />
            {label}
          </span>
        ))}
      </div>
    </>
  );
}

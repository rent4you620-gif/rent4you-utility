import { ItemIcon } from './icons';

interface CatalogEntry {
  id: string;
  name: string;
  specs: Array<[string, string]>;
}

// EDIT ME: replace the $XX placeholders with your real rates before launch.
const CATALOG: CatalogEntry[] = [
  {
    id: 'washer',
    name: 'Washer',
    specs: [
      ['Per day', '$XX'],
      ['Per month', '$XX'],
      ['Rent-to-own', '$XX/wk'],
      ['Delivery', 'Included'],
    ],
  },
  {
    id: 'dryer',
    name: 'Dryer',
    specs: [
      ['Per day', '$XX'],
      ['Per month', '$XX'],
      ['Rent-to-own', '$XX/wk'],
      ['Delivery', 'Included'],
    ],
  },
  {
    id: 'washer-dryer-set',
    name: 'Washer & Dryer Set',
    specs: [
      ['Per day', '$XX'],
      ['Per month', '$XX'],
      ['Rent-to-own', '$XX/wk'],
      ['Delivery', 'Included'],
    ],
  },
];

const COMING_SOON = ['Refrigerators', 'Sofas', 'Mattresses', 'Dining sets', 'Desks'];

export function CatalogGrid() {
  return (
    <>
      <div className="catalog-grid">
        {CATALOG.map((entry) => (
          <article className="plate" key={entry.id}>
            <div className="plate-top">
              <ItemIcon id={entry.id} className="icon" />
              <span className="status-chip">In stock</span>
            </div>
            <div className="plate-body">
              <h3>{entry.name}</h3>
              {entry.specs.map(([label, value]) => (
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

      <div className="chip-row">
        {COMING_SOON.map((label) => (
          <span className="chip" key={label}>
            <span className="pulse" />
            {label} — coming soon
          </span>
        ))}
      </div>
    </>
  );
}

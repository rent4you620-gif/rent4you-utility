'use client';

import { requestApply, type RTOItem } from './rto-store';

// EDIT ME: raise or lower this to change which items you approve yourself
// vs. hand off to your lease-to-own financing partner.
const SELF_APPROVAL_THRESHOLD = 500;

type CatalogEntry = {
  name: string;
  cost: number;
  monthly: number;
  term: string;
};

const ITEMS: CatalogEntry[] = [
  { name: 'Washer', cost: 450, monthly: 45, term: '12 months' },
  { name: 'Dryer', cost: 420, monthly: 42, term: '12 months' },
  { name: 'Washer + dryer set', cost: 900, monthly: 79, term: '18 months' },
  { name: 'Refrigerator', cost: 1100, monthly: 89, term: '18 months' },
  { name: 'Sofa (3-seat)', cost: 750, monthly: 65, term: '18 months' },
  { name: 'Queen mattress set', cost: 480, monthly: 48, term: '12 months' },
];

function toRTOItem(entry: CatalogEntry): RTOItem {
  return {
    ...entry,
    tier: entry.cost <= SELF_APPROVAL_THRESHOLD ? 'self' : 'partner',
  };
}

function currency(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

export function RTOGrid() {
  return (
    <div className="catalog-grid">
      {ITEMS.map(toRTOItem).map((item) => (
        <article className="plate" key={item.name}>
          <div className="plate-top">
            <svg
              className="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
              <path d="M9.5 21v-6h5v6" />
            </svg>
            <span className={item.tier === 'self' ? 'status-chip' : 'status-chip partner'}>
              {item.tier === 'self' ? 'We approve' : 'Partner financed'}
            </span>
          </div>
          <div className="plate-body">
            <h3>{item.name}</h3>
            <div className="spec-row">
              <span>Item cost</span>
              <span>{currency(item.cost)}</span>
            </div>
            <div className="spec-row">
              <span>Est. payment</span>
              <span>{currency(item.monthly)} / mo</span>
            </div>
            <div className="spec-row">
              <span>Typical term</span>
              <span>{item.term}</span>
            </div>
            <button className="plate-cta" type="button" onClick={() => requestApply(item)}>
              Apply for this
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

'use client';

import type { ReactNode } from 'react';
import { tierForCost, useAppContext } from './AppContext';

type RtoEntry = {
  name: string;
  category: string;
  term: string;
  cost: number;
  costLabel: string;
  price: string;
  icon: ReactNode;
};

const SofaIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2.5" y="9" width="19" height="9" rx="1.5" />
    <path d="M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
    <line x1="4" y1="18" x2="4" y2="20.5" />
    <line x1="20" y1="18" x2="20" y2="20.5" />
  </svg>
);

const TvIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <line x1="3" y1="20" x2="21" y2="20" />
    <line x1="12" y1="16" x2="12" y2="20" />
  </svg>
);

const FridgeIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="2" width="16" height="20" rx="1.5" />
    <line x1="4" y1="9" x2="20" y2="9" />
    <circle cx="17" cy="6" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const MattressIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="6" width="18" height="12" rx="1.5" />
    <line x1="3" y1="11" x2="21" y2="11" />
  </svg>
);

const LaptopIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <line x1="9" y1="7" x2="15" y2="7" />
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const MicrowaveIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="4" width="16" height="10" rx="1.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="12" y1="14" x2="12" y2="18" />
  </svg>
);

const RTO_ITEMS: RtoEntry[] = [
  { name: 'Sofa (3-seat)', category: 'Furniture', term: '12–24 mo to own', cost: 900, costLabel: '~$900 — edit me', price: '$XX/mo', icon: SofaIcon },
  { name: '55" Smart TV', category: 'Electronics', term: '6–12 mo to own', cost: 600, costLabel: '~$600 — edit me', price: '$XX/mo', icon: TvIcon },
  { name: 'Refrigerator', category: 'Appliances', term: '12–24 mo to own', cost: 1100, costLabel: '~$1,100 — edit me', price: '$XX/mo', icon: FridgeIcon },
  { name: 'Queen Mattress Set', category: 'Furniture', term: '6–18 mo to own', cost: 700, costLabel: '~$700 — edit me', price: '$XX/mo', icon: MattressIcon },
  { name: 'Laptop', category: 'Electronics', term: '6–12 mo to own', cost: 450, costLabel: '~$450 — edit me', price: '$XX/mo', icon: LaptopIcon },
  { name: 'Microwave', category: 'Appliances', term: '3–6 mo to own', cost: 120, costLabel: '~$120 — edit me', price: '$XX/mo', icon: MicrowaveIcon },
];

export function RTOGrid() {
  const { openRto } = useAppContext();

  return (
    <div className="catalog-grid" id="rtoGrid">
      {RTO_ITEMS.map((item) => {
        const tier = tierForCost(item.cost);
        return (
          <div className="plate" key={item.name}>
            <div className="plate-top">
              {item.icon}
              <span className={`status-chip${tier === 'partner' ? ' partner' : ''}`}>
                {tier === 'partner' ? 'Partner-financed' : 'Approved by us'}
              </span>
            </div>
            <div className="plate-body">
              <h3>{item.name}</h3>
              <div className="spec-row">
                <span>Category</span>
                <span>{item.category}</span>
              </div>
              <div className="spec-row">
                <span>Term</span>
                <span>{item.term}</span>
              </div>
              <div className="spec-row">
                <span>Item cost</span>
                <span>{item.costLabel}</span>
              </div>
              <button
                className="plate-cta"
                onClick={() => openRto({ name: item.name, price: item.price, tier })}
              >
                Apply to rent
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

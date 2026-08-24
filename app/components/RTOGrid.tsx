'use client';

import { RTO_ITEMS, SELF_APPROVAL_THRESHOLD, tierFor } from '../lib/rto';
import { openApplication } from './rtoStore';
import { ItemIcon } from './icons';

export function RTOGrid() {
  return (
    <div className="catalog-grid">
      {RTO_ITEMS.map((item) => {
        const tier = tierFor(item.cost, SELF_APPROVAL_THRESHOLD);
        const partner = tier === 'partner';

        return (
          <article className="plate" key={item.id}>
            <div className="plate-top">
              <ItemIcon id={item.id} className="icon" />
              <span className={`status-chip${partner ? ' partner' : ''}`}>
                {partner ? 'Partner financed' : 'We approve'}
              </span>
            </div>
            <div className="plate-body">
              <h3>{item.name}</h3>
              <div className="spec-row">
                <span>Est. weekly</span>
                <span>{item.weekly}/wk</span>
              </div>
              <div className="spec-row">
                <span>Term</span>
                <span>{item.term}</span>
              </div>
              <div className="spec-row">
                <span>Approval</span>
                <span>{partner ? 'Financing partner' : 'Soft check, in-house'}</span>
              </div>
              <button
                type="button"
                className="plate-cta"
                onClick={() => openApplication(item)}
              >
                Apply for this
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

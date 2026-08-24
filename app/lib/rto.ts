// Rent-to-own catalog + approval routing.
//
// EDIT ME: `cost` values are placeholders. Set your real product costs here —
// they decide which items you approve yourself and which route to your
// financing partner. Anything at or below SELF_APPROVAL_THRESHOLD is approved
// in-house; anything above it goes to the partner.
export const SELF_APPROVAL_THRESHOLD = 500;

export type ApprovalTier = 'self' | 'partner';

export interface RTOItem {
  id: string;
  name: string;
  blurb: string;
  /** Retail cost in dollars — drives the approval tier. */
  cost: number;
  /** Placeholder weekly payment shown on the card. */
  weekly: string;
  term: string;
}

export const RTO_ITEMS: RTOItem[] = [
  {
    id: 'washer',
    name: 'Washer',
    blurb: 'Top-load, 4.0 cu ft. Delivered and levelled.',
    cost: 449,
    weekly: '$XX',
    term: '52 weeks',
  },
  {
    id: 'dryer',
    name: 'Dryer',
    blurb: 'Electric, 7.0 cu ft. Vent kit included.',
    cost: 399,
    weekly: '$XX',
    term: '52 weeks',
  },
  {
    id: 'dining-set',
    name: 'Dining Set (4-seat)',
    blurb: 'Table and four chairs, flat-packed and assembled on site.',
    cost: 479,
    weekly: '$XX',
    term: '52 weeks',
  },
  {
    id: 'washer-dryer-set',
    name: 'Washer & Dryer Set',
    blurb: 'Matched pair, delivered and installed together.',
    cost: 849,
    weekly: '$XX',
    term: '78 weeks',
  },
  {
    id: 'sofa',
    name: 'Sofa (3-seat)',
    blurb: 'Fabric three-seater. Choose your colourway at approval.',
    cost: 899,
    weekly: '$XX',
    term: '78 weeks',
  },
  {
    id: 'mattress-queen',
    name: 'Queen Mattress Set',
    blurb: 'Mattress and foundation. Old set hauled away free.',
    cost: 549,
    weekly: '$XX',
    term: '78 weeks',
  },
];

/** Server-side threshold, overridable via env without a redeploy of the client. */
export function approvalThreshold(): number {
  const raw = process.env.SELF_APPROVAL_THRESHOLD;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) ? parsed : SELF_APPROVAL_THRESHOLD;
}

export function tierFor(cost: number, threshold: number = SELF_APPROVAL_THRESHOLD): ApprovalTier {
  return cost <= threshold ? 'self' : 'partner';
}

export function findItem(id: string): RTOItem | undefined {
  return RTO_ITEMS.find((item) => item.id === id);
}

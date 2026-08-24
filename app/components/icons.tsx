interface IconProps {
  className?: string;
}

export function WasherIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <rect x="8" y="5" width="32" height="38" rx="3" />
      <path d="M8 14h32" />
      <circle cx="24" cy="29" r="9" />
      <path d="M16 29c3-3 5 3 8 0s5-3 8 0" />
      <circle cx="33" cy="9.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DryerIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <rect x="8" y="5" width="32" height="38" rx="3" />
      <path d="M8 14h32" />
      <circle cx="24" cy="29" r="9" />
      <path d="M21 24.5c2.5 3-2.5 6 0 9M27.5 24.5c2.5 3-2.5 6 0 9" />
      <circle cx="33" cy="9.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SetIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <rect x="3" y="7" width="20" height="34" rx="2.5" />
      <rect x="25" y="7" width="20" height="34" rx="2.5" />
      <path d="M3 15h20M25 15h20" />
      <circle cx="13" cy="28" r="5.5" />
      <circle cx="35" cy="28" r="5.5" />
    </svg>
  );
}

export function SofaIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M7 26v-8a4 4 0 0 1 4-4h26a4 4 0 0 1 4 4v8" />
      <path d="M4 26a3 3 0 0 1 6 0v5h28v-5a3 3 0 0 1 6 0v11H4z" />
      <path d="M10 31h28" />
    </svg>
  );
}

export function BedIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M5 36V14M43 36V25" />
      <path d="M5 25h38" />
      <path d="M5 31h38" />
      <rect x="11" y="17" width="11" height="8" rx="2" />
    </svg>
  );
}

export function TableIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M4 18h40" />
      <path d="M9 18l-3 20M39 18l3 20" />
      <path d="M14 12v6M34 12v6" />
      <path d="M8 28h32" />
    </svg>
  );
}

const ICONS: Record<string, (props: IconProps) => JSX.Element> = {
  washer: WasherIcon,
  dryer: DryerIcon,
  'washer-dryer-set': SetIcon,
  sofa: SofaIcon,
  'mattress-queen': BedIcon,
  'dining-set': TableIcon,
};

export function ItemIcon({ id, className }: { id: string; className?: string }) {
  const Icon = ICONS[id] ?? WasherIcon;
  return <Icon className={className} />;
}

import type { RTOItem } from '../lib/rto';

// `RTOGrid` and `RTOModal` are rendered as siblings by `app/home.tsx`, so the
// selected item lives in a tiny module-level store rather than being threaded
// through props.
let selected: RTOItem | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSelectedItem(): RTOItem | null {
  return selected;
}

/** Server render never has a selection open. */
export function getServerSnapshot(): RTOItem | null {
  return null;
}

export function openApplication(item: RTOItem) {
  selected = item;
  emit();
}

export function closeApplication() {
  selected = null;
  emit();
}

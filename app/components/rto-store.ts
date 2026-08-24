export type RTOTier = 'self' | 'partner';

export type RTOItem = {
  name: string;
  cost: number;
  monthly: number;
  term: string;
  tier: RTOTier;
};

type Listener = (item: RTOItem) => void;

const listeners = new Set<Listener>();

/** Subscribe to "apply for this item" requests. Returns an unsubscribe function. */
export function onApplyRequest(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Ask the application modal to open for a given rent-to-own item. */
export function requestApply(item: RTOItem) {
  listeners.forEach((listener) => listener(item));
}

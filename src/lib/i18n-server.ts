import 'server-only';

export type Dict = Record<string, unknown>;

function getByPath(obj: Dict, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Dict)) {
      return (acc as Dict)[key];
    }
    return undefined;
  }, obj);
}

export function getT(dict: Dict, namespace?: string) {
  return (key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const val = getByPath(dict, fullKey);
    if (typeof val === 'string') return val;
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[i18n] Missing translation key: ${fullKey}`);
    }
    return fullKey;
  };
}



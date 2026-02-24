export function shallowDiff(
  prevProps: Record<string, any>,
  nextProps: Record<string, any>,
): Record<string, { oldVal: any; newVal: any }> {
  const changes: Record<string, { oldVal: any; newVal: any }> = {};

  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);

  const allKeys = new Set([...prevKeys, ...nextKeys]);

  for (const key of allKeys) {
    if (key === "children") continue;

    const oldVal = prevProps[key];
    const newVal = nextProps[key];

    // Performance-safe exact match check (Object.is handles NaN and -0 properly)
    if (!Object.is(oldVal, newVal)) {
      // Don't flag function reference changes as heavily since they often change (e.g., inline arrow functions)
      // but they are technically changed. We record them.
      changes[key] = { oldVal, newVal };
    }
  }

  return changes;
}

export const searchParamsEntriesToObj = (
  entries: IterableIterator<[string, string]>
) => {
  const obj: Record<string, string> = {};
  for (const [k, v] of Array.from(entries)) {
    obj[k] = v;
  }
  return obj;
};

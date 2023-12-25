export const queryParamCompare = <T extends Object, P extends T>(
  a: T,
  b: Partial<P>,
  keys: (keyof T)[]
) => {
  for (const key of keys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};

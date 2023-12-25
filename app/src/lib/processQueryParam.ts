export const processQP = (val: string | string[] | undefined | null) => {
  return val?.toString() || undefined;
};

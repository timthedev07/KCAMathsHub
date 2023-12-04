export type NextPage<
  T extends { params: Record<string, string> } = { params: {} }
> = FC<T>;

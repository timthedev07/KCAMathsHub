export type NextPageParams<T extends {}, P extends string> = {
  params: T;
  searchParams: { [_ in P]: string | string[] | undefined };
};

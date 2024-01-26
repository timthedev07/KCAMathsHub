"use client";

import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { queryParamCompare } from "../../../lib/queryParamCompare";
import { trpc } from "../../../trpc/client";
import { List } from "./List";
import { InfiniteScrollingDisplayProps } from "./props.types";

export const InfiniteScrollingDisplay: FC<InfiniteScrollingDisplayProps> = ({
  initialData,
  query,
  initialParams,
}) => {
  const [lastQRef, inView] = useInView({ triggerOnce: true });

  const { fetchNextPage, isFetching, data } =
    trpc.getQuestions.useInfiniteQuery(query, {
      getNextPageParam: (last) => last.nextCursor,
      enabled:
        !!query &&
        !queryParamCompare(initialParams, query, [
          "c",
          "k",
          "q",
          "u",
          "y",
          "a",
          "s",
        ]),
      keepPreviousData: true,
    });

  useEffect(() => {
    (async () => {
      if (inView && !isFetching) {
        await fetchNextPage();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isFetching]);

  const questions = data
    ? data?.pages.flatMap(({ questions }) => questions)
    : initialData;

  return (
    <List isFetching={isFetching} lastQRef={lastQRef} questions={questions} />
  );
};

"use client";

import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { trpc } from "../../../trpc/client";
import { List } from "./List";
import { InfiniteScrollingDisplayProps } from "./props.types";

export const InfiniteScrollingDisplay: FC<InfiniteScrollingDisplayProps> = ({
  nextCursor,
  initialData,
}) => {
  const [lastQRef, inView, entry] = useInView({ triggerOnce: true });

  const { fetchNextPage, hasNextPage, isFetching, data } =
    trpc.getQuestions.useInfiniteQuery(
      {},
      {
        getNextPageParam: (last) => last.nextCursor,
        initialCursor: nextCursor,
        enabled: false,
        keepPreviousData: true,
      }
    );

  useEffect(() => {
    (async () => {
      if (inView /** && hasNextPage && !isFetching */) {
        console.log("in view");
        console.log({ hasNextPage, isFetching });
        await fetchNextPage();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isFetching]);

  const questions = data
    ? data.pages.flatMap(({ questions }) => questions)
    : initialData;

  console.log(data?.pages);

  return <List lastQRef={lastQRef} questions={questions} />;
};

"use client";

import { inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import { FC } from "react";
import { pageURLs } from "../../lib/pageURLGen";
import { getQuestions } from "../../server/crud/questions/getQuestions";
import { trpc } from "../../trpc/client";

type QueryOutput = inferProcedureOutput<typeof getQuestions>;

interface InfiniteScrollingDisplayProps {
  initialData: QueryOutput["questions"];
  nextCursor: QueryOutput["nextCursor"];
}

export const InfiniteScrollingDisplay: FC<InfiniteScrollingDisplayProps> = ({
  nextCursor,
  initialData,
}) => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
  } = trpc.getQuestions.useInfiniteQuery(
    {},
    {
      getNextPageParam: (last) => last.nextCursor,
      initialCursor: nextCursor,
      enabled: false,
    }
  );

  const questions = data
    ? data.pages.flatMap(({ questions }) => questions)
    : initialData;

  return (
    <ol className="w-1/2 flex flex-col py-8 p-8 md:px-12 lg:px-16 gap-4 items-center ">
      {questions.map(({ id, title }) => (
        <Link passHref className="w-full" key={id} href={pageURLs.question(id)}>
          <li className="w-full h-32 bg-blue-700/10 rounded-2xl" key={id}>
            <h2>{title}</h2>
          </li>
        </Link>
      ))}
    </ol>
  );
};

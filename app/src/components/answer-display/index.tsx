"use client";

import { FC, useRef, useState } from "react";
import { trpc } from "../../trpc/client";
import { LoadingSpin } from "../LoadingSpin";
import { AnswerForm } from "../answer-form";
import { AnswerListItem } from "./Item";

interface AnswersDisplay {
  quid: string;
  uid?: string;
  isAnswerer: boolean;
  isOwner: boolean;
}

const AnswersDisplay: FC<AnswersDisplay> = ({
  quid,
  isAnswerer,
  isOwner,
  uid,
}) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const topRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = trpc.getQuestionAnswers.useQuery({
    quid,
    pageNum,
  });

  const scrollToTop = () => {
    if (!topRef.current) return;
    topRef.current.scrollIntoView();
  };

  if (!isLoading && (!data || !data.length)) {
    return <></>;
  }

  return (
    <>
      <div className="min-w-[300px] max-w-[700px] w-full py-24 md:px-0 px-12">
        <h2 className="font-semibold text-3xl">Answers</h2>
        <div
          className={`w-full flex-col ${isLoading ? "h-72" : ""}`}
          ref={topRef}
        >
          {isLoading || data === undefined ? (
            <LoadingSpin />
          ) : (
            <ul className="w-full flex flex-col py-8">
              {data.map((each, ind) => (
                <AnswerListItem
                  data={each}
                  isLast={ind === data.length - 1}
                  key={each.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      <hr className="h-[1px] border-0 bg-slate-400/10 mx-auto w-11/12" />
      <div className="min-w-[300px] max-w-[700px] w-full py-24 md:px-0 px-12">
        {uid && (isAnswerer || isOwner) ? (
          <AnswerForm
            key={data ? data[0].id : 0}
            scrollToTop={scrollToTop}
            operationType="answer"
            quid={quid}
            uid={uid}
          />
        ) : null}
      </div>
    </>
  );
};

export default AnswersDisplay;

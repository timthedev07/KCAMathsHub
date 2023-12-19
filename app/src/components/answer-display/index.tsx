"use client";

import { FC, useRef, useState } from "react";
import { trpc } from "../../trpc/client";
import { LoadingSpin } from "../LoadingSpin";
import { AnswerForm } from "../answer-form";
import { Pagination } from "../pagination";
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
    if (!topRef.current) console.log("shit");
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  if (!isLoading && (!data || !data.answers.length)) {
    return null;
  }

  return (
    <>
      <div
        className="min-w-[300px] max-w-[700px] w-full py-24 md:px-0 px-12"
        ref={topRef}
      >
        <h2 className="font-semibold text-3xl">Answers</h2>
        <div className={`w-full flex-col ${isLoading ? "h-72" : ""}`}>
          {isLoading || data === undefined ? (
            <LoadingSpin />
          ) : (
            <Pagination
              currPage={pageNum}
              setCurrPage={(v) => {
                setPageNum(v);
                setTimeout(() => {
                  scrollToTop();
                }, 100);
              }}
              totalPages={data.totalPages}
            >
              <ul className="w-full flex flex-col py-8">
                {data.answers.map((each, ind) => (
                  <AnswerListItem
                    data={each}
                    isLast={ind === data.answers.length - 1}
                    key={each.id}
                  />
                ))}
              </ul>
            </Pagination>
          )}
        </div>
      </div>
      <hr className="h-[1px] border-0 bg-slate-400/10 mx-auto w-11/12" />
      <div className="min-w-[300px] max-w-[700px] w-full py-24 md:px-0 px-12">
        {uid && (isAnswerer || isOwner) ? (
          <AnswerForm
            key={data ? data.answers[0].id : 0}
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

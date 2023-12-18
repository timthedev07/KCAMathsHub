"use client";

import { FC, useState } from "react";
import { trpc } from "../../trpc/client";
import { LoadingSpin } from "../LoadingSpin";
import { AnswerListItem } from "./Item";

interface AnswersDisplay {
  quid: string;
}

const AnswersDisplay: FC<AnswersDisplay> = ({ quid }) => {
  const [pageNum, setPageNum] = useState<number>(1);

  const { data, isLoading } = trpc.getQuestionAnswers.useQuery({
    quid,
    pageNum,
  });

  if (!isLoading && (!data || !data.length)) {
    return <></>;
  }

  return (
    <div className="min-w-[300px] max-w-[700px] w-full py-24 md:px-0 px-12">
      <h2 className="font-semibold text-3xl">Answers</h2>
      <div className={`w-full flex-col ${isLoading ? "h-72" : ""}`}>
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
  );
};

export default AnswersDisplay;

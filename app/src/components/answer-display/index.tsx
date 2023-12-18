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

  return (
    <div className={`w-full flex-col ${isLoading ? "h-72" : ""}`}>
      {isLoading || !data ? (
        <LoadingSpin />
      ) : (
        <ul>
          {data?.map((each) => (
            <AnswerListItem data={each} key={each.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnswersDisplay;

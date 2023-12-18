"use client";

import { FC } from "react";
import { trpc } from "../../../../trpc/client";

interface QuestionDisplayProps {
  aid: string;
}

const QuestionDisplay: FC<QuestionDisplayProps> = ({ aid }) => {
  const { isLoading, data, error } = trpc.getQuestionByAnswer.useQuery({ aid });
  // const q =
  return <div></div>;
};

export default QuestionDisplay;

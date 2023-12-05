import { FC } from "react";
import { UserQuestionListDisplay } from "../../../../../types/prisma/payloads/userQs";

interface QuestionProps {
  question: UserQuestionListDisplay;
}

export const Question: FC<QuestionProps> = ({ question: { title } }) => {
  return <li>{title}</li>;
};

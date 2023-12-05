import { FC } from "react";
import { UserQuestionListDisplay } from "../../../../types/prisma/payloads/userQs";

interface ItemDisplayProps {
  question: UserQuestionListDisplay;
}

export const ItemDisplay: FC<ItemDisplayProps> = ({ question: {} }) => {
  return <div></div>;
};

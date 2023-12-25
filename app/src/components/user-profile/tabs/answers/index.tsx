import { TabItem } from "flowbite-react";
import { FC } from "react";
import { trpc } from "../../../../trpc/client";

interface AnswersTabProps {
  uid: string;
}

export const AnswersTab: FC<AnswersTabProps> = ({ uid }) => {
  const { data } = trpc.getUserAnswers.useQuery({ uid });
  return <TabItem title="Answers"></TabItem>;
};

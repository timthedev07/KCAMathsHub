import { TabItem } from "flowbite-react";
import { FC } from "react";
import { AList } from "./AList";

interface AnswersTabProps {
  uid: string;
}

export const AnswersTab: FC<AnswersTabProps> = ({ uid }) => {
  return (
    <TabItem title="Answers">
      <div className="flex flex-col gap-8 w-full h-[70vh] py-8 lg:py-0">
        <AList uid={uid} />
      </div>
    </TabItem>
  );
};

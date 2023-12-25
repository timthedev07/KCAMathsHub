"use client";
import { Tabs } from "flowbite-react";
import { FC } from "react";
import { QList } from "../main/item-display/QList";

interface QuestionsTabProps {
  uid: string;
}

export const QuestionsTab: FC<QuestionsTabProps> = ({ uid }) => {
  return (
    <Tabs.Item title="Questions">
      <div className="flex flex-col gap-8 w-full h-[70vh] py-8 lg:py-0">
        <QList className="h-full" uid={uid} />
      </div>
    </Tabs.Item>
  );
};

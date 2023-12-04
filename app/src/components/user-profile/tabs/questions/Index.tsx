"use client";
import { Tabs } from "flowbite-react";
import { FC } from "react";

interface QuestionsTabProps {}

export const QuestionsTab: FC<QuestionsTabProps> = ({}) => {
  return <Tabs.Item title="Questions"></Tabs.Item>;
};

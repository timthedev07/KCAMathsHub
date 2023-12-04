"use client";
import { TabItem, Tabs } from "flowbite-react";
import { Session } from "next-auth";
import { FC } from "react";
import { MainProfileTab } from "./Main";
import { QuestionsTab } from "./questions/index";
import { roleChecker } from "../../../lib/accessGuard";
import { ReferralTab } from "./Referral";

interface ProfileTabsProps {
  session: Session | null;
}

export const ProfileTabs: FC<ProfileTabsProps> = ({ session }) => {
  const u = session?.user;

  if (!u) return null;

  return (
    <Tabs aria-label="Default tabs" style="underline">
      <MainProfileTab />
      <QuestionsTab />
      {roleChecker(u.roles, ["answerer"]) ? (
        <TabItem title="Answers"></TabItem>
      ) : (
        <></>
      )}
      <ReferralTab session={session} />
    </Tabs>
  );
};

"use client";
import { TabItem, Tabs } from "flowbite-react";
import { Session } from "next-auth";
import { FC } from "react";
import { MainProfileTab } from "./Main";
import { QuestionsTab } from "./questions/index";
import { roleChecker } from "../../../lib/accessGuard";
import { ReferralTab } from "./Referral";

interface ProfileTabsProps {
  user: Session["user"];
}

export const viewPanelBase = "bg-slate-900 rounded-xl shadow-2xl";

export const ProfileTabs: FC<ProfileTabsProps> = ({ user }) => {
  const u = user;

  if (!u) return null;

  return (
    <Tabs aria-label="Default tabs" style="underline">
      {/* main profile tab */}
      <TabItem active title="Profile">
        <MainProfileTab user={u} />
      </TabItem>

      {roleChecker(u.roles, ["inquirer"]) ? (
        <TabItem title="Questions">
          <QuestionsTab />
        </TabItem>
      ) : null}

      {roleChecker(u.roles, ["answerer"]) ? (
        <TabItem title="Answers"></TabItem>
      ) : null}
      <TabItem title="Referral">
        <ReferralTab />
      </TabItem>
    </Tabs>
  );
};

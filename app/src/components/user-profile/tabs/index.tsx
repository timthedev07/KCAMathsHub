"use client";
import { TabItem, Tabs } from "flowbite-react";
import { Session } from "next-auth";
import { FC } from "react";
import { roleChecker } from "../../../lib/accessGuard";
import { ReferralTab } from "./Referral";
import { MainProfileTab } from "./main";
import { QuestionsTab } from "./questions/index";

interface ProfileTabsProps {
  user: Session["user"];
  isCurrUser: boolean;
}

export const viewPanelBase = "bg-slate-900/40 rounded-xl shadow-2xl";

export const ProfileTabs: FC<ProfileTabsProps> = ({ user, isCurrUser }) => {
  const u = user;

  if (!u) return null;

  return (
    <Tabs style="underline">
      {/* main profile tab */}
      <TabItem active title="Profile">
        <MainProfileTab user={u} sameUser={isCurrUser} />
      </TabItem>

      {roleChecker(u.roles, ["moderator", "answerer"]) ? (
        <TabItem title="Questions">
          <QuestionsTab />
        </TabItem>
      ) : null}

      {roleChecker(u.roles, ["answerer"]) ? (
        <TabItem title="Answers"></TabItem>
      ) : null}

      {roleChecker(u.roles, ["moderator"]) ? (
        <TabItem title="Moderations"></TabItem>
      ) : null}
      {isCurrUser && (
        <TabItem title="Referral">
          <ReferralTab />
        </TabItem>
      )}
    </Tabs>
  );
};

export default ProfileTabs;

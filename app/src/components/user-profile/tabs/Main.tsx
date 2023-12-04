"use client";
import { Avatar, TabItem, Textarea } from "flowbite-react";
import { useSession } from "next-auth/react";
import { FC, PropsWithChildren } from "react";
import { UsernameEditable } from "../username-editable";
import { BadgesDisplay } from "../BadgesDisplay";
import { getCurrYear } from "../../../lib/getCurrYear";
import { roleChecker } from "../../../lib/accessGuard";

interface MainProfileTabProps {}

const ProfileSubDisplay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="shadow-2xl flex-1 bg-slate-900 rounded-xl h-1/2">
      {children}
    </div>
  );
};

export const MainProfileTab: FC<MainProfileTabProps> = ({}) => {
  const session = useSession();

  if (!session.data) return null;

  const u = session.data.user;

  return (
    <TabItem active title="Profile">
      <div className="w-full h-auto lg:h-[70vh] flex lg:flex-row flex-col gap-8 p-2">
        {/* This is the main profile section */}
        <div className="shadow-2xl flex-1 w-full h-full bg-slate-900 rounded-xl flex flex-col py-8 px-8 md:px-16">
          <div className="flex items-center gap-8 py-8 flex-col xl:flex-row">
            <Avatar size="xl" rounded img={u.image || undefined} />
            <div className="flex flex-col gap-3 flex-1">
              <UsernameEditable session={session.data} />
              <span className="text-sm text-neutral-300/70 px-2">
                {u.email}
              </span>
              {u.joinedYear ? (
                <span className="text-sm text-neutral-300/70 px-2">
                  Year {getCurrYear(u.joinedDate, u.joinedYear)}
                </span>
              ) : (
                <></>
              )}
              <BadgesDisplay roles={u.roles} />
            </div>
          </div>
          <div className="flex flex-col h-full gap-4">
            <span className="font-semibold">Bio</span>
            <Textarea className="h-full resize-none text-sm"></Textarea>
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1 h-96 lg:h-auto">
          {roleChecker(u.roles, ["answerer", "moderator"]) ? (
            <ProfileSubDisplay>
              {u.roles.includes("moderator") ? (
                <></>
              ) : u.roles.includes("answerer") ? (
                <></>
              ) : null}
            </ProfileSubDisplay>
          ) : null}

          {/* questions display */}
          <ProfileSubDisplay>
            {u.roles.includes("moderator") ? (
              <></>
            ) : (
              u.roles.includes("answerer")
            )}
          </ProfileSubDisplay>
        </div>
      </div>
    </TabItem>
  );
};

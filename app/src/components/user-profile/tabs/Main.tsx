"use client";
import { Avatar, Textarea } from "flowbite-react";
import { FC, PropsWithChildren } from "react";
import { UsernameEditable } from "../username-editable";
import { BadgesDisplay } from "../BadgesDisplay";
import { getCurrYear } from "../../../lib/getCurrYear";
import { roleChecker } from "../../../lib/accessGuard";
import { Session } from "next-auth";
import { viewPanelBase } from ".";

interface MainProfileTabProps {
  user: Session["user"];
}

const ProfileSubDisplay: FC<PropsWithChildren> = ({ children }) => {
  return <div className={`${viewPanelBase} flex-1 h-1/2`}>{children}</div>;
};

export const MainProfileTab: FC<MainProfileTabProps> = ({ user }) => {
  const u = user;

  return (
    <div className="w-full sm:w-10/12 min-w-[460px] sm:mx-auto lg:w-full h-auto lg:h-[70vh] flex lg:flex-row flex-col lg:gap-8 p-2">
      {/* This is the main profile section */}
      <div
        className={`flex-1 h-full ${viewPanelBase} flex flex-col py-8 px-8 md:px-12`}
      >
        <div className="flex flex-col mb-8 gap-6">
          <div className="flex items-center gap-4 md:gap-8 pt-8 flex-col lg:flex-row">
            <Avatar size="lg" rounded img={u.image || undefined} />
            <div className="flex flex-col gap-3 flex-1">
              <UsernameEditable />
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
              <BadgesDisplay className="xl:flex hidden" roles={u.roles} />
            </div>
          </div>
          <BadgesDisplay
            center
            className="xl:hidden flex flex-wrap mx-auto"
            roles={u.roles}
          />
        </div>

        <div className="flex flex-col h-full gap-4">
          <span className="font-semibold">Bio</span>
          <Textarea className="min-h-[156px] h-full resize-none text-sm"></Textarea>
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-1 h-96 md:h-auto px-8">
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
          {u.roles.includes("moderator") ? <></> : u.roles.includes("answerer")}
        </ProfileSubDisplay>
      </div>
    </div>
  );
};

"use client";
import { Avatar, Tooltip } from "flowbite-react";
import { FC } from "react";
import { UsernameEditable } from "./username-editable";
import { BadgesDisplay } from "../../BadgesDisplay";
import { getCurrYear } from "../../../../lib/getCurrYear";
import { roleChecker } from "../../../../lib/accessGuard";
import { Session } from "next-auth";
import { viewPanelBase } from "..";
import { EditableTextArea } from "./EditableTextArea";
import { BiSolidHelpCircle } from "react-icons/bi";
import { DAYS_BETWEEN_BIO_UPDATE } from "../../../../data/updateIntervals";
import { ProfileSubDisplay } from "./ProfileSubDisplay";
import { QList } from "./item-display/QList";

interface MainProfileTabProps {
  user: Session["user"];
  sameUser?: boolean;
}

export const MainProfileTab: FC<MainProfileTabProps> = ({
  user: u,
  sameUser = false,
}) => {
  return (
    <div className="w-full sm:w-10/12 min-w-[460px] sm:mx-auto lg:w-full h-auto lg:h-[70vh] flex lg:flex-row flex-col lg:gap-8 p-2">
      {/* This is the main profile section */}
      <div
        className={`flex-1 h-full ${viewPanelBase} flex flex-col py-8 px-8 md:px-12`}
      >
        <div className="flex flex-col mb-8 gap-6">
          <div className="flex items-center gap-4 md:gap-8 pt-8 flex-col lg:flex-row">
            <Avatar
              size={"lg"}
              className="w-20 h-20"
              rounded
              img={u.image || undefined}
            />
            <div className="flex flex-col gap-3">
              <UsernameEditable />
              <span className="text-sm text-neutral-300/70 px-2 break-words">
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
          <span className="font-semibold flex gap-1.5 text-lg items-center">
            Bio{" "}
            {sameUser ? (
              <Tooltip
                content={`Bios can only be updated once very ${DAYS_BETWEEN_BIO_UPDATE} days`}
              >
                <BiSolidHelpCircle className="w-5 h-5 cursor-pointer text-slate-100/90 transition duration-200 hover:text-slate-100" />
              </Tooltip>
            ) : null}
          </span>
          <EditableTextArea user={u} sameUser={sameUser} />
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-1 lg:h-full md:h-auto py-8 lg:py-0 lg:px-8">
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

        <QList uid={u.id} />
      </div>
    </div>
  );
};

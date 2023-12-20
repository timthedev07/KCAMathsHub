"use client";
import { Tooltip } from "flowbite-react";
import { Session } from "next-auth";
import { FC } from "react";
import { BiSolidHelpCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { viewPanelBase } from "..";
import { DAYS_BETWEEN_BIO_UPDATE } from "../../../../constants/updateIntervals";
import { getCurrYear } from "../../../../lib/getCurrYear";
import { ProfileImgDisplay } from "../../../ProfileImgDisplay";
import { BadgesDisplay } from "../../BadgesDisplay";
import { EditableTextArea } from "./EditableTextArea";
import { QList } from "./item-display/QList";
import { UsernameEditable } from "./username-editable";

interface MainProfileTabProps {
  user: Session["user"];
  sameUser: boolean;
}

export const MainProfileTab: FC<MainProfileTabProps> = ({
  user: u,
  sameUser = false,
}) => {
  return (
    <div className="w-full sm:w-10/12 min-w-[460px] sm:mx-auto lg:w-full h-auto lg:h-[70vh] flex lg:flex-row flex-col gap-8 p-2">
      {/* This is the main profile section */}
      <div
        className={`lg:w-1/2 h-full ${viewPanelBase} flex flex-col py-8 px-8 md:px-12`}
      >
        <div className="flex flex-col mb-8 gap-6">
          <div className="flex items-center gap-4 md:gap-8 pt-8 flex-col lg:flex-row">
            <div className="w-20 h-20">
              <ProfileImgDisplay
                src={u.image}
                className="aspect-square w-full"
              />
            </div>

            <div className="flex flex-col gap-3">
              <UsernameEditable userData={u} editable={sameUser} />
              <Tooltip content={u.email} placement="top">
                <span className="text-sm text-neutral-300/70 px-2 flex gap-1 items-center cursor-pointer hover:text-neutral-200/80 transition duration-20">
                  <MdEmail className="w-5 h-5" />
                  Email
                </span>
              </Tooltip>
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
            // center
            className="xl:hidden flex flex-wrap mx-0 md:mx-auto lg:mx-0"
            roles={u.roles}
          />
        </div>

        <div className="flex flex-col h-full gap-4">
          <span className="font-semibold flex gap-1.5 text-lg items-center">
            Bio{" "}
            {sameUser ? (
              <Tooltip
                content={`Bios can only be updated once every ${DAYS_BETWEEN_BIO_UPDATE} day${
                  DAYS_BETWEEN_BIO_UPDATE > 1 ? "s" : ""
                }`}
              >
                <BiSolidHelpCircle className="w-5 h-5 cursor-pointer text-slate-100/90 transition duration-200 hover:text-slate-100" />
              </Tooltip>
            ) : null}
          </span>
          <EditableTextArea user={u} sameUser={sameUser} />
        </div>
      </div>
      <div className="flex flex-col gap-8 lg:w-1/2 lg:h-full md:h-auto py-8 lg:py-0">
        {u.roles.includes("moderator") ? (
          <></>
        ) : u.roles.includes("answerer") ? (
          <></>
        ) : (
          <QList uid={u.id} />
        )}
      </div>
    </div>
  );
};

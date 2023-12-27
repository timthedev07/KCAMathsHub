import { inferProcedureOutput } from "@trpc/server";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { FC } from "react";
import { FaUserSecret } from "react-icons/fa";
import { dateTimeDisplay } from "../../../../lib/datetimeDisplay";
import { pageURLs } from "../../../../lib/pageURLGen";
import { getUserAnswers } from "../../../../server/crud/answers/getUserAnswers";
import { Accepted, Approved, Moderated } from "../../../ItemBadges";
import { QCategoryBadge } from "../../../categories/QCategoryBadge";

interface Answer {
  answer: inferProcedureOutput<typeof getUserAnswers>[number];
}

const Anonymous = () => (
  <div className="bg-amber-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUserSecret className="w-5 h-5 text-amber-400" />
  </div>
);

export const Answer: FC<Answer> = ({
  answer: {
    accepted,
    anonymous,
    id,
    moderated,
    question: { title, categories },
    timestamp,
    approved,
  },
}) => {
  return (
    <Link href={pageURLs.viewAnswer(id)} passHref={true}>
      <li className="py-4 px-6 hover:bg-slate-300/10 transition duration-200 cursur-pointer flex flex-col gap-3 group">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-2 w-[70%]">
            <span className="truncate font-semibold text-white/90 group-hover:text-white transition duration-300">
              <span className="text-white/60 font-normal">A to Q:</span> {title}
            </span>
            <span className="text-xs text-white/60">
              {dateTimeDisplay(timestamp)}
            </span>
          </div>
          <div
            className={`gap-2 ${
              moderated || accepted || anonymous ? "flex" : "hidden"
            }`}
          >
            {anonymous ? <Anonymous /> : null}
            {moderated ? (
              approved ? (
                <Tooltip content="Approved by moderator">
                  <Approved />
                </Tooltip>
              ) : (
                <Tooltip content="Moderated">
                  <Moderated />
                </Tooltip>
              )
            ) : null}
            {accepted ? (
              <Tooltip content="Accepted">
                <Accepted />
              </Tooltip>
            ) : null}
          </div>
        </div>
        <ul className="flex gap-2 items-start grow-[1] flex-wrap">
          {categories.map((each, ind) => (
            <QCategoryBadge name={each.name} ind={ind} key={each.name} />
          ))}
        </ul>
      </li>
    </Link>
  );
};

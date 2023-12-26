import { inferProcedureOutput } from "@trpc/server";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { FC } from "react";
import { FaCheckCircle, FaUser, FaUserSecret } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { dateTimeDisplay } from "../../../../lib/datetimeDisplay";
import { pageURLs } from "../../../../lib/pageURLGen";
import { getUserAnswers } from "../../../../server/crud/answers/getUserAnswers";
import { QCategoryBadge } from "../../../categories/QCategoryBadge";

interface Answer {
  answer: inferProcedureOutput<typeof getUserAnswers>[number];
}

const Check = () => (
  <div className="bg-green-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaCheckCircle className="w-5 h-5 text-green-400" />
  </div>
);

const Moderated = () => (
  <div className="bg-blue-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUser className="w-5 h-5 text-blue-400" />
  </div>
);

const Approved = () => (
  <div className="bg-green-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUserCheck className="w-5 h-5 text-green-400" />
  </div>
);

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
    <Link href={pageURLs.editAnswer(id)} passHref={true}>
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
                <Check />
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

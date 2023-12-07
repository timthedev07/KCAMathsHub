import { FC } from "react";
import { UserQuestionListDisplay } from "../../../../../types/prisma/payloads/userQs";
import Link from "next/link";
import { pageURLs } from "../../../../../lib/pageURLGen";
import { QCategoryBadge } from "../../../../QCategoryBadge";
import { FaCheckCircle } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { dateTimeDisplay } from "../../../../../lib/datetimeDisplay";

interface QuestionProps {
  question: UserQuestionListDisplay;
}

const Check = () => (
  <div className="bg-green-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaCheckCircle className="w-5 h-5 text-green-400" />
  </div>
);

const Anonymous = () => (
  <div className="bg-amber-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUserSecret className="w-5 h-5 text-amber-400" />
  </div>
);

export const Question: FC<QuestionProps> = ({
  question: { title, id, categories, answered, timestamp, anonymous },
}) => {
  return (
    <Link href={pageURLs.question(id)} passHref={true}>
      <li className="py-4 px-6 hover:bg-slate-300/10 transition duration-200 cursur-pointer flex flex-col gap-3 group">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-2 w-[70%]">
            <span className="truncate font-semibold text-white/90 group-hover:text-white transition duration-300">
              {title}
            </span>
            <span className="text-xs text-white/60">
              {dateTimeDisplay(timestamp)}
            </span>
          </div>
          <div
            className={`flex gap-2 ${
              answered || anonymous ? "block" : "hidden"
            }`}
          >
            {anonymous ? <Anonymous /> : null}
            {answered ? <Check /> : null}
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

import Link from "next/link";
import { FC } from "react";
import { dateTimeDisplay } from "../../../../../lib/datetimeDisplay";
import { pageURLs } from "../../../../../lib/pageURLGen";
import { UserQuestionListDisplay } from "../../../../../types/prisma/payloads/userQs";
import { Accepted, Anonymous, Boosted } from "../../../../ItemBadges";
import { QCategoryBadge } from "../../../../categories/QCategoryBadge";

interface QuestionProps {
  question: UserQuestionListDisplay;
}

export const Question: FC<QuestionProps> = ({
  question: {
    title,
    id,
    categories,
    answered,
    timestamp,
    anonymous,
    boosted: _boosted,
  },
}) => {
  const boosted = _boosted > 0;
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
              boosted || answered || anonymous ? "flex" : "hidden"
            }`}
          >
            {boosted ? <Boosted /> : null}
            {anonymous ? <Anonymous /> : null}
            {answered ? <Accepted /> : null}
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

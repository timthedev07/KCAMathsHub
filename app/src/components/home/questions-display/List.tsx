import Link from "next/link";
import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { dateTimeDisplay } from "../../../lib/datetimeDisplay";
import { pageURLs } from "../../../lib/pageURLGen";
import { QCategoryBadge } from "../../categories/QCategoryBadge";
import { ProfileImgDisplay } from "../../image/ProfileImgDisplay";
import { LoadingSpin } from "../../loading/loading-spin";
import { Button } from "../../reusable/Button";
import { QueryOutput } from "./props.types";

interface ListProps {
  questions: QueryOutput["questions"];
  lastQRef: any;
  isFetching?: boolean;
}

const Check = () => (
  <div className="bg-green-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaCheckCircle className="w-5 h-5 text-green-400" />
  </div>
);

export const List: FC<ListProps> = ({ questions, lastQRef, isFetching }) => {
  return (
    <ol className="w-full flex flex-col py-8 gap-8 items-center">
      {questions.map(
        (
          {
            id,
            title,
            timestamp,
            answered,
            anonymous,
            categories,
            questioner,
            content,
          },
          ind
        ) => (
          <li
            className="w-full bg-blue-500/10 flex flex-col rounded-2xl py-10 px-8 xl:px-12 hover:bg-blue-500/[0.125] transition duration-200 flex flex-col gap-6 group"
            key={id}
            ref={ind === questions.length - 1 ? lastQRef : null}
          >
            <div className="flex justify-between items-center ">
              <div className="flex flex-col gap-6 w-full">
                <span className="truncate text-2xl font-semibold text-white/90 group-hover:text-white transition duration-300">
                  {title}
                </span>
                <div className="flex gap-3 items-center">
                  <div className="flex gap-2 items-center w-fit">
                    <ProfileImgDisplay
                      className="w-6 h-6"
                      src={!anonymous ? questioner?.image : null}
                    />
                    <span
                      className={`text-white/70 text-sm ${
                        anonymous ? "italic" : "font-mono"
                      }`}
                    >
                      {!anonymous ? questioner?.username : "Anonymous"}
                    </span>
                  </div>
                  <span className="text-sm text-white/50">
                    on {dateTimeDisplay(timestamp)}
                  </span>
                </div>
              </div>
              <div
                className={`flex gap-2 ${
                  answered || anonymous ? "block" : "hidden"
                }`}
              >
                {answered ? <Check /> : null}
              </div>
            </div>
            <ul className="flex gap-2 items-start flex-wrap">
              {categories.map((each, ind) => (
                <QCategoryBadge name={each.name} ind={ind} key={each.name} />
              ))}
            </ul>
            <p className="w-full text-sm text-white/70">{content}</p>
            <Button className="w-fit ml-auto" color={"blue"} size="sm">
              <Link href={pageURLs.question(id)}>Read more</Link>
              <FaAnglesRight className="ml-2" />
            </Button>
          </li>
        )
      )}
      {isFetching && (
        <div className="h-32">
          <LoadingSpin />
        </div>
      )}
    </ol>
  );
};

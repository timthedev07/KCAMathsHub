import dynamic from "next/dynamic";
import Link from "next/link";
import { FC } from "react";
import { FaCheck } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { HiChevronDoubleUp } from "react-icons/hi";
import { dateTimeDisplay } from "../../../lib/datetimeDisplay";
import { pageURLs } from "../../../lib/pageURLGen";
import { QCategoryBadge } from "../../categories/QCategoryBadge";
import { ProfileImgDisplay } from "../../image/ProfileImgDisplay";
import { LoadingSpin } from "../../loading/loading-spin";
import { QueryOutput } from "./props.types";

const Button = dynamic(
  async () => (await import("../../reusable/Button")).Button,
  { ssr: false }
);

interface ListProps {
  questions: QueryOutput["questions"];
  lastQRef: any;
  isFetching?: boolean;
}

export const List: FC<ListProps> = ({ questions, lastQRef, isFetching }) => {
  return (
    <ol className="w-full flex flex-col py-8 gap-8 items-center">
      {questions.map(
        (
          {
            id,
            title,
            timestamp,
            anonymous,
            categories,
            questioner,
            content,
            yearGroupAsked,
            studentStage,
            answered,
            boosted,
          },
          ind
        ) => (
          <li
            className={`w-full ${
              boosted
                ? "hover:bg-yellow-500/[0.27] bg-yellow-500/30"
                : "hover:bg-blue-500/10 bg-blue-500/[0.125]"
            } flex flex-col rounded-2xl py-10 px-8 xl:px-12 transition duration-200 flex flex-col gap-6 group`}
            key={id}
            ref={ind === questions.length - 1 ? lastQRef : null}
          >
            <div className="flex flex-col w-full">
              <span className="text-2xl font-semibold flex justify-between mb-6">
                <h2 className={(boosted && "max-w-[90%]") || ""}>{title}</h2>
                {boosted && (
                  <HiChevronDoubleUp className="text-yellow-400 w-8 h-8" />
                )}
              </span>
              <div className="flex gap-3 flex-col xl:flex-row xl:items-center">
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
                    {!anonymous
                      ? questioner?.username || "deleted user"
                      : "Anonymous"}
                  </span>
                </div>
                <span className="text-sm text-white/50">
                  on {dateTimeDisplay(timestamp)}
                </span>
              </div>
            </div>
            <ul className="flex gap-2 items-start flex-wrap">
              {categories.map((each, ind) => (
                <QCategoryBadge name={each.name} ind={ind} key={each.name} />
              ))}
            </ul>
            <p className="w-full text-sm text-white/70">{content}</p>
            <div className="h-8 flex justify-start gap-3 items-center">
              {answered && (
                <div className="text-xs flex text-white/80 border rounded-full border-green-600/80 bg-green-500/50 py-1.5 px-4 items-center gap-2">
                  Answered <FaCheck />
                </div>
              )}
              <div className="text-xs flex border rounded-full border-teal-600/80 bg-teal-500/50 py-1.5 px-4 items-center gap-2">
                Y{yearGroupAsked}, {studentStage}
              </div>

              <Button className="w-fit ml-auto" color={"blue"} size="sm">
                <Link href={pageURLs.question(id)}>Read more</Link>
                <FaAnglesRight className="ml-2" />
              </Button>
            </div>
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

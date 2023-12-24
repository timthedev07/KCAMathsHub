import dynamic from "next/dynamic";
import Link from "next/link";
import { FC } from "react";
import { FaAnglesRight } from "react-icons/fa6";
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
          { id, title, timestamp, anonymous, categories, questioner, content },
          ind
        ) => (
          <li
            className="w-full bg-blue-500/10 flex flex-col rounded-2xl py-10 px-8 xl:px-12 hover:bg-blue-500/[0.125] transition duration-200 flex flex-col gap-6 group"
            key={id}
            ref={ind === questions.length - 1 ? lastQRef : null}
          >
            <div className="flex flex-col gap-6 w-full">
              <span className="text-2xl font-semibold text-white/90 group-hover:text-white transition duration-300">
                {title}
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
                    {!anonymous ? questioner?.username : "Anonymous"}
                  </span>
                </div>
                <span className="text-sm text-white/50">
                  on {dateTimeDisplay(timestamp)}
                </span>
              </div>
            </div>
            {/* <div
                className={`flex gap-2 w-8 ${answered ? "block" : "hidden"}`}
              >
                {answered ? <Check /> : null}
              </div> */}
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

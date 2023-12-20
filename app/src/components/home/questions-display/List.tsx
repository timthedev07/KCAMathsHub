import Link from "next/link";
import { FC } from "react";
import { pageURLs } from "../../../lib/pageURLGen";
import { QueryOutput } from "./props.types";

interface ListProps {
  questions: QueryOutput["questions"];
  lastQRef: any;
}

export const List: FC<ListProps> = ({ questions, lastQRef }) => {
  return (
    <ol className="w-full flex flex-col py-8 gap-4 items-center">
      {questions.map(({ id, title }, ind) => (
        <Link passHref className="w-full" key={id} href={pageURLs.question(id)}>
          <li
            className="w-full h-32 bg-blue-700/10 rounded-2xl"
            key={id}
            ref={ind === questions.length - 1 ? lastQRef : null}
          >
            <h2>{title}</h2>
          </li>
        </Link>
      ))}
    </ol>
  );
};

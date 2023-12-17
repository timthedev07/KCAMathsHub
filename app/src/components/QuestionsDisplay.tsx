import Link from "next/link";
import { FC } from "react";
import { pageURLs } from "../lib/pageURLGen";
import { SSRCaller } from "../server";

export const getSSRProps = async () => {
  const qs = await SSRCaller.getQuestions({});
  return qs;
};

interface QuestionsDisplayProps {}

export const QuestionsDisplay: FC<QuestionsDisplayProps> = async ({}) => {
  const qs = await getSSRProps();

  return (
    <ul className="flex flex-col p-12 dev-border-cyan">
      {qs.map((each) => (
        <Link key={each.id} href={pageURLs.question(each.id)}>
          <li>{each.title}</li>
        </Link>
      ))}
    </ul>
  );
};

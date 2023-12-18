import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { pageURLs } from "../../lib/pageURLGen";
import { getQuestionAnswers } from "../../server/crud/answers/getQuestionAnswers";
import { OptionalLinkWrapper } from "../OptionalLinkWrapper";
import { ProfileImgDisplay } from "../ProfileImgDisplay";

interface AnswerListItemProps {
  data: inferProcedureOutput<typeof getQuestionAnswers>[number];
}

export const AnswerListItem: FC<AnswerListItemProps> = ({ data }) => {
  const anonymous = data.anonymous;
  const { answerer } = data;

  return (
    <li className="flex flex-col">
      <div className="">
        <OptionalLinkWrapper
          hasLink={Boolean(!anonymous && answerer)}
          href={pageURLs.user(answerer?.username || "")}
        >
          <div className="flex gap-3 items-center w-fit">
            <ProfileImgDisplay className="w-8 h-8" src={answerer?.image} />
            <span className={`text-white/80 ${anonymous ? "italic" : ""}`}>
              {answerer?.username || "Anonymous"}
            </span>
          </div>
        </OptionalLinkWrapper>
        <span>
          {anonymous ? "Anonymous" : data.answerer?.username || "deleted user"}
        </span>
      </div>
      <div></div>
    </li>
  );
};

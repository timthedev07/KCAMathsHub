"use client";
import { inferProcedureOutput } from "@trpc/server";
import { useSession } from "next-auth/react";
import { MDXRemote } from "next-mdx-remote";
import { FC } from "react";
import { roleChecker } from "../../lib/accessGuard";
import { dateTimeDisplay } from "../../lib/datetimeDisplay";
import { pageURLs } from "../../lib/pageURLGen";
import { getQuestionAnswers } from "../../server/crud/answers/getQuestionAnswers";
import { OptionalLinkWrapper } from "../OptionalLinkWrapper";
import { ProfileImgDisplay } from "../ProfileImgDisplay";
import { AttachmentList } from "../attachments";
import { mdxCustomComponents } from "../mdx/components";
import { LabelErrorWrapper } from "../reusable/WithLabelWrapper";
import { StyledWrapper } from "../richtext/StyledWrapper";

interface AnswerListItemProps {
  data: inferProcedureOutput<typeof getQuestionAnswers>[number];
  isLast: boolean;
}

export const AnswerListItem: FC<AnswerListItemProps> = ({ data, isLast }) => {
  const anonymous = data.anonymous;
  const { answerer } = data;
  const { data: session, status } = useSession();
  const canMod = Boolean(
    session && roleChecker(session.user.roles, ["moderator"])
  );
  const canEdit = Boolean(
    session && data.answerer?.username === session.user.username
  );

  return (
    <li className="flex flex-col gap-8 px-8 lg:px-12 py-8">
      <div className="flex justify-between items-center">
        <OptionalLinkWrapper
          hasLink={Boolean(!anonymous && answerer)}
          href={pageURLs.user(answerer?.username || "")}
        >
          <div className="flex gap-3 items-center w-fit">
            <ProfileImgDisplay className="w-8 h-8" src={answerer?.image} />
            <span
              className={`text-white/90 text-lg ${anonymous ? "italic" : ""}`}
            >
              {anonymous
                ? "Anonymous"
                : data.answerer?.username || "deleted user"}
            </span>
          </div>
        </OptionalLinkWrapper>
        <i className="text-sm text-white/40">
          {dateTimeDisplay(data.timestamp)}
        </i>
      </div>
      <LabelErrorWrapper label="Proposed answer">
        <StyledWrapper className="overflow-x-scroll">
          <div className="overflow-x-scroll min-h-[100px] [&>*]:mb-4 [&>p]:text-white/80 [&>p]:text-sm">
            <MDXRemote {...data.content} components={mdxCustomComponents} />
          </div>
        </StyledWrapper>
      </LabelErrorWrapper>
      {data.attachments.length ? (
        <LabelErrorWrapper label="Attachments">
          <AttachmentList attachments={data.attachments} />
        </LabelErrorWrapper>
      ) : null}
      {!isLast ? (
        <hr className="bg-slate-400/20 my-8 h-[1px] w-full border-0" />
      ) : null}
    </li>
  );
};

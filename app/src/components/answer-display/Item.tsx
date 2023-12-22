"use client";
import { inferProcedureOutput } from "@trpc/server";
import { useSession } from "next-auth/react";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { FC } from "react";
import { FaCheckCircle, FaUserCheck } from "react-icons/fa";
import { MdChecklist, MdEdit, MdRateReview } from "react-icons/md";
import { DeletionButtonWithConfirmation } from "../../app/questions/[quid]/DeletionButtonWithConfirmation";
import { roleChecker } from "../../lib/accessGuard";
import { dateTimeDisplay } from "../../lib/datetimeDisplay";
import { pageURLs } from "../../lib/pageURLGen";
import { getQuestionAnswers } from "../../server/crud/answers/getQuestionAnswers";
import { ToastLevel } from "../TimedMessageToast";
import { AttachmentList } from "../attachments";
import { OptionalLinkWrapper } from "../helpers/OptionalLinkWrapper";
import { ProfileImgDisplay } from "../image/ProfileImgDisplay";
import { mdxCustomComponents } from "../mdx/components";
import { Button } from "../reusable/Button";
import { LabelErrorWrapper } from "../reusable/WithLabelWrapper";
import { StyledWrapper } from "../richtext/StyledWrapper";
import { AcceptButtonWithConfirmation } from "./AcceptButtonWithConfirmation";

interface AnswerListItemProps {
  data: inferProcedureOutput<typeof getQuestionAnswers>["answers"][number];
  isLast: boolean;
  currPage: number;
  displayToast: (_: string, __: ToastLevel) => void;
  isAnswered: boolean;
  moderate: (_: string, __: number) => void;
}

export const AnswerListItem: FC<AnswerListItemProps> = ({
  data,
  isLast,
  currPage,
  displayToast,
  isAnswered,
  moderate,
}) => {
  const anonymous = data.anonymous;
  const { answerer, accepted } = data;
  const { data: session } = useSession();
  const canMod = Boolean(
    session &&
      roleChecker(session.user.roles, ["moderator"]) &&
      data.moderations.every(
        (val) => val.moderator?.username !== session.user.username
      )
  );
  const canEdit = Boolean(
    session?.user && data.answerer?.username === session.user.username
  );
  const canAccept = Boolean(!data.accepted && !isAnswered && canEdit);
  const moderated = data.moderated && data.moderations.some((v) => v.approval);

  return (
    <li
      className={`flex flex-col gap-8 px-8 lg:px-12 py-8 ${
        accepted && moderated
          ? "rounded-xl bg-emerald-500/20"
          : accepted
          ? "rounded-xl bg-green-500/20"
          : moderated
          ? "rounded-xl bg-cyan-500/20"
          : ""
      }`}
    >
      <div className="flex flex-col items-start gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
        <OptionalLinkWrapper
          hasLink={Boolean(!anonymous && answerer)}
          href={pageURLs.user(answerer?.username || "")}
        >
          <div className="flex gap-3 items-center w-fit">
            <ProfileImgDisplay
              className="w-8 h-8"
              src={!anonymous ? answerer?.image : null}
            />
            <span
              className={`text-white/90 ${anonymous ? "italic" : "font-mono"}`}
            >
              {anonymous
                ? "Anonymous"
                : data.answerer?.username || "deleted user"}
            </span>
          </div>
        </OptionalLinkWrapper>
        <div className="text-sm text-white/40 flex flex-col gap-1 text-left md:text-right">
          <span>
            Posted on <i>{dateTimeDisplay(data.timestamp)}</i>
          </span>
          {data.editedAt && (
            <span>
              Edited on <i>{dateTimeDisplay(data.timestamp)}</i>
            </span>
          )}
        </div>
      </div>
      <LabelErrorWrapper
        label={
          <span className="flex gap-3 items-center">
            Proposed answer{" "}
            {accepted && (
              <FaCheckCircle className="w-4.5 h-4.5 text-green-400" />
            )}
            {moderated && (
              <FaUserCheck className="w-4.5 h-4.5 text-green-400" />
            )}
          </span>
        }
      >
        <StyledWrapper className="overflow-x-scroll mt-2">
          <div className="overflow-x-scroll max-h-[600px] overflow-y-auto min-h-[100px] [&>*]:mb-4 [&>p]:text-white/80 [&>p]:text-sm">
            <MDXRemote {...data.content} components={mdxCustomComponents} />
          </div>
        </StyledWrapper>
      </LabelErrorWrapper>
      {data.attachments.length ? (
        <LabelErrorWrapper label="Attachments">
          <AttachmentList attachments={data.attachments} />
        </LabelErrorWrapper>
      ) : null}
      {data.moderations.length && (
        <Button pill color={!data.accepted ? "info" : "success"}>
          <MdChecklist className="mr-2 w-5 h-5" />
          See Moderations
        </Button>
      )}
      <div className="h-8 w-full flex gap-4 justify-center md:justify-end">
        {canMod && (
          <Button color="purple" onClick={() => moderate(data.id, currPage)}>
            Moderate
            <MdRateReview className="ml-2" />
          </Button>
        )}
        {canAccept && (
          <AcceptButtonWithConfirmation
            currPage={currPage}
            aid={data.id}
            quid={data.questionId}
            color="purple"
          />
        )}
        {canEdit && (
          <>
            <Link className="h-full" href={pageURLs.editAnswer(data.id)}>
              <Button color="purple" className="h-8">
                Edit
                <MdEdit className="ml-1" />
              </Button>
            </Link>
            <DeletionButtonWithConfirmation
              currPage={currPage}
              quid={data.questionId}
              aid={data.id}
              color="purple"
              entity="answer"
              isOwner
              uid={session!.user.id}
              onSuccess={() => {
                displayToast("Answer deleted!", "success");
              }}
            />
          </>
        )}
      </div>
      {!isLast ? (
        <hr className="bg-slate-400/20 my-8 h-[1px] w-full border-0" />
      ) : null}
    </li>
  );
};

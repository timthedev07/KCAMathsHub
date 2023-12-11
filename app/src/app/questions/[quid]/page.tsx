import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { FaCheckCircle } from "react-icons/fa";
import remarkGfm from "remark-gfm";
import { ProfileImgDisplay } from "../../../components/ProfileImgDisplay";
import { AttachmentList } from "../../../components/attachments";
import { mdxCustomComponents } from "../../../components/mdx/components";
import { Button } from "../../../components/reusable/Button";
import { getServerSession } from "../../../lib/authoptions";
import { dateTimeDisplay } from "../../../lib/datetimeDisplay";
import { pageURLs } from "../../../lib/pageURLGen";
import { SSRCaller } from "../../../server";
import { NextPage } from "../../../types/nextpage";
import { DeletionButtonWithConfirmation } from "./DeletionButtonWithConfirmation";

interface Props {
  params: { quid: string };
}

const OptionalLinkWrapper: FC<
  PropsWithChildren<{ hasLink: boolean; href: string }>
> = ({ children, hasLink, href }) => {
  return hasLink ? (
    <Link prefetch={false} href={href}>
      {children}
    </Link>
  ) : (
    children
  );
};

const getSSRProps = async (quid: string) => {
  const question = await SSRCaller.getQuestion({ quid });
  const session = await getServerSession();

  if (!question) {
    redirect(pageURLs.error("Question not found..."));
  }

  const isOwner = session?.user.id === question.questionerId;

  return { u: session?.user, question, isOwner };
};

const ap = "px-5";

const Question: NextPage<Props> = async ({ params: { quid } }) => {
  const {
    isOwner,
    question: {
      questioner,
      title,
      content,
      attachments,
      anonymous,
      timestamp,
      answered,
    },
    u,
  } = await getSSRProps(quid);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="min-w-[300px] max-w-[700px] w-full flex flex-col gap-12 py-24 md:px-0 px-12">
          <div className="flex flex-col gap-4">
            <h1
              className={`font-bold text-4xl break-words w-full flex justify-between items-center ${
                answered ? "bg-green-300/20 py-4 rounded-xl " + ap : ""
              }`}
            >
              <span>{title}</span>
              {answered ? (
                <FaCheckCircle className="text-green-400 w-6 h-6" />
              ) : null}
            </h1>
            <span className={`text-sm text-white/60 ${answered ? ap : ""}`}>
              {dateTimeDisplay(timestamp)}
            </span>
            <div
              className={`mt-5 flex justify-between items-center ${
                answered ? ap : ""
              }`}
            >
              <OptionalLinkWrapper
                hasLink={!anonymous}
                href={pageURLs.user(questioner?.id || "")}
              >
                <div className="flex gap-3 items-center w-fit">
                  <ProfileImgDisplay
                    className="w-8 h-8"
                    src={questioner?.image}
                  />
                  <span
                    className={`text-white/80 ${anonymous ? "italic" : ""}`}
                  >
                    {questioner?.username || "Anonymous"}
                  </span>
                </div>
              </OptionalLinkWrapper>
            </div>
            <div className="flex gap-3 ml-auto">
              {u && (u.roles.includes("answerer") || isOwner) ? (
                <Button color={"dark"}>Answer</Button>
              ) : null}
              {u && isOwner ? (
                <DeletionButtonWithConfirmation
                  isOwner={isOwner}
                  quid={quid}
                  uid={u.id}
                />
              ) : null}
            </div>
          </div>
          <hr className="h-[1px] border-0 bg-slate-300/30 w-full" />
          <div className="overflow-x-scroll min-h-[200px]">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  format: "md",
                },
              }}
              components={mdxCustomComponents}
            />
          </div>

          <h2 className="font-semibold text-3xl">Attachments</h2>

          <AttachmentList attachments={attachments} />
        </div>
      </div>
    </>
  );
};

export default Question;

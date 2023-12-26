import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { FaCheck, FaUser, FaUserCheck } from "react-icons/fa";
import { MdLink } from "react-icons/md";
import remarkGfm from "remark-gfm";
import { ModListWithTrigger } from "../../../components/ModListWithTrigger";
import { AttachmentList } from "../../../components/attachments";
import { QCategoryBadge } from "../../../components/categories/QCategoryBadge";
import { OptionalLinkWrapper } from "../../../components/helpers/OptionalLinkWrapper";
import { ProfileImgDisplay } from "../../../components/image/ProfileImgDisplay";
import { mdxCustomComponents } from "../../../components/mdx/components";
import { StyledWrapper } from "../../../components/richtext/StyledWrapper";
import { dateTimeDisplay } from "../../../lib/datetimeDisplay";
import { pageURLs } from "../../../lib/pageURLGen";
import { SSRCaller } from "../../../server";
import { NextPageParams } from "../../../types/nextPageParam";

const getSSRProps = async (aid: string) => {
  const a = await SSRCaller.getAnswer({ aid });
  if (!a) notFound();
  return a;
};

const IconMap = {
  approved: FaUserCheck,
  moderated: FaUser,
  accepted: FaCheck,
};

const Badge: FC<
  PropsWithChildren<{
    ct: "approved" | "moderated" | "accepted";
  }>
> = ({ ct }) => {
  const Icon = IconMap[ct];
  return (
    <div
      className={`flex gap-2 items-center py-1.5 px-4 text-xs rounded-full ${
        ct === "accepted"
          ? "bg-green-500/30"
          : ct === "approved"
          ? "bg-lime-500/30"
          : "bg-blue-500/30"
      }`}
    >
      <Icon className={`w-4`} />
      {ct.charAt(0).toUpperCase() + ct.slice(1)}
    </div>
  );
};

const ViewQuestionPage: FC<NextPageParams<{ aid: string }, "">> = async ({
  params: { aid },
}) => {
  const {
    question,
    content,
    accepted,
    anonymous,
    answerer,
    approved,
    attachments,
    moderated,
    timestamp,
  } = await getSSRProps(aid);

  return (
    <>
      <div className="flex flex-col xl:w-1/2 max-w-[800px] px-16 mx-auto gap-16 pt-24 pb-72">
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-4xl flex gap-2">
            <span className="font-normal text-white/40">To:</span>
            <OptionalLinkWrapper
              hasLink={!!question}
              href={pageURLs.question(question?.id)}
            >
              <span className="flex gap-2">
                {question.title}
                <MdLink className="w-10 h-10 text-cyan-600 transition duration-200 hover:text-cyan-700" />
              </span>
            </OptionalLinkWrapper>
          </h1>

          <div className="flex gap-3">
            {accepted && <Badge ct={"accepted"} />}
            {approved && <Badge ct={"approved"} />}
            {moderated && <Badge ct={"moderated"} />}
          </div>

          <span className={`text-sm text-white/60`}>
            {dateTimeDisplay(timestamp)}
          </span>
          <ul className={`flex gap-2 items-start grow-[1] flex-wrap`}>
            {question.categories.map((each, ind) => (
              <QCategoryBadge name={each.name} ind={ind} key={each.name} />
            ))}
          </ul>
          <hr className="h-[1px] bg-slate-400/20 border-0" />

          <div className={`mt-5 flex justify-between items-center`}>
            <OptionalLinkWrapper
              hasLink={!anonymous}
              href={pageURLs.user(answerer?.username || "")}
            >
              <div className="flex gap-3 items-center w-fit">
                <ProfileImgDisplay className="w-8 h-8" src={answerer?.image} />
                <span className={`text-white/80 ${anonymous ? "italic" : ""}`}>
                  {answerer?.username || "Anonymous"}
                </span>
              </div>
            </OptionalLinkWrapper>
          </div>
          <StyledWrapper className="mx-auto">
            <div className="overflow-x-scroll w-full max-h-[600px] overflow-y-auto min-h-[100px] [&>*]:mb-4 [&>p]:text-white/80 [&>p]:text-sm">
              <MDXRemote
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    format: "md",
                  },
                }}
                source={content}
                components={mdxCustomComponents}
              />
            </div>
          </StyledWrapper>

          <AttachmentList attachments={attachments} />

          {answerer && (
            <ModListWithTrigger
              moderated={moderated}
              quid={question.id}
              answererUsername={answerer.username}
              accepted={accepted}
              aid={aid}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ViewQuestionPage;

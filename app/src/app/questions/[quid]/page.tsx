import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { HiChevronDoubleUp } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import remarkGfm from "remark-gfm-legacy";
import { AttachmentList } from "../../../components/attachments";
import { QCategoryBadge } from "../../../components/categories/QCategoryBadge";
import { OptionalLinkWrapper } from "../../../components/helpers/OptionalLinkWrapper";
import { ProfileImgDisplay } from "../../../components/image/ProfileImgDisplay";
import { LoadingSpin } from "../../../components/loading/loading-spin";
import { mdxCustomComponents } from "../../../components/mdx/components";
import { Button } from "../../../components/reusable/Button";
import { getServerSession } from "../../../lib/authoptions";
import { dateTimeDisplay } from "../../../lib/datetimeDisplay";
import { getMetadata } from "../../../lib/getMetadata";
import { pageURLs } from "../../../lib/pageURLGen";
import { truncateAtWord } from "../../../lib/truncateAtWord";
import { SSRCaller } from "../../../server";
import { NextPage } from "../../../types/nextpage";
import { BoostButtonWithConfirmation } from "./BoostButtonWithConfirmation";
import { DeletionButtonWithConfirmation } from "./DeletionButtonWithConfirmation";
import { MarkAsAnswered } from "./MarkAsAnswered";

interface Props {
  params: { quid: string };
}

const AnswersDisplay = dynamic(
  () => import("../../../components/answer-display/index"),
  { ssr: false, loading: () => <LoadingSpin className="mb-32 min-h-64" /> }
);

export async function generateMetadata({
  params: { quid },
}: Props): Promise<Metadata> {
  // read route params

  // fetch data
  const question = await SSRCaller.getQuestion({ quid });

  return getMetadata({
    title: question ? `${question.title}` : "Question not found",
    description: truncateAtWord(question?.content || "", 60),
  });
}

const getSSRProps = async (quid: string) => {
  const question = await SSRCaller.getQuestion({ quid });
  const session = await getServerSession();

  if (!question) {
    notFound();
  }

  const isOwner = session?.user.id === question.questionerId;

  return { u: session?.user, question, isOwner };
};

const ap = "px-6";

const Question: NextPage<Props> = async ({ params: { quid } }) => {
  const {
    isOwner,
    question: {
      questioner,
      title,
      content,
      attachments,
      anonymous,
      boosted: _boosted,
      timestamp,
      answered,
      categories,
      yearGroupAsked,
      answers,
    },
    u,
  } = await getSSRProps(quid);

  const isAnswerer = Boolean(u && u.roles.includes("answerer"));
  const boosted = _boosted > 0;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="min-w-[300px] max-w-[700px] w-full flex flex-col gap-12 py-24 md:px-0 px-12">
          <div className="flex flex-col gap-4">
            <h1
              className={`font-bold text-2xl lg:text-4xl break-words w-full flex justify-between items-center ${
                answered
                  ? "bg-green-300/20 py-6 rounded-xl " + ap
                  : boosted
                  ? "bg-yellow-300/20 py-6 rounded-xl " + ap
                  : ""
              }`}
            >
              <span className="mr-8">{title}</span>
              <div className="w-6 h-6">
                {answered ? (
                  <FaCheckCircle className="text-green-400 w-6 h-6" />
                ) : boosted ? (
                  <HiChevronDoubleUp className="text-yellow-400 w-8 h-8" />
                ) : null}
              </div>
            </h1>
            <span
              className={`text-sm text-white/60 ${
                answered || boosted ? ap : ""
              }`}
            >
              {dateTimeDisplay(timestamp)}
            </span>
            <ul
              className={`flex gap-2 items-start grow-[1] flex-wrap ${
                answered || boosted ? ap : ""
              }`}
            >
              {categories.map((each, ind) => (
                <QCategoryBadge name={each.name} ind={ind} key={each.name} />
              ))}
            </ul>
            <div
              className={`mt-5 flex justify-between items-center ${
                answered || boosted ? ap : ""
              }`}
            >
              <OptionalLinkWrapper
                hasLink={!anonymous}
                href={pageURLs.user(questioner?.username || "")}
              >
                <div className="flex gap-3 items-center w-fit">
                  <ProfileImgDisplay
                    className="w-8 h-8"
                    src={questioner?.image}
                  />
                  <span
                    className={`text-white/80 ${anonymous ? "italic" : ""}`}
                  >
                    {questioner?.username || "Anonymous"}{" "}
                    {yearGroupAsked ? `asked in Y${yearGroupAsked}` : ""}
                  </span>
                </div>
              </OptionalLinkWrapper>
            </div>
            <div
              className={`flex justify-end gap-3 flex-wrap w-full ${
                u && isOwner ? "block" : "hidden"
              }`}
            >
              {u && isOwner && u.credits >= 50 && !boosted && !answered && (
                <BoostButtonWithConfirmation
                  isOwner={isOwner}
                  quid={quid}
                  uid={u.id}
                />
              )}
              {u && isOwner && (
                <Button color="blue">
                  <Link href={pageURLs.editQuestion(quid)}>Edit</Link>
                  <MdEdit className="ml-2" />
                </Button>
              )}
              {u && isOwner && !answered ? (
                <MarkAsAnswered quid={quid} isOwner={isOwner} uid={u.id} />
              ) : null}
              {u &&
              isOwner &&
              answers.every((each) =>
                Boolean(!each.moderated && !each.accepted)
              ) ? (
                <DeletionButtonWithConfirmation
                  isOwner={isOwner}
                  quid={quid}
                  uid={u.id}
                />
              ) : null}
            </div>
          </div>
          <hr className="h-[1px] border-0 bg-slate-300/30 w-full" />
          <div className="overflow-x-scroll min-h-[200px] [&>*]:my-4 [&>p]:text-white/80 [&>p]:text-sm">
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

          {attachments.length ? (
            <h2 className="font-semibold text-2xl lg:text-3xl">Attachments</h2>
          ) : null}

          <AttachmentList attachments={attachments} />
        </div>
        <AnswersDisplay
          isAnswered={answered}
          uid={u?.id}
          isAnswerer={isAnswerer}
          isOwner={isOwner}
          quid={quid}
        />
      </div>
    </>
  );
};

export default Question;

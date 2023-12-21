import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
import { MdLink } from "react-icons/md";
import { AnswerForm } from "../../../../components/answer-form";
import { getServerSession } from "../../../../lib/authoptions";
import { pageURLs } from "../../../../lib/pageURLGen";
import { SSRCaller } from "../../../../server";
import { NextPageParams } from "../../../../types/nextPageParam";

const getSSRProps = async (aid: string) => {
  const session = await getServerSession();
  if (!session) notFound();

  const { data: answer } = await SSRCaller.getAnswerForEdit({
    aid,
    userId: session?.user.id,
  });

  if (!answer) {
    notFound();
  }

  const { user } = session;

  return {
    user,
    answer,
  };
};

const Page: FC<NextPageParams<{ aid: string }>> = async ({
  params: { aid },
}) => {
  const { answer, user } = await getSSRProps(aid);

  return (
    <div className="flex flex-col xl:w-1/2 max-w-[800px] mx-auto gap-16 pt-24">
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-4xl">Edit your answer</h1>
        <Link
          className="text-white/60 transition duration-200 hover:text-cyan-500/80 flex gap-2 items-center"
          href={pageURLs.question(answer.questionId)}
        >
          Question
          <MdLink className="w-6 h-6" />
        </Link>
        <hr className="h-[1px] bg-slate-400/20 border-0" />
      </div>
      <AnswerForm
        operationType="update"
        quid={answer.questionId}
        uid={user.id}
        defaultValues={{
          files: answer.attachments.map((each) => {
            return {
              ...each,
              id: each.url,
            };
          }),
          formData: {
            anonymous: answer.anonymous,
            content: answer.content,
          },
          aid,
        }}
      />
    </div>
  );
};

export default Page;

import { redirect } from "next/navigation";
import { FC } from "react";
import { QuestionForm } from "../../../../components/QuestionForm";
import { roleChecker } from "../../../../lib/accessGuard";
import { getServerSession } from "../../../../lib/authoptions";
import { pageURLs } from "../../../../lib/pageURLGen";
import { SSRCaller } from "../../../../server";
import { NextPageParams } from "../../../../types/nextPageParam";

const getSSRProps = async (quid: string) => {
  const session = await getServerSession();
  if (!session) redirect(pageURLs.notFound());

  const a = await SSRCaller.getQuestion({ quid });

  if (!a) redirect(pageURLs.notFound());

  if (
    roleChecker(session.user.roles, ["answerer"]) &&
    a?.questionerId !== session.user.id
  )
    redirect(pageURLs.notFound());

  return { user: session.user, question: a };
};

const QuestionEditPage: FC<NextPageParams<{ quid: string }>> = async ({
  params: { quid },
}) => {
  const { question, user } = await getSSRProps(quid);

  return (
    <>
      <QuestionForm
        userId={user.id}
        defaultValues={{
          anonymous: question.anonymous,
          categories: question.categories.map((each) => each.name),
          content: question.content,
          files: question.attachments.map((each) => {
            return {
              ...each,
              id: each.url,
            };
          }),
          title: question.title,
        }}
        quid={quid}
        operationType="update"
      />
    </>
  );
};

export default QuestionEditPage;

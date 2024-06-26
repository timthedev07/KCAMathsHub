"use client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { FC } from "react";
import { LoadingSpin } from "../../../../components/loading/loading-spin";
import { roleChecker } from "../../../../lib/roleChecker";
import { trpc } from "../../../../trpc/client";

const QuestionForm = dynamic(
  async () =>
    (await import("../../../../components/forms/QuestionForm")).QuestionForm,
  { ssr: false, loading: () => <LoadingSpin size="lg" /> }
);

interface ClientContentProps {
  quid: string;
}

export const ClientContent: FC<ClientContentProps> = ({ quid }) => {
  const { data: question, status } = trpc.getQuestion.useQuery({ quid });
  const { data: session, status: authStatus } = useSession();

  if (authStatus === "loading" || status === "loading") {
    return <LoadingSpin />;
  }

  if (!session) notFound();

  if (!question) notFound();

  if (
    question &&
    roleChecker(session.user.roles, ["answerer"]) &&
    question?.questionerId !== session.user.id
  )
    notFound();

  return (
    <>
      <QuestionForm
        userId={session.user.id}
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

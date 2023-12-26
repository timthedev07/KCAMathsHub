"use client";

import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { FC } from "react";
import { LoadingSpin } from "../../components/loading/loading-spin";
import { roleChecker } from "../../lib/roleChecker";
import { trpc } from "../../trpc/client";

const Page: FC = () => {
  const { data: question, status } = trpc.getQuestion.useQuery({
    quid: "clqlhkgyk0000tsomaqfuvq9p",
  });
  const { data: session, status: authStatus } = useSession();

  if (authStatus === "loading" || status === "loading") {
    return <LoadingSpin />;
  }

  if (!session) notFound();

  if (!question) notFound();

  // if (
  //   question &&
  //   roleChecker(session.user.roles, ["answerer"]) &&
  //   question?.questionerId !== session.user.id
  // )
  //   notFound();

  roleChecker;
  return <>{JSON.stringify({ question, status })}</>;
};

export default Page;

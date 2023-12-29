import type { FC } from "react";
import { getMetadata } from "../../../../lib/getMetadata";
import { NextPageParams } from "../../../../types/nextPageParam";
import { ClientContent } from "./ClientContent";

export const metadata = getMetadata({
  description: "Edit your question on KCAMathsHub",
  title: "Edit question",
});

const QuestionEditPage: FC<NextPageParams<{ quid: string }, "">> = ({
  params,
}) => {
  return <ClientContent {...params} />;
};

export default QuestionEditPage;

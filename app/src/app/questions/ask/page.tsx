import type { FC } from "react";
import { QuestionForm } from "../../../components/forms/QuestionForm";
import { getMetadata } from "../../../lib/getMetadata";

export const metadata = getMetadata({
  title: "Ask a question",
  description: "Ask a question on KCAMathsHub",
});

const AskPage: FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="px-10 md:px-8 lg:px-16 mt-12 w-full text-start text-4xl font-semibold">
        Ask a Question
      </h1>
      <QuestionForm />
    </div>
  );
};

export default AskPage;

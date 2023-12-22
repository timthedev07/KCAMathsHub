import { FC } from "react";
import { QuestionForm } from "../../../components/forms/QuestionForm";

const AskPage: FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="px-2 md:px-8 lg:px-16 mt-12 w-full text-start text-4xl font-semibold">
        Ask a Question
      </h1>
      <QuestionForm />
    </div>
  );
};

export default AskPage;

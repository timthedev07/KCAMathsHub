import { FC } from "react";
import { getServerSession } from "../../../lib/authoptions";
import { QuestionForm } from "../../../components/QuestionForm";

const UnauthenticatedPage: FC = () => {
  return <>HEY</>;
};

const AskPage: FC = async ({}) => {
  const session = await getServerSession();
  const u = session?.user;

  if (!u) {
    return <UnauthenticatedPage />;
  }

  return (
    <div>
      <h1 className="w-full text-4xl font-bold pl-10 pt-10">Ask a question today!</h1>
      <QuestionForm userId={u.id} />
    </div>
  );
};

export default AskPage;

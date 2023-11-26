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
      <h1 className="w-full text-2xl font-bold">Ask a question today!</h1>
      <QuestionForm userId={u.id} />
    </div>
  );
};

export default AskPage;

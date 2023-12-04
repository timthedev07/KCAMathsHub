import { SignInButton } from "../components/SignInButton";
import { QuestionForm } from "../components/QuestionForm";
import { QuestionsDisplay } from "../components/QuestionsDisplay";
import { LatexEditor } from "@/components/LatexEditor";
import { getServerSession } from "../lib/authoptions";

const Home = async () => {
  const session = await getServerSession();
  const uid = session?.user.id;

  return (
    <div className="p-8 sm:p-24 md:p-64 flex flex-col gap-12">
      <QuestionsDisplay />
      <SignInButton signedIn={!!session?.user} />
      <LatexEditor />
      {!!uid ? (
        <>
          <QuestionForm userId={uid} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

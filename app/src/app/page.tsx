import Link from "next/link";
import { SignInButton } from "../components/SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authoptions";
import { InitReferral } from "../components/InitReferral";
import { QuestionForm } from "../components/QuestionForm";
import { QuestionsDisplay } from "../components/QuestionsDisplay";
import { Message } from "../components/Message";
import { LatexEditor } from "@/components/LatexEditor";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  return (
    <div className="p-8 sm:p-24 md:p-64 flex flex-col gap-12">
      <QuestionsDisplay />
      <SignInButton signedIn={!!session?.user} />
      <LatexEditor />
      <div className="dev-border-red flex flex-col gap-4 p-12">
        <Link href="/account/signin">Sign In</Link>
        <Link href="/account/complete-signup">Complete Sign Up</Link>
        <Link href="/account/profile">Profile</Link>
      </div>
      {!!uid ? (
        <>
          <QuestionForm userId={uid} />
          <InitReferral userId={session.user.id} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

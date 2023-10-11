import Link from "next/link";
import { SignInButton } from "../components/SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { InitReferral } from "../components/InitReferral";
import { QuestionForm } from "../components/QuestionForm";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  return (
    <div className="p-8 sm:p-24 md:p-64 flex flex-col gap-12">
      <SignInButton signedIn={!!session?.user} />
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

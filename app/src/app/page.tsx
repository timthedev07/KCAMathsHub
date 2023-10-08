import Link from "next/link";
import { SignInButton } from "../components/SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { AttachmentUpload } from "../components/AttachmentUpload";
import { InitReferral } from "../components/InitReferral";

const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="p-64">
      <SignInButton signedIn={!!session?.user} />
      <div className="dev-border-red flex flex-col gap-4 p-12">
        <Link href="/account/signin">Sign In</Link>
        <Link href="/account/complete-signup">Complete Sign Up</Link>
        <Link href="/account/profile">Profile</Link>
      </div>
      <AttachmentUpload />
      {!!session?.user.id ? <InitReferral userId={session.user.id} /> : ""}
    </div>
  );
};

export default Home;

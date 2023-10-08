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
      <Link href="/account/complete-signup">Complete Sign Up</Link>
      <Link href="/account/complete-signup">Complete Sign Up</Link>
      <Link href="/account/profile">Profile</Link>
      <AttachmentUpload />
      {!!session?.user.id ? <InitReferral userId={session.user.id} /> : ""}
    </div>
  );
};

export default Home;

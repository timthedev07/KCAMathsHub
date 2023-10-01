import { NextPage } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { EnterUsername } from "../../../components/EnterUsername";

const CompleteSignup: NextPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user || !!session.user.username) redirect("/");

  return (
    <>
      <EnterUsername id={session.user.id} />
    </>
  );
};

export default CompleteSignup;

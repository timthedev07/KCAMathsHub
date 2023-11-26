import { NextPage } from "next";
import { redirect } from "next/navigation";
import { EnterUsername } from "../../../components/EnterUsername";
import { getServerSession } from "../../../lib/authoptions";

const CompleteSignup: NextPage = async () => {
  const session = await getServerSession();

  if (!session?.user || !!session.user.username) redirect("/");

  return (
    <>
      <EnterUsername id={session.user.id} />
    </>
  );
};

export default CompleteSignup;

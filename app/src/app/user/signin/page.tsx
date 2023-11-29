import { NextPage } from "next";
import { redirect } from "next/navigation";
import { SignInPanel } from "../../../components/SignInPanel";
import { getServerSession } from "../../../lib/authoptions";

const SignIn: NextPage = async () => {
  const session = await getServerSession();

  if (session?.user) {
    return redirect("/user/profile");
  }

  return (
    <div className="w-full flex min-h-[90vh] flex-col justify-center items-center">
      <SignInPanel />
    </div>
  );
};

export default SignIn;

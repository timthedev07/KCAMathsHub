import { NextPage } from "next";
import { redirect } from "next/navigation";
import { SignInPanel } from "../../../components/SignInPanel";
import { getServerSession } from "../../../lib/authoptions";

const SignIn: NextPage = async () => {
  const session = await getServerSession();

  if (session?.user) {
    return redirect("/account/profile");
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="w-full text-center dev-orange-border p-24 font-2xl">
        SIGN IN NOW
      </h1>
      <SignInPanel />
    </div>
  );
};

export default SignIn;

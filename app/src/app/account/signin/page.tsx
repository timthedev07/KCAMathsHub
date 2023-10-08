import { NextPage } from "next";
import { SignInPanel } from "../../../components/SignInPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const SignIn: NextPage = async () => {
  const session = await getServerSession(authOptions);

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

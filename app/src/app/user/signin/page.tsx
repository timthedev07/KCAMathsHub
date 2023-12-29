import { redirect } from "next/navigation";
import { SignInPanel } from "../../../components/auth/SignInPanel";
import { getServerSession } from "../../../lib/authoptions";
import { getMetadata } from "../../../lib/getMetadata";
import { NextPage } from "../../../types/nextpage";

export const metadata = getMetadata({
  title: "Sign in",
  description: "Sign in",
  pathName: "/signin",
});

const SignIn: NextPage = async () => {
  const session = await getServerSession();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="w-full flex min-h-[90vh] flex-col justify-center items-center">
      <SignInPanel />
    </div>
  );
};

export default SignIn;

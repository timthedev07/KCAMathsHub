import { NextPage } from "next";
import { SignInPanel } from "../../../../components/SignInPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { UpdateComponent } from "./UpdateComponent";
import { redirect } from "next/navigation";

interface Params {
  params: { r: string; success: string | null | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const P: NextPage<Params> = async ({ params: { r }, searchParams }) => {
  const success = searchParams?.success;
  const session = await getServerSession(authOptions);

  if (success === "true" && session?.user) {
    return <UpdateComponent r={r} userId={session.user.id} />;
  } else if (success !== "true" && session) {
    return redirect("/account/profile");
  }

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <h1 className="w-full text-center dev-orange-border p-24 font-2xl">
        Join with a referral code to get a 20+ reputation head start!
      </h1>
      <SignInPanel r={r} />
    </div>
  );
};

export default P;

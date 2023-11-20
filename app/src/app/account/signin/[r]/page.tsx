import { NextPage } from "next";
import { SignInPanel } from "../../../../components/SignInPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authoptions";
import { redirect } from "next/navigation";

interface Params {
  params: { r: string; success: string | null | undefined };
}

const P: NextPage<Params> = async ({ params: { r } }) => {
  const session = await getServerSession(authOptions);

  if (session) {
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

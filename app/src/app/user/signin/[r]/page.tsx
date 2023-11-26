import { NextPage } from "next";
import { redirect } from "next/navigation";
import { SignInPanel } from "../../../../components/SignInPanel";
import { getServerSession } from "../../../../lib/authoptions";

interface Params {
  params: { r: string; success: string | null | undefined };
}

const P: NextPage<Params> = async ({ params: { r } }) => {
  const session = await getServerSession();

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

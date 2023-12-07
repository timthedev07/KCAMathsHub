import { redirect } from "next/navigation";
import { SignInPanel } from "../../../../components/SignInPanel";
import { getServerSession } from "../../../../lib/authoptions";
import { NextPage } from "../../../../types/nextpage";

interface Params {
  params: { r: string; success: string | null | undefined };
}

const P: NextPage<Params> = async ({ params: { r } }) => {
  const session = await getServerSession();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="w-full flex min-h-[90vh] flex-col justify-center items-center">
      <SignInPanel r={r} />
    </div>
  );
};

export default P;

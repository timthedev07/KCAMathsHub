import { redirect } from "next/navigation";
import { SignInPanel } from "../../../../components/auth/SignInPanel";
import { getServerSession } from "../../../../lib/authoptions";
import { getMetadata } from "../../../../lib/getMetadata";
import { NextPage } from "../../../../types/nextpage";

interface Params {
  params: { r: string; success: string | null | undefined };
}

export const metadata = getMetadata({
  title: "Sign in",
  description: "Sign in",
});

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

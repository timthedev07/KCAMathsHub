import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { acceptReferral } from "../../../lib/db/account/referral";
import { HOST } from "../../../lib/hostAddr";
import { genErrPageRoute } from "../../../lib/genErrPageRoute";
import { TRPCError } from "@trpc/server";

const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);

  const u = session?.user;

  if (!u) return Response.redirect(genErrPageRoute("Unauthorized"));

  let url = request.url;

  if (url.endsWith("#")) {
    url = url.slice(0, url.length - 1);
  }

  const b = url.split("?");
  const d = new URLSearchParams(b[b.length - 1]);
  const r = d.get("r");

  if (!r) return Response.redirect(genErrPageRoute("Invalid Referral Code"));

  try {
    await acceptReferral(u.id, r);
  } catch (err: unknown) {
    return Response.redirect(genErrPageRoute((err as TRPCError).message));
  }

  return Response.redirect(`${HOST}`);
};

export { GET };

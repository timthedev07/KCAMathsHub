import { TRPCError } from "@trpc/server";
import { getServerSession } from "../../../lib/authoptions";
import { acceptReferral } from "../../../lib/db/account/referral";
import { HOST } from "../../../lib/hostAddr";
import { pageURLs } from "../../../lib/pageURLGen";

const GET = async (request: Request) => {
  const session = await getServerSession();

  const u = session?.user;

  if (!u) return Response.redirect(pageURLs.error("Unauthorized"));

  let url = request.url;

  if (url.endsWith("#")) {
    url = url.slice(0, url.length - 1);
  }

  const b = url.split("?");
  const d = new URLSearchParams(b[b.length - 1]);
  const r = d.get("r");

  if (!r) return Response.redirect(pageURLs.error("Invalid Referral Code"));

  try {
    await acceptReferral(u.id, r);
  } catch (err: unknown) {
    return Response.redirect(pageURLs.error((err as TRPCError).message));
  }

  return Response.redirect(`${HOST}`);
};

export { GET };

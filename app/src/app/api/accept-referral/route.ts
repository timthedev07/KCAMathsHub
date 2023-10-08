import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { acceptReferral } from "../../../lib/db/account/referral";

const GET = async (request: Request) => {
  //http://localhost:3000/account/signin/http://localhost:3000/account/signin/clnhy99op000smzqnhtppcq03
  const session = await getServerSession(authOptions);

  const u = session?.user;

  if (!u) return Response.json({}, { status: 401 });

  let url = request.url;

  if (url.endsWith("#")) {
    url = url.slice(0, url.length - 1);
  }

  const b = url.split("?");
  const d = new URLSearchParams(b[b.length - 1]);
  const r = d.get("r");

  if (!r)
    return Response.json(
      { message: "Invalid referral code." },
      { status: 400 }
    );

  await acceptReferral(u.id, r);

  return Response.json({}, { status: 201 });
};

export { GET };

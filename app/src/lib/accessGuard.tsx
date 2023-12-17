import { redirect } from "next/navigation";
import { NextPage } from "../types/nextpage";
import { Role } from "../types/role";
import { WithSessionProps } from "../types/withSessionPage";
import { getServerSession } from "./authoptions";

export const roleChecker = (userRoles: Role[], targetRoles: Role[]) => {
  for (const targetRole of targetRoles) {
    if (userRoles.includes(targetRole)) {
      return true;
    }
  }
  return false;
};

export const withAccessGuard = async <T,>(
  Page: NextPage<WithSessionProps<T>>,
  acceptedRoles: Role[],
  rejectionRedirectUrls: {
    unauthed: string;
    noAccess: string;
  } = {
    unauthed: "/user/signin",
    noAccess: "/",
  }
) => {
  // eslint-disable-next-line react/display-name
  return async (props: T) => {
    const session = await getServerSession();
    const u = session?.user;
    const userRoles = u?.roles;

    // if the page requires authentication but the user is not logged in
    if (!u || !userRoles) {
      redirect(rejectionRedirectUrls.unauthed);
    }

    if (!roleChecker(userRoles, acceptedRoles)) {
      redirect(rejectionRedirectUrls.noAccess);
    }
    return <Page session={session} {...props} />;
  };
};

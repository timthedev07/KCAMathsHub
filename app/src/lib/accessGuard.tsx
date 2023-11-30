import { NextPage } from "next";
import { Role } from "../types/role";
import { getServerSession } from "./authoptions";
import { redirect } from "next/navigation";
import { WithSessionProps } from "../types/withSessionPage";

export const roleChecker = (userRoles: Role[], targetRoles: Role[]) => {
  for (const targetRole of targetRoles) {
    if (userRoles.includes(targetRole)) {
      return true;
    }
  }
  return false;
};

const redirectWrapped = (redirectURL: string) => {
  return (() => {
    redirect(redirectURL);
  }) as NextPage;
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
  const session = await getServerSession();
  const u = session?.user;
  const userRoles = u?.roles;

  // if the page requires authentication but the user is not logged in
  if (!u || !userRoles) {
    return redirectWrapped(rejectionRedirectUrls.unauthed);
  }

  if (!roleChecker(userRoles, acceptedRoles)) {
    return redirectWrapped(rejectionRedirectUrls.noAccess);
  }

  // eslint-disable-next-line react/display-name
  return (props: T) => <Page session={session} {...props} />;
};

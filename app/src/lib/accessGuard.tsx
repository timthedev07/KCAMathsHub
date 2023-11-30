import { NextPage } from "next";
import { Role } from "../types/role";
import { getServerSession } from "./authoptions";
import { redirect } from "next/navigation";
import { WithSessionProps } from "../types/withSessionPage";

export type AccessRole = Role | "public";

export const roleChecker = (userRole: Role, targetRoles: Role[]) => {
  return targetRoles.includes(userRole);
};

const redirectWrapped = (redirectURL: string) => {
  return (() => {
    redirect(redirectURL);
  }) as NextPage;
};

export const withAccessGuard = async <T,>(
  Page: NextPage<WithSessionProps<T>>,
  role: AccessRole,
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
  const userRole = u?.role as Role;

  // if the page requires authentication but the user is not logged in
  if (role !== "public" && !u) {
    return redirectWrapped(rejectionRedirectUrls.unauthed);
  }

  switch (role) {
    case "admin": {
      if (userRole !== "admin") {
        return redirectWrapped(rejectionRedirectUrls.noAccess);
      }
    }
    case "moderator": {
      if (!roleChecker(userRole, ["admin", "moderator"])) {
        return redirectWrapped(rejectionRedirectUrls.noAccess);
      }
    }
    case "answerer": {
      if (!roleChecker(userRole, ["admin", "moderator", "answerer"])) {
        return redirectWrapped(rejectionRedirectUrls.noAccess);
      }
    }
    case "inquirer": {
      if (
        !roleChecker(userRole, ["admin", "moderator", "answerer", "inquirer"])
      ) {
        return redirectWrapped(rejectionRedirectUrls.noAccess);
      }
    }
  }
  // eslint-disable-next-line react/display-name
  return (props: T) => <Page session={session} {...props} />;
};

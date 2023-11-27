import { NextPage } from "next";
import { Role } from "../types/role";
import { getServerSession } from "./authoptions";
import { redirect } from "next/navigation";
import { WithSessionProps } from "../types/withSessionPage";

export type AccessRole = Role | "public";

const roleChecker = (userRole: Role, targetRoles: Role[]) => {
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
  rejectionRedirectUrl: string = "/"
) => {
  const session = await getServerSession();
  const u = session?.user;
  const userRole = u?.role as Role;

  // if the page requires authentication but the user is not logged in
  if (role !== "public" && !u) {
    return redirectWrapped(rejectionRedirectUrl);
  }

  switch (role) {
    case "admin": {
      if (userRole !== "admin") {
        return redirectWrapped(rejectionRedirectUrl);
      }
    }
    case "moderator": {
      if (!roleChecker(userRole, ["admin", "moderator"])) {
        return redirectWrapped(rejectionRedirectUrl);
      }
    }
    case "answerer": {
      if (!roleChecker(userRole, ["admin", "moderator", "answerer"])) {
        return redirectWrapped(rejectionRedirectUrl);
      }
    }
    case "inquirer": {
      if (
        !roleChecker(userRole, ["admin", "moderator", "answerer", "inquirer"])
      ) {
        return redirectWrapped(rejectionRedirectUrl);
      }
    }
  }
  // eslint-disable-next-line react/display-name
  return (props: T) => <Page session={session} {...props} />;
};

import { NextPage } from "next";
import { Role } from "../types/role";
import { getServerSession } from "./authoptions";
import { redirect } from "next/navigation";
import { WithSessionProps } from "../types/withSessionPage";

export type AccessRole = Role | "public";

const roleChecker = (userRole: Role, targetRoles: Role[]) => {
  return targetRoles.includes(userRole);
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
    return redirect(rejectionRedirectUrl);
  }

  switch (role) {
    case "admin": {
      if (userRole !== "admin") {
        return redirect(rejectionRedirectUrl);
      }
    }
    case "moderator": {
      if (!roleChecker(userRole, ["admin", "moderator"])) {
        return redirect(rejectionRedirectUrl);
      }
    }
    case "answerer": {
      if (!roleChecker(userRole, ["admin", "moderator", "answerer"])) {
        return redirect(rejectionRedirectUrl);
      }
    }
    case "inquirer": {
      if (
        !roleChecker(userRole, ["admin", "moderator", "answerer", "inquirer"])
      ) {
        return redirect(rejectionRedirectUrl);
      }
    }
  }
  // eslint-disable-next-line react/display-name
  return (props: T) => <Page session={session} {...props} />;
};

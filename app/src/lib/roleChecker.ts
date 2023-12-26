import { Role } from "../types/role";

export const roleChecker = (
  userRoles: Role[],
  targetRoles: Role[],
  hasAll: boolean = false
) => {
  let count = 0;
  for (const targetRole of targetRoles) {
    if (userRoles.includes(targetRole)) {
      if (!hasAll) return true;
      count++;
    }
  }
  return hasAll ? count === targetRoles.length : false;
};

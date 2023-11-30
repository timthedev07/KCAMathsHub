export const ROLES = ["inquirer", "answerer", "admin", "moderator"] as const;
export type Role = (typeof ROLES)[number];

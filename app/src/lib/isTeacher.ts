export const isTeacher = (email: string) => email.includes("@kings.education");

const mathDepartment = [
  "julia.galiana",
  "sergio.balaguer",
  "daria.malpart",
  "stephen.lowe",
  "doris.nistorica",
  "sharon.doyle",
  "ana.perez",
];

export const isMathTeacher = (email: string) => {
  for (const t of mathDepartment) {
    if (email.includes(t)) {
      return true;
    }
  }
  return false;
};

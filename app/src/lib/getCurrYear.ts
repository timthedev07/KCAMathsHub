export const getCurrYear = (joinedDate: Date, joinedYear: number) => {
  const j = new Date(joinedDate);

  const nextAug1st =
    j.getMonth() + 1 >= 8
      ? new Date(j.getFullYear() + 1, 9, 1)
      : new Date(j.getFullYear(), 9, 1);

  if (Date.now() >= nextAug1st.valueOf()) {
    return joinedYear + 1;
  }
  return joinedYear;
};

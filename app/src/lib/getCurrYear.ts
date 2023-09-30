export const getCurrYear = (joinedDate: Date, joinedYear: number) => {
  const nextAug1st =
    joinedDate.getMonth() + 1 >= 8
      ? new Date(joinedDate.getFullYear() + 1, 9, 1)
      : new Date(joinedDate.getFullYear(), 9, 1);

  if (Date.now() >= nextAug1st.valueOf()) {
    return joinedYear + 1;
  }
  return joinedYear;
};

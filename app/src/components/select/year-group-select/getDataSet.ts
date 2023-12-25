const yearGroups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export const getYearGroupsByK = (k?: string) => {
  switch (k) {
    case "Primary":
      return yearGroups.slice(1, 6);
    case "KS3":
      return yearGroups.slice(6, 9);
    case "KS4":
      return yearGroups.slice(9, 11);
    case "KS5":
      return yearGroups.slice(11);
    default: {
      return yearGroups;
    }
  }
};

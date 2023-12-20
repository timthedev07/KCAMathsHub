export const truncateAtWord = (
  str: string,
  maxCharacters: number,
  addEllipsis: boolean = true
) => {
  const words = str.split(" ");

  let i = 0;
  let limitReached = false;
  const acceptedWords = [];

  for (const word of words) {
    let wordShouldAccepted = true;
    for (const _ of word) {
      i++;
      if (i > maxCharacters) {
        wordShouldAccepted = false;
        limitReached = true;
        break;
      }
    }
    if (!wordShouldAccepted) break;
    acceptedWords.push(word);
  }

  let joined = acceptedWords.join(" ");
  return addEllipsis && limitReached ? joined + "..." : joined;
};

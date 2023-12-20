export const truncateAtWord = (str: string, maxCharacters: number) => {
  const words = str.split(" ");

  let i = 0;
  const acceptedWords = [];

  for (const word of words) {
    let wordShouldAccepted = true;
    for (const _ of word) {
      i++;
      if (i > maxCharacters) {
        wordShouldAccepted = false;
        break;
      }
    }
    if (!wordShouldAccepted) break;
    acceptedWords.push(word);
  }

  return acceptedWords.join(" ");
};

export const truncateText = (text: string, maxLength: number = 80) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

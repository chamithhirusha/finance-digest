export const getDateByTimestamp = (timestamp: number) => {
  const tsNumber = Number(timestamp);
  const date = new Date(tsNumber * 1000);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

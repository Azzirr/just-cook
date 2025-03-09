import { getFormatter } from "next-intl/server";

export const formatToShortDate = async () => {
  const format = await getFormatter();

  return (date: Date) =>
    format.dateTime(date, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
};

import { useFormatter } from "next-intl";

export const formatShortDate = (date: Date) => {
  const format = useFormatter();

  return format.dateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

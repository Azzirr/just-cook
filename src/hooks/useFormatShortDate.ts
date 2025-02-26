import { useFormatter } from "next-intl";

export const useFormatShortDate = () => {
  const format = useFormatter();

  return (date: Date) =>
    format.dateTime(date, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
};

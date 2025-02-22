import { startTransition, useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";

// workaround to enable both client and server validation
// source: https://github.com/shadcn-ui/ui/discussions/5332#discussioncomment-11113046
// https://www.reddit.com/r/nextjs/comments/1hnc0uz/is_reacthookform_still_relevant_with_react_19_and/
//In future refactor it

export const onSubmitUtil = <T extends Record<string, unknown>>(
  action: (data: FormData | T) => void,
  form: UseFormReturn<T>,
) => {
  const onSubmit = useCallback(
    (data: T) => {
      startTransition(() => {
        action(data);
      });
    },
    [action],
  );

  return form.handleSubmit(onSubmit);
};

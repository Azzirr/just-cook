import { startTransition, useCallback } from "react";
import { z } from "zod";

// workaround to enable both client and server validation
// source: https://github.com/shadcn-ui/ui/discussions/5332#discussioncomment-11113046
// https://www.reddit.com/r/nextjs/comments/1hnc0uz/is_reacthookform_still_relevant_with_react_19_and/
//In future refactor it

export const onSubmitUtil = <T extends z.ZodType>({
  action,
  formRef,
  form,
}: {
  action: (data: FormData) => void;
  formRef: React.RefObject<HTMLFormElement>;
  form: {
    handleSubmit: (
      callback: (values: z.infer<T>) => void,
    ) => (e: React.FormEvent<HTMLFormElement>) => void;
  };
}) => {
  const onSubmit = useCallback(
    async (_values: z.infer<T>) => {
      startTransition(() => {
        const formData = new FormData(formRef.current!);

        //prevent from sending empty file object
        for (const [key, value] of formData.entries()) {
          if (value instanceof File && value.size === 0) {
            formData.delete(key);
          }
        }

        action(formData);
      });
    },
    [action],
  );
  return form.handleSubmit(onSubmit);
};

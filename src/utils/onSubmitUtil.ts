import { startTransition, useCallback } from "react";
import { z } from "zod";

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
    getValues: () => any;
  };
}) => {
  const onSubmit = useCallback(
    async (_values: z.infer<T>) => {
      startTransition(() => {
        const formData = form.getValues();
        action(formData);
      });
    },
    [action, form],
  );

  return form.handleSubmit(onSubmit);
};

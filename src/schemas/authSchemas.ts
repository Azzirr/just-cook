import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  password: z.string().min(8, {
    message: "Wrong password",
  }),
});

export const registerSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters",
    }),
    password: z.string().min(8, {
      message: "Password must be minimum 8 characters",
    }),
    repeatPassword: z.string().min(8, {
      message: "Repeat password must be minimum 8 characters and must match",
    }),
    email: z
      .string()
      .min(1, { message: "This field must be filled" })
      .email("This is not a valid email"),
    // TODO: add image validator if we will use avatar upload feature
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["repeatPassword"],
      });
    }
  });

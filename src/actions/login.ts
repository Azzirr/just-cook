"use server";
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/authSchemas";
import { AuthError } from "next-auth";
import { FormState } from "@/types/formState";

export async function login(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errors: parsed.error?.errors.map((error) => error.message),
      message: "Invalid form data",
      fields: { username: formData["username"].toString() },
      isSuccess: false,
    };
  }

  const { username, password } = parsed.data;

  try {
    await signIn("credentials", {
      username,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials!",
            fields: { username: parsed.data.username },
            isSuccess: false,
          };
        default:
          return {
            message: "Something went wrong!",
            fields: { username: parsed.data.username },
            isSuccess: false,
          };
      }
    }

    throw error;
  }

  return {
    isSuccess: true,
  };
}

"use server";
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/authSchemas";
import { AuthError } from "next-auth";
import { FormState } from "@/types/formState";
import { db } from "@/db";

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
      isSuccess: false,
    };
  }

  const { username, password } = parsed.data;

  const user = await db.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!user?.emailVerified) {
    return {
      message:
        "User is not verified, please confirm your registration on email",
      isSuccess: false,
    };
  }

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
            isSuccess: false,
          };
        default:
          return {
            message: "Something went wrong!",
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

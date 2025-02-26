"use server";

import { z } from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/authSchemas";
import { FormState } from "@/types/formState";
import { db } from "@/db";
import { createVerificationToken } from "@/data/createVerificationToken";
import { sendVerificationEmail } from "@/lib/mail";

export async function login(
  prevState: FormState,
  data: FormData | z.infer<typeof loginSchema>,
): Promise<FormState> {
  const {
    data: parsedData,
    success,
    error,
  } = loginSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data,
  );

  if (!success) {
    return {
      errors: error.errors.map((error) => error.message),
      message: "Invalid form data",
      isSuccess: false,
    };
  }

  const { username, password } = parsedData;

  const user = await db.user.findFirst({
    where: {
      username: username,
    },
    include: {
      verificationToken: true,
    },
  });

  if (!user) {
    return {
      message: "Invalid credentials!",
      isSuccess: false,
    };
  }

  const hasTokenExpired =
    user.verificationToken?.expires &&
    new Date() > new Date(user.verificationToken.expires);

  if (!user.emailVerified) {
    if (user.verificationToken && !hasTokenExpired) {
      return {
        message:
          "User is not verified. Please confirm your registration via email.",
        isSuccess: false,
      };
    } else {
      const verificationToken = await createVerificationToken(user.id);
      await sendVerificationEmail({
        email: user.email,
        token: verificationToken.token,
        username: user.username,
      });

      return {
        message:
          "User is not verified. A new verification link has been sent to your email.",
        isSuccess: false,
      };
    }
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

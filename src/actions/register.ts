"use server";

import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { createVerificationToken } from "@/data/createVerificationToken";
import { db } from "@/db";
import { sendVerificationEmail } from "@/lib/mail";
import { registerSchema } from "@/schemas/authSchemas";
import { FormState } from "@/types/formState";

export async function register(
  prevState: FormState,
  data: FormData | z.infer<typeof registerSchema>,
): Promise<FormState> {
  const {
    data: parsedData,
    success,
    error,
  } = registerSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data,
  );

  if (!success) {
    return {
      errors: error.errors.map((error) => error.message),
      message: "Invalid form data",
      isSuccess: false,
    };
  }

  const { username, email, password } = parsedData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  const existingEmail = existingUser?.email === email;
  const existingUsername = existingUser?.username === username;

  if (existingEmail) {
    return {
      message: "Email is already in use",
      isSuccess: false,
    };
  }

  if (existingUsername) {
    return {
      message: "Username is already in use",
      isSuccess: false,
    };
  }

  const createdUser = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      isActive: true,
      role: Role.USER,
      recipeLists: {
        create: {
          name: "Favourites",
          isSystem: true,
        },
      },
    },
  });

  const verificationToken = await createVerificationToken(createdUser.id);

  await sendVerificationEmail({
    email: createdUser.email,
    token: verificationToken.token,
    username: createdUser.username,
  });

  return {
    isSuccess: true,
  };
}

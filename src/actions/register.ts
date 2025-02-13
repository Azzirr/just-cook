"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db";
import { Role } from "@prisma/client";
import { registerSchema } from "@/schemas/authSchemas";
import { FormState } from "@/types/formState";
import { z } from "zod";

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

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      isActive: true,
      role: Role.USER,
    },
  });

  return {
    isSuccess: true,
  };
}

"use server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { Role } from "@prisma/client";
import { registerSchema } from "@/schemas/authSchemas";
import { FormState } from "@/types/formState";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/mail";

export async function register(prevState: FormState, data: FormData) {
  const formData = Object.fromEntries(data);

  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errors: parsed.error?.errors.map((error) => error.message),
      message: "Invalid form data",
      isSuccess: false,
    };
  }

  const { username, email, password } = parsed.data;
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
    },
  });

  const verificationToken = await db.verificationToken.create({
    data: {
      userId: createdUser.id,
      token: uuidv4(),
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //expires in 24h
    },
  });

  await sendVerificationEmail({
    email: createdUser.email,
    token: verificationToken.token,
    username: createdUser.username,
  });

  return {
    isSuccess: true,
  };
}

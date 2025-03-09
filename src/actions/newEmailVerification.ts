"use server";
import { FormState } from "@/types/formState";
import { db } from "@/db";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export async function newEmailVerification(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  const { token } = formData || {};

  if (!token) {
    return {
      message: "No token found",
      isSuccess: false,
    };
  }

  const user = await db.user.findFirst({
    where: {
      verificationToken: {
        token: token as string,
      },
    },
    include: {
      verificationToken: true,
    },
  });

  if (!user) {
    return {
      message: "No user found with given token",
      isSuccess: false,
    };
  }

  if (user.emailVerified) {
    return {
      message: "Your email is already verified",
      isSuccess: false,
    };
  }

  const hasTokenExpired =
    user.verificationToken?.expires &&
    new Date() > new Date(user.verificationToken?.expires);

  if (hasTokenExpired) {
    return {
      message: "Your token has expired",
      isSuccess: false,
    };
  }

  await db.user.update({
    where: { username: user.username },
    data: {
      emailVerified: true,
    },
  });

  await db.verificationToken.delete({
    where: {
      userId: user.id,
    },
  });

  const locale = await getLocale();

  redirect({
    href: `/auth-user`,
    locale,
  });

  return {
    isSuccess: true,
  };
}

import { EmailVerification } from "@/components/EmailTemplates/EmailVerification";
import { getLocale } from "next-intl/server";
import { createElement } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendVerificationEmail = { email: string; token: string; username: string };

export const sendVerificationEmail = async ({
  email,
  token,
  username,
}: SendVerificationEmail) => {
  const locale = await getLocale();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const confirmLink = `${appUrl}/${locale}/auth-user/new-email-verification?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "justcook@resend.dev",
      //for now resend works only with company email
      to: "justcooktech@gmail.com",
      subject: "Confirm your email",
      react: createElement(EmailVerification, {
        confirmLink,
        username,
      }),
    });

    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

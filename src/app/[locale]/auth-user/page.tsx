import { auth } from "@/auth";
import AuthUser from "@/components/Login/AuthUser";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

const AuthUserPage = async () => {
  const session = await auth();
  const locale = await getLocale();

  if (session) redirect({ href: "/", locale });

  return (
    <>
      <AuthUser />
    </>
  );
};
export default AuthUserPage;

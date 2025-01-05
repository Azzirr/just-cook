import { auth } from "@/auth";
import AuthUser from "@/components/Login/AuthUser";
import { redirect } from "next/navigation";

const authUser = async () => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <>
      <AuthUser />
    </>
  );
};
export default authUser;

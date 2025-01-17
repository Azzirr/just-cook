"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Link } from "@/i18n/routing";

const AuthUser = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  return (
    <>
      <div className="mx-auto max-w-lg p-3">
        {/* TODO: I want to add some kind of animation library for animate things on the app. We will reach discuss about it */}
        {showLoginForm ? (
          <LoginForm setShowLoginForm={setShowLoginForm} />
        ) : (
          <RegisterForm setShowLoginForm={setShowLoginForm} />
        )}
        <Link
          href={"/"}
          className="mx-auto mt-2 text-center [text-decoration:underline]"
        >
          Continue as guest
        </Link>
      </div>
    </>
  );
};
export default AuthUser;

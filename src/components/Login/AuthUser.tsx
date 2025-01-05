"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthUser = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-[85vw] flex-col items-start">
          {/* TODO: I want to add some kind of animation library for animate things on the app. We will reach discuss about it */}
          {showLoginForm ? (
            <LoginForm setShowLoginForm={setShowLoginForm} />
          ) : (
            <RegisterForm setShowLoginForm={setShowLoginForm} />
          )}
        </div>
      </div>
    </>
  );
};
export default AuthUser;

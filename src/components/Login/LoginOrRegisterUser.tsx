"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// TODO: maybe some better name than LoginOrRegisterUser?
const LoginOrRegisterUser = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-start w-[85vw]">
          {/* TODO: I want to add some kind of animation library for animate things on the app. We will reach discuss about it */}
          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
          ) : (
            <RegisterForm setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </>
  );
};
export default LoginOrRegisterUser;

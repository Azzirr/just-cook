"use client";

import { newEmailVerification } from "@/actions/newEmailVerification";
import { FormAlert } from "@/components/FormAlert";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";

const NewEmailVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, action, isPending] = useActionState(newEmailVerification, {
    isSuccess: false,
  });

  useEffect(() => {
    if (token) {
      const formData = new FormData();
      formData.append("token", token);

      //https://stackoverflow.com/questions/79370816/can-we-use-the-action-returned-by-useactionstate-outside-forms
      startTransition(() => {
        action(formData);
      });
    }
  }, [token]);

  return (
    <div className="mt-6 flex w-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Email Verification
        </h1>
        {state.message || state.errors ? (
          <div className="m-4">
            <FormAlert
              message={state.message}
              errors={state.errors}
            ></FormAlert>
          </div>
        ) : (
          <p className="mt-4 text-center text-gray-700">
            We are verifying your email address. Please wait a moment...
          </p>
        )}

        <p className="mt-2 text-center text-gray-600">
          If this takes too long, try refreshing the page or check your email
          for a verification link.
        </p>
      </div>
    </div>
  );
};
export default NewEmailVerificationPage;

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schemas/authSchemas";
import { AuthFormProps } from "./types";
import { useActionState, useEffect, useRef } from "react";
import { login } from "@/actions/login";
import { FormAlert } from "@/components/FormAlert";
import { onSubmitUtil } from "@/utils/onSubmitUtil";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";

const LoginForm = ({ setShowLoginForm }: AuthFormProps) => {
  const [state, action, isPending] = useActionState(login, {
    isSuccess: false,
  });
  const locale = useLocale();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.isSuccess) {
      redirect({ href: "/", locale });
    }
  }, [state.isSuccess]);

  return (
    <>
      <div className="mb-4">
        <h2>Login</h2>
        <p>to get all features</p>
      </div>

      <Form {...form}>
        <FormAlert message={state?.message} errors={state?.errors}></FormAlert>
        <form
          ref={formRef}
          action={action}
          onSubmit={onSubmitUtil({ action, formRef, form })}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Type your username..." {...field} />
                </FormControl>
                <FormMessage className="max-w-[60vw]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your password..."
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage className="max-w-[60vw]" />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-[50vw] rounded-3xl bg-gray-900"
              isPending={isPending}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-4">
        <p>
          Click{" "}
          <button
            className="cursor-pointer text-blue-600 underline"
            onClick={() => setShowLoginForm(false)}
          >
            here
          </button>{" "}
          to register or...
        </p>
      </div>
    </>
  );
};

export default LoginForm;

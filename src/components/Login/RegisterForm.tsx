import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../../schemas/authSchemas";
import { LoginFormProps } from "./types";
import { useActionState, useEffect, useRef } from "react";
import { register } from "@/actions/register";
import { onSubmitUtil } from "@/utils/onSubmitUtil";
import { FormAlert } from "@/components/FormAlert";
import { redirect } from "next/navigation";

const RegisterForm = ({ setIsLogin }: LoginFormProps) => {
  const [state, action, isPending] = useActionState(register, {
    success: false,
  });
  const formRef = useRef(null);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
      email: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      handleSwitchToLogin();
    }
  }, [state.success]);

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <>
      <div className="max-h-[75vh] w-full overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-left">Register</h2>
          <p className="text-left">
            and <span className="text-green-500">enjoy</span> all features
          </p>
        </div>
        <div className="w-full">
          <Form {...form}>
            <form
              ref={formRef}
              action={action}
              onSubmit={onSubmitUtil({ action, formRef, form })}
              className="space-y-5"
            >
              <FormAlert
                message={state.message}
                issues={state.issues}
              ></FormAlert>
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
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your password again..."
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="max-w-[60vw]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your email..."
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage className="max-w-[60vw]" />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  isPending={isPending}
                  className="w-[50vw] rounded-3xl bg-gray-900"
                >
                  Register
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="mt-4">
          <p className="text-left">
            Or click{" "}
            <span
              className="text-blue-600 [text-decoration:underline]"
              onClick={handleSwitchToLogin}
            >
              here
            </span>{" "}
            to get back to login
          </p>
        </div>
      </div>
    </>
  );
};
export default RegisterForm;

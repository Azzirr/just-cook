import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthFormProps } from "./types";
import { useActionState, useEffect } from "react";
import { register } from "@/actions/register";
import { onSubmitUtil } from "@/utils/onSubmitUtil";
import { FormAlert } from "@/components/FormAlert";
import { registerSchema } from "@/schemas/authSchemas";

const RegisterForm = ({ setShowLoginForm }: AuthFormProps) => {
  const [state, action, isPending] = useActionState(register, {
    isSuccess: false,
  });

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
    if (state.isSuccess) {
      toast.success("Confirmation email has been sent!", {
        description: "Please check your email box",
      });
      form.reset();
    }
  }, [state.isSuccess]);

  return (
    <>
      <div className="mb-4">
        <h2>Register</h2>
        <p>
          and <span className="text-green-500">enjoy</span> all features
        </p>
      </div>
      <div className="w-full">
        <Form {...form}>
          <form
            action={action}
            onSubmit={onSubmitUtil(action, form)}
            className="space-y-5"
          >
            <FormAlert
              message={state.message}
              errors={state.errors}
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
        <p>
          Click{" "}
          <button
            className="cursor-pointer text-blue-600 underline"
            onClick={() => setShowLoginForm(true)}
          >
            here
          </button>{" "}
          to get back to login or...
        </p>
      </div>
    </>
  );
};
export default RegisterForm;

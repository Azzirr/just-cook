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
import { loginSchema } from "./schemas";
import { LoginFormProps } from "@/app/types";

const LoginForm: React.FC<LoginFormProps> = ({ setIsLogin }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // TODO - whole logic
    console.log(values);
  };

  const handleSwitchToRegister = () => {
    setIsLogin(false);
  };
  return (
    <>
      <div className="mb-4">
        <h2 className="text-left ">Login</h2>
        <p className="text-left">to get all features</p>
      </div>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                className="rounded-3xl bg-gray-900 w-[50vw] "
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="mt-4">
        <p className="text-left ">
          Or click{" "}
          <span
            className="[text-decoration:underline] text-blue-600"
            onClick={handleSwitchToRegister}
          >
            here
          </span>{" "}
          to register
        </p>
      </div>
    </>
  );
};

export default LoginForm;

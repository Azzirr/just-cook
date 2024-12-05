"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  password: z.string().min(8, {
    message: "Wrong password",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // TO DO - whole logic
    console.log(values);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-start w-[85vw]">
          <div className="mb-4">
            <h2 className="text-left ">Login</h2>
            <p className="text-left">to get all features</p>
          </div>

          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
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
                <Button type="submit" className="rounded-3xl bg-gray-900">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4">
            <p className="text-left ">
              Or click{" "}
              <span className="[text-decoration:underline] text-blue-600">
                here
              </span>{" "}
              to register
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

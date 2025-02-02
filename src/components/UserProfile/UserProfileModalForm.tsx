"use client";
import { useForm } from "react-hook-form";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schemas/profileSchema";
import { useActionState, useRef, useState } from "react";
import { editUserData } from "@/actions/editUserData";
import { FormAlert } from "../FormAlert";
import { onSubmitUtil } from "@/utils/onSubmitUtil";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import { getUsernameInitials } from "@/utils/getUsernameInitials";

type UserProfileModalFormProps = {
  user: User;
};

export const UserProfileModalForm = ({ user }: UserProfileModalFormProps) => {
  const [state, action, isPending] = useActionState(editUserData, {
    isSuccess: false,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatar,
  );

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatar: null,
      username: user.username,
      firstName: user.firstName || "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <FormAlert message={state?.message} errors={state?.errors} />
        <form
          ref={formRef}
          action={action}
          onSubmit={onSubmitUtil({ action, formRef, form })}
          className="space-y-5"
        >
          <div className="flex gap-2">
            <Avatar className="h-20 w-20 self-start bg-slate-50">
              <AvatarImage src={avatarPreview ?? undefined} />
              <AvatarFallback>
                {getUsernameInitials(user.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full justify-center self-center">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { onChange, value, ...fieldProps } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            onChange(file);
                            handleFileChange(event);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="max-w-[60vw]" />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Type your first name..." {...field} />
                </FormControl>
                <FormMessage className="max-w-[60vw]" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-3xl bg-gray-900"
            isPending={isPending}
          >
            Save profile
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

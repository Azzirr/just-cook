"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Recipe } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { sendRecipeComment } from "@/actions/recipes/sendRecipeComment";
import { commentSchema } from "@/schemas/commentSchema";
import { onSubmitUtil } from "@/utils/onSubmitUtil";

import { FormAlert } from "../FormAlert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type RecipeCommentFormProps = { recipeId: Recipe["id"] };

export const RecipeCommentForm = ({ recipeId }: RecipeCommentFormProps) => {
  const boundAction = sendRecipeComment.bind(null, recipeId);

  const [state, action, isPending] = useActionState(boundAction, {
    isSuccess: false,
  });

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const { reset, formState } = form;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <Form {...form}>
      <FormAlert message={state?.message} errors={state?.errors} />
      <form action={action} onSubmit={onSubmitUtil(action, form)}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <Textarea placeholder="Type your comment" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="ml-auto mt-2 block rounded-3xl bg-gray-900"
          isPending={isPending}
        >
          Comment
        </Button>
      </form>
    </Form>
  );
};

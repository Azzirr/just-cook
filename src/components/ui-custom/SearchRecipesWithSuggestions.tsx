"use client";

import { getRecipesByPhrase } from "@/actions/recipes/getRecipesByPhrase";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { Link, redirect } from "@/i18n/routing";
import { Recipe } from "@prisma/client";
import { useLocale } from "next-intl";
import { useState, KeyboardEvent } from "react";

export const SearchRecipesWithSuggestions = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const locale = useLocale();

  const [handleSearch] = useDebouncedCallback(async (term) => {
    if (term.length === 0) return setResults([]);

    const data = await getRecipesByPhrase({ searchPhrase: term });
    setResults(data);
  }, 300);

  const handleRedirectToRecipes = () => {
    const href = `/recipes?searchPhrase=${input}`;
    redirect({ href, locale });
  };

  const handelKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRedirectToRecipes();
    }
  };

  return (
    <>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search..."
          onValueChange={(val) => {
            handleSearch(val);
            setInput(val);
          }}
          onKeyDown={handelKeyPress}
          onClickSearch={handleRedirectToRecipes}
          value={input}
        />
        {input && (
          <CommandList>
            <CommandGroup>
              {results.map((item) => (
                <Link key={item.id} href={`/recipes/${item.id}/${item.slug}`}>
                  <CommandItem>{item.name}</CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </>
  );
};

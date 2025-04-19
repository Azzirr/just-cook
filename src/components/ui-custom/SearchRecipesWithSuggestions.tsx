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
import { Link, useRouter } from "@/i18n/routing";
import { Recipe } from "@prisma/client";
import { useState, KeyboardEvent } from "react";

export const SearchRecipesWithSuggestions = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const router = useRouter();

  const [handleSearch] = useDebouncedCallback(async (term) => {
    if (term.length === 0) return setResults([]);

    const data = await getRecipesByPhrase({ phrase: term });
    setResults(data);
  }, 300);

  const handleRedirectToRecipes = () => {
    router.push({ pathname: "/recipes", query: { searchPhrase: input } });
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRedirectToRecipes();
    }
  };

  return (
    <>
      <Command className="relative overflow-visible rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search..."
          onValueChange={(val) => {
            handleSearch(val);
            setInput(val);
          }}
          onKeyDown={handleKeyPress}
          onClickSearch={handleRedirectToRecipes}
        />
        {input && (
          <CommandList className="absolute left-0 top-full z-50 w-full rounded-md border bg-popover shadow-md">
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

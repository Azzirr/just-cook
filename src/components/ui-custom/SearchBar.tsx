"use client";
import clsx from "clsx";
import { Input } from "../ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const SearchBar = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [handleSearch] = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params}`);
  }, 500);

  return (
    <>
      <Input
        placeholder="Search..."
        className={clsx("default-styles", className)}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />
    </>
  );
};
export default SearchBar;

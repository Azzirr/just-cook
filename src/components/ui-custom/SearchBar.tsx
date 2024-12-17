"use client";
import clsx from "clsx";
import { Input } from "../ui/input";

// TODO: It will be done in next PR
const SearchBar = ({ className }: { className?: string }) => {
  return (
    <>
      <Input
        placeholder="Search..."
        className={clsx("default-styles", className)}
      />
    </>
  );
};
export default SearchBar;

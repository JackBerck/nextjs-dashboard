"use client";

import { useDebouncedCallback } from "use-debounce"; // useDebouncedCallback is a hook to debounce a callback
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // useSearchParams is a hook to get the current search params

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // searchParams is an object with the current search params
  const { replace } = useRouter(); // router is an object with the current route
  const pathname = usePathname(); // pathname is a string with the current pathname

  // handleSearch is a function that updates the search params
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams); // create a new URLSearchParams object, URLSearchParams is a built-in class to work with query strings in URLs
    params.set("page", "1"); // set the page search param to 1
    if (term) {
      params.set("query", term); // set the search param to the term
    } else {
      params.delete("query"); // delete the search param
    }

    replace(`${pathname}?${params.toString()}`); // replace the current route with the updated search params
  }, 300); // debounce the callback by 300ms

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString() || ""}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

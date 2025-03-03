"use client";
import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  customClass?: string;
  onSubmit?: () => void;
};

export function SearchForm({ customClass, onSubmit }: Readonly<Props>) {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting if the search input is empty or has only spaces or tabs or less than 3 characters
    if (
      !e.currentTarget.search.value.trim() ||
      e.currentTarget.search.value.trim().length < 2
    ) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    router.push(`/search?q=${search}`);
    onSubmit?.();
  };

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);
  return (
    <form
      className={clsx(customClass, "h-full w-full")}
      onSubmit={handleSubmit}
    >
      <div className="relative h-full">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          ref={searchInputRef}
          id="search"
          placeholder="Search products..."
          className="h-full px-7"
          name="search"
        />
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        <Button
          variant={"ghost"}
          type="submit"
          className="z-[999px] px-1 cursor-pointer  absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Image
            src="/icons/enter-key.png"
            height={16}
            width={16}
            alt="search"
            className=" "
          />
        </Button>
      </div>
    </form>
  );
}

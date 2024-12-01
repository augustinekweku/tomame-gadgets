"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MainNavLinks from "./MainNavLinks";
import Link from "next/link";
import Image from "next/image";
const Topnav2 = () => {
  return (
    <header className="flex h-16 items-center gap-4  bg-white px-4 lg:h-[70px] lg:px-6 border-b-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden !hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium mt-8 ">
            <MainNavLinks />
          </nav>
          <div className="mt-auto">Upgrade to Pro</div>
        </SheetContent>
      </Sheet>
      <Link
        className="w-full flex-1 font-bold flex items-center gap-2"
        href="/"
      >
        <Image
          src={"/icon.png"}
          height={40}
          width={40}
          alt="Brox Gadgets"
        ></Image>{" "}
        Brox Gadgets
      </Link>
      {/* <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  );
};

export default Topnav2;

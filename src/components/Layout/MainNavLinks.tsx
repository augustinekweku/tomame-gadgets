"use client";
import React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CATEGORIES } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

type NavLinkIconMapType = {
  [key: string]: {
    title: string;
    subMenu?: { title: string; route: string }[];
  };
};

type Props = {
  flexDirection?: "flex-row" | "flex-col";
  location?: "top-nav" | "side-nav";
  onEventFired?: () => void;
};

const NavLinkIconMap: NavLinkIconMapType = {
  "/": {
    title: "Home",
  },
  "/about-us": {
    title: "About Us",
  },
  "#": {
    title: "Categories",
    subMenu: Object.keys(CATEGORIES).map((category) => {
      return {
        title: CATEGORIES[category as keyof typeof CATEGORIES].name,
        route: `/product/category/${category}`,
      };
    }),
  },
};

const ACTIVE_LINK_CLASS =
  "bg-accent text-primary border-b-primary-default border-b-2";
const MainNavLinks = ({ flexDirection, location, onEventFired }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  function isLinkActive(route: string) {
    //check if submenus are active
    if (NavLinkIconMap[route].subMenu) {
      const isSubMenuActive = NavLinkIconMap[route].subMenu.some(
        (subItem) => subItem.route === pathname
      );
      return isSubMenuActive;
    }
    //check if main menu is active
    return pathname === route && pathname.startsWith(`${route}`);
  }
  return (
    <div
      className={clsx(
        flexDirection,
        location === "side-nav" ? "gap-2 mt-3" : "mt-1.5",
        "flex "
      )}
    >
      {Object.keys(NavLinkIconMap).map((route) => {
        return (
          <div
            key={route}
            className={clsx("flex items-center mr-6  gap-2 font-semibold ")}
          >
            {NavLinkIconMap[route].subMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={clsx(
                    isLinkActive(route) ? ACTIVE_LINK_CLASS : "",
                    "flex items-center rounded-lg pb-1"
                  )}
                >
                  {NavLinkIconMap[route].title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {NavLinkIconMap[route].subMenu.map((subItem) => {
                    return (
                      <DropdownMenuItem
                        key={subItem.title}
                        onClick={() => {
                          onEventFired?.();
                          router.push(subItem.route);
                        }}
                      >
                        {subItem.title}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!NavLinkIconMap[route].subMenu && (
              <Link
                onClick={() => {
                  onEventFired?.();
                }}
                href={route}
                className={` ${
                  isLinkActive(route) ? ACTIVE_LINK_CLASS : "text-black"
                } pb-1 font-semibold mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-0 flex-1 justify-between`}
              >
                {NavLinkIconMap[route].title}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MainNavLinks;

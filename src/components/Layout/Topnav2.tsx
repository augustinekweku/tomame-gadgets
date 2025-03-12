"use client";
import { Heart, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import MainNavLinks from "./MainNavLinks";
import Link from "next/link";
import Image from "next/image";
import { SearchForm } from "../SearchForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchModal from "../SearchModal";
import { NavUserDropdown } from "../NavUserDropdown";
const Topnav2 = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  //close the menu when the user clicks outside the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (event.target instanceof HTMLElement) {
        if (!event.target.closest(".sheet-content")) {
          setIsMenuOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <SearchModal
        open={openSearchModal}
        onClose={() => {
          setOpenSearchModal(false);
        }}
      />
      <header className="flex h-16  justify-between items-center gap-4 lg:gap-8  bg-white px-4 lg:h-[70px] lg:px-6 border-b-2 py-3 lg:py-4">
        <div className="flex items-center gap-2 lg:gap-16">
          <Link className=" font-bold flex items-center gap-2" href="/">
            <Image
              src={"/images/logo.png"}
              height={28}
              width={134}
              alt="Brox Gadgets"
            ></Image>{" "}
          </Link>

          <div className="hidden lg:block ">
            <MainNavLinks flexDirection="flex-row" />
          </div>
        </div>

        <div className="flex items-center gap-3 h-full basis-3/5 lg:basis-2/5 justify-end">
          <SearchForm customClass="hidden md:block" />
          <Button
            variant="default"
            className="font-semibold  hidden lg:flex px-6"
            onClick={() => {
              router.push("/contact");
            }}
          >
            Contact Us
            <Image
              src="/icons/button-arrow.svg"
              height={20}
              width={20}
              alt="phone"
            ></Image>
          </Button>

          <Button
            variant={"secondary"}
            onClick={() => {
              setOpenSearchModal(true);
            }}
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              router.push("/wishlist");
            }}
            className=""
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <NavUserDropdown />
          <Sheet open={isMenuOpen}>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
            <SheetContent side="left" className="flex flex-col sheet-content">
              <Button
                variant="outline"
                size="icon"
                className="ml-auto absolute top-4 right-4"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <span className="sr-only">Close menu</span>
                <X className=" font-bold text-primary h-6 w-6 z-50" />
              </Button>
              <nav className="grid gap-2 text-lg font-medium ">
                <Link className=" font-bold flex items-center gap-2" href="/">
                  <Image
                    src={"/images/logo.png"}
                    height={28}
                    width={134}
                    alt="Brox Gadgets"
                  ></Image>{" "}
                </Link>
                <MainNavLinks
                  flexDirection="flex-col"
                  location="side-nav"
                  onEventFired={() => {
                    setIsMenuOpen(false);
                  }}
                />
                <div className="mt-6 h-[45px]">
                  <SearchForm customClass="" />
                </div>
              </nav>
              <div className="mt-auto">
                <Button
                  variant="default"
                  className="font-semibold  w-full  px-6"
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/contact");
                  }}
                >
                  Contact Us
                  <Image
                    src="/icons/button-arrow.svg"
                    height={20}
                    width={20}
                    alt="phone"
                  ></Image>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default Topnav2;

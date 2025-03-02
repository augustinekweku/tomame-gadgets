import React from "react";
import { SearchForm } from "./SearchForm";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CATEGORIES } from "@/constants";
import { Button } from "./ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open}>
      <DialogContent className="w-11/12 rounded-lg px-2">
        <Button
          variant="outline"
          size="icon"
          className="ml-auto absolute top-4 right-4"
          onClick={() => {
            onClose();
          }}
        >
          <span className="sr-only">Close menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
        <div className="p-2  mt-10">
          <SearchForm
            customClass="w-full !h-[45px]"
            onSubmit={() => {
              onClose();
            }}
          />
          <ul className="grid grid-cols-2 gap-2 mt-4">
            {Object.keys(CATEGORIES).map((category) => (
              <li key={category} className="custom-list-icon">
                <Link
                  onClick={() => {
                    onClose();
                  }}
                  href={`/product/category/${CATEGORIES[category as keyof typeof CATEGORIES].value}`}
                  className="text-gray-800 text-sm"
                >
                  {CATEGORIES[category as keyof typeof CATEGORIES].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;

import React from "react";
import { SearchForm } from "./SearchForm";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CATEGORIES } from "@/constants";
import { Button } from "./ui/button";
import { X } from "lucide-react";

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
          <X className="h-6 w-6" />
        </Button>
        <div className="p-2  mt-10">
          <SearchForm
            customClass="w-full !h-[45px]"
            shouldFocus
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

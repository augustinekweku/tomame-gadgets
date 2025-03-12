"use client";

import { IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// the  type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const useProductsTableColumns = ({
  onViewProduct,
}: {
  onViewProduct: (product: IProduct) => void;
}) => {
  const ProductsTableColumns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "title",
      header: "Product Name",
      enableSorting: true,
    },
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("imageUrl");
        return (
          <Image
            className="w-12 h-12 object-cover rounded-lg"
            src={(imageUrl as string) ?? "/images/image-placeholder.png"}
            alt="Product"
            width={48}
            height={48}
          />
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Selling Price
            <ArrowUpDown />
          </Button>
        );
      },
      enableSorting: true,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "GHS",
        }).format(amount);

        return <div className=" font-medium">{formatted}</div>;
      },
    },

    {
      accessorKey: "publishedAt",
      header: "Date Published",
      cell: ({ row }) => {
        const date = moment(row.getValue("publishedAt")).format(
          "MMM DD, YYYY h:mm A"
        );

        return <div className=" font-medium">{date}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_SITE_URL + "/product/" + product.slug.current}`
                  );
                  toast("Product URL copied to clipboard");
                }}
              >
                Copy Product Url
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  onViewProduct(product);
                }}
              >
                View More Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return ProductsTableColumns;
};

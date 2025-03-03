"use client";
import { IProduct } from "@/types";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IKImage } from "imagekitio-next";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { truncateText } from "@/utils";
type ProductCardProps = {
  product: IProduct;
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const isProductInWishlist = (product: IProduct) => {
    const wishlist = localStorage.getItem(LOCAL_STORAGE_KEYS.wishlist);
    if (wishlist) {
      const products = JSON.parse(wishlist);
      return products.some((p: IProduct) => p._id === product._id);
    }
    return false;
  };

  const addToWishlist = (product: IProduct) => {
    const wishlist = localStorage.getItem(LOCAL_STORAGE_KEYS.wishlist);
    //check if product is already in wishlist
    if (isProductInWishlist(product)) {
      toast.error("Product already in wishlist");
      return;
    }
    if (wishlist) {
      const products = JSON.parse(wishlist);
      products.push(product);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.wishlist,
        JSON.stringify(products)
      );
      toast.success("Product added to wishlist");
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.wishlist,
        JSON.stringify([product])
      );
      toast.success("Product added to wishlist");
    }
  };
  return (
    <div className="product-card group relative rounded-lg border border-gray-200 bg-white p-2 lg:p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-full flex lg:flex-col flex-row gap-2 ">
        <div className="w-28 lg:w-full lg:h-48 h-28 flex-none lg:mb-3">
          <img
            src={product.imageUrl}
            alt="Alt text"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <a href={`/product/${product.slug.current}`}>
            <p className="text-xs  lg:text-lg font-semibold leading-tight text-gray-900 hover:underline ">
              {truncateText(product.title, 150)}
            </p>
          </a>

          <div className="mt-auto">
            <div className="flex justify-between">
              <ul className="flex items-center gap-4">
                <li className="flex items-center gap-2 hidden">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Fast Delivery
                  </p>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Best Price
                  </p>
                </li>
              </ul>

              <Button
                variant={"ghost"}
                size={"lg"}
                className="like-button p-0 "
                onClick={() => {
                  addToWishlist(product);
                }}
              >
                <Heart size={"lg"} className="h-10 w-10 text-primary" />
              </Button>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-start  lg:justify-between gap-4">
              <p className="text-base lg:text-lg font-bold leading-tight text-gray-900 dark:text-white text-nowrap">
                GH₵ {product.price}
              </p>

              <Button
                type="button"
                variant={"default"}
                className="hidden lg:block transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                onClick={() => {
                  router.push(`/product/${product.slug.current}`);
                }}
              >
                <p>View Product</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

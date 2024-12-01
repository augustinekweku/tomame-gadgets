"use client";
import { IProduct } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type ProductCardProps = {
  product: IProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <Link href={`/product/${product.slug.current}`}>
          <img
            className="mx-auto h-full dark:hidden"
            src={
              product.imageUrl
                ? product.imageUrl
                : "https://via.placeholder.com/300"
            }
            alt=""
          />
        </Link>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4 hidden">
          <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
            {" "}
            Up to 35% off{" "}
          </span>
        </div>

        <a
          href={`/product/${product.slug.current}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.title}
        </a>

        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2 hidden">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-LG font-bold leading-tight text-gray-900 dark:text-white">
            GH₵ {product.price}
          </p>

          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black border-b-2 hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={() => {
              router.push(`/product/${product.slug.current}`);
            }}
          >
            <svg
              className="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

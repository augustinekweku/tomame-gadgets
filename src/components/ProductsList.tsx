"use client";
import React, { useState, useEffect, Suspense } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/sanity/client";
import LoadingCards from "./LoadingCards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/constants";
import {
  allProductsPaginatedQuery,
  paginatedByCategoryquery,
} from "@/sanity/groq";
import EmptyState from "./EmptyState";

type ProductListProps = {
  products: IProduct[];
};

const ProductsList = ({ products }: ProductListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageIndex = parseInt(page as string) || 1;
  const category = searchParams.get("category") ?? "all";

  const POSTS_PER_PAGE = 10;

  const [isLoading, setIsLoading] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // [(($pageIndex - 1) * 10)...$pageIndex * 10]{
  const paramsForQuery = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE,
    category,
  };

  // const fetcher = (query, params) =>
  //   client && client.fetch(query, params);

  const {
    data: posts,
    error,
    mutate,
    // isValidating,
  } = useSWR(
    [
      category !== "all" ? paginatedByCategoryquery : allProductsPaginatedQuery,
      paramsForQuery,
    ],
    fetcher,
    {
      fallbackData: products,

      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );

  useEffect(() => {
    setIsFirstPage(pageIndex < 2);
  }, [pageIndex]);

  useEffect(() => {
    setIsLastPage(posts?.length < POSTS_PER_PAGE);
  }, [posts]);

  const handleNextPage = () => {
    router.push(`/?page=${pageIndex + 1}&category=${category}`);
  };

  const handlePrevPage = () => {
    router.push(`/?page=${pageIndex - 1}&category=${category}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {/* <!-- Heading & Filters --> */}
          <div className="mb-4 items-center justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8 ">
            <div>
              <nav className="flex !hidden" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      <svg
                        className="me-2.5 h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                      Home
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 rtl:rotate-180"
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
                          d="m9 5 7 7-7 7"
                        />
                      </svg>
                      <a
                        href="#"
                        className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                      >
                        Products
                      </a>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 rtl:rotate-180"
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
                          d="m9 5 7 7-7 7"
                        />
                      </svg>
                      <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                        Electronics
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h2 className=" text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Shop
              </h2>
            </div>
            <div>
              <Select
                value={category}
                onValueChange={(e) => {
                  //set category value in the url
                  mutate();
                  //update the url with the new category in addition to the page
                  router.push(`/?page=1&category=${e}`);
                  console.log("value changed", e);
                }}
              >
                <SelectTrigger className="w-full md:w-[200px] lg:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All Products</SelectItem>
                  {Object.keys(CATEGORIES).map((category) => (
                    <SelectItem key={category} value={category}>
                      {CATEGORIES[category as keyof typeof CATEGORIES].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* <!-- error state --> */}
          {error && !isLoading && !posts?.length && (
            <div className="flex h-40 items-center justify-center">
              <span className="text-lg text-red-500">Error fetching data!</span>
            </div>
          )}
          {posts && posts?.length === 0 && (
            <div className="flex h-40 items-center justify-center">
              <EmptyState title="No products found." />
            </div>
          )}

          {isLoading && (
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
              {new Array(6).fill(undefined).map((item, index) => (
                <div key={index}>
                  <LoadingCards />
                </div>
              ))}
            </div>
          )}
          {posts && !isLoading && (
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
              {posts.map((product: IProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="w-full text-center">
            <div className="mt-10 flex items-center justify-center">
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  disabled={isFirstPage}
                  onClick={handlePrevPage}
                  className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
                >
                  <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={isLastPage}
                  className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
                >
                  <span>Next</span>
                  <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ProductsList;

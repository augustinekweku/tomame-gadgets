"use client";
import React, { useState, useEffect, Suspense } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

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
import { CATEGORIES, PRODUCT_PUBLISH_STATUS } from "@/constants";
import {
  allProductsCountQuery,
  allProductsCountQueryForAdmin,
  allProductsPaginatedQuery,
  allProductsPaginatedQueryForAdmin,
  paginatedByCategoryquery,
  paginatedByCategoryqueryForAdmin,
  searchCountAllQuery,
  searchCountAllQueryForAdmin,
  searchquery,
  searchqueryForAdmin,
} from "@/sanity/groq";
import EmptyState from "./EmptyState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductsTable } from "./ProductsTable/ProductsTable";

type ProductListProps = {
  products?: IProduct[];
  category?: string;
  isSearching?: boolean;
  isAdmin?: boolean;
};

const ProductsList = ({
  products,
  category: defaultCategory,
  isSearching,
  isAdmin,
}: ProductListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageIndex = parseInt(page as string) || 1;
  const pageSize = parseInt(searchParams.get("pageSize") as string) || 12;
  const category = searchParams.get("category") ?? defaultCategory ?? "all";
  const q = searchParams.get("q");

  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // [(($pageIndex - 1) * 10)...$pageIndex * 10]{

  function paramsForQuery() {
    if (!isAdmin)
      return {
        pageIndex: (pageIndex - 1) * pageSize,
        limit: pageIndex * pageSize,
        category,
        q,
        publishStatus: PRODUCT_PUBLISH_STATUS.published.value,
      };
    return {
      pageIndex: (pageIndex - 1) * pageSize,
      limit: pageIndex * pageSize,
      category,
      q,
    };
  }

  function paramsForSearchQuery() {
    if (!isAdmin) {
      return {
        pageIndex: (pageIndex - 1) * pageSize,
        limit: pageIndex * pageSize,
        q: q,
        publishStatus: PRODUCT_PUBLISH_STATUS.published.value,
      };
    }
    return {
      q: q,
    };
  }

  function getQueryToUse() {
    if (isSearching || q) {
      return isAdmin ? searchqueryForAdmin : searchquery;
    }

    if (category !== "all") {
      return isAdmin
        ? paginatedByCategoryqueryForAdmin
        : paginatedByCategoryquery;
    } else {
      return isAdmin
        ? allProductsPaginatedQueryForAdmin
        : allProductsPaginatedQuery;
    }
  }

  function getSearchQueryCountToUse() {
    if (isSearching || q) {
      return isAdmin ? searchCountAllQueryForAdmin : searchCountAllQuery;
    }
    return isAdmin ? allProductsCountQueryForAdmin : allProductsCountQuery;
  }

  const fetchPosts = () => fetcher([getQueryToUse(), paramsForQuery()]);
  const fetchCount = () =>
    fetcher([getSearchQueryCountToUse(), paramsForSearchQuery()]);

  const {
    data: productsResponse,
    error,
    isValidating,
    mutate,
  } = useSWR<{ products: IProduct[]; allProductsCount: number | undefined }>(
    "batchedRequests",
    async () => {
      const [products, allProductsCount] = await Promise.all([
        fetchPosts(),
        fetchCount(),
      ]);
      return { products, allProductsCount };
    },
    {
      revalidateOnFocus: false,
      fallbackData: {
        products: products ?? [],
        allProductsCount: products?.length ?? 0,
      },
    }
  );

  useEffect(() => {
    if (productsResponse?.allProductsCount)
      setTotalPages(Math.ceil(productsResponse?.allProductsCount / pageSize));
  }, [productsResponse?.allProductsCount, pageSize]);

  useEffect(() => {
    setIsFirstPage(pageIndex < 2);
  }, [pageIndex]);

  useEffect(() => {
    if (!productsResponse?.products?.length) return setIsLastPage(true);
    setIsLastPage(productsResponse?.products?.length < pageSize);
  }, [productsResponse?.products]);

  const handleNextPage = () => {
    router.push(`/?page=${pageIndex + 1}&category=${category}#shop`);
  };

  const handlePrevPage = () => {
    router.push(`/?page=${pageIndex - 1}&category=${category}#shop`);
  };

  function canShowEmptyState() {
    return !isValidating && !productsResponse?.products?.length;
  }

  useEffect(() => {
    mutate();
  }, [pageIndex, pageSize, q, category]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {!isAdmin && (
            <>
              {/* <!-- Search Results Header --> */}
              {isSearching && (
                <div className="mb-4 items-center justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8 ">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Search Results for &quot;{q}&quot;
                  </h2>
                </div>
              )}
              {/* <!-- Heading & Filters --> */}
              {!defaultCategory && !isSearching && (
                <div className="mb-4 items-center justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8 ">
                  <div className="flex items-center gap-6">
                    <h2 className=" text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                      {CATEGORIES[category as keyof typeof CATEGORIES]?.name ??
                        "All Products"}
                    </h2>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex gap-1 items-center text-sm font-semibold text-primary ">
                          {CATEGORIES[category as keyof typeof CATEGORIES]
                            ?.name ?? "All Products"}{" "}
                          <ChevronDownIcon className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                          <DropdownMenuItem
                            onClick={() => {
                              router.push(`/?page=1&category=all#shop`);
                            }}
                          >
                            All Products
                          </DropdownMenuItem>

                          {Object.keys(CATEGORIES).map((category) => (
                            <DropdownMenuItem
                              key={category}
                              onClick={() => {
                                router.push(
                                  `/?page=1&category=${category}#shop`
                                );
                              }}
                            >
                              {
                                CATEGORIES[category as keyof typeof CATEGORIES]
                                  .name
                              }
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="hidden">
                    <Select
                      value={category}
                      onValueChange={(e) => {
                        //set category value in the url
                        mutate();
                        //update the url with the new category in addition to the page
                        router.push(`/?page=1&category=${e}#shop`);
                      }}
                    >
                      <SelectTrigger className="w-full md:w-[200px] lg:w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"all"}>All Products</SelectItem>
                        {Object.keys(CATEGORIES).map((category) => (
                          <SelectItem key={category} value={category}>
                            {
                              CATEGORIES[category as keyof typeof CATEGORIES]
                                .name
                            }
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {/* <!-- error state --> */}
              {error &&
                !isValidating &&
                !productsResponse?.products?.length && (
                  <div className="flex h-40 items-center justify-center">
                    <span className="text-lg text-red-500">
                      Error fetching data!
                    </span>
                  </div>
                )}
              {canShowEmptyState() && (
                <div className="flex  items-center justify-center">
                  {q ? (
                    <EmptyState
                      customElement={
                        <div className="">
                          <h2 className="mt-2 text-lg font-medium text-gray-400 mb-3">
                            {" "}
                            No results found for{" "}
                            <span className="font-bold">{q}</span>
                          </h2>
                          <div>
                            <h3 className="font-bold my-3">Search Tips</h3>
                            <ul className="list-disc list-inside">
                              <li>Try using a different keyword</li>
                              <li>Double-check your spelling</li>
                              <li>Try a more general keyword</li>
                            </ul>
                          </div>
                        </div>
                      }
                    />
                  ) : (
                    <EmptyState title="No products found." />
                  )}
                </div>
              )}

              {isValidating && (
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                  {new Array(6).fill(undefined).map((item, index) => (
                    <div key={index}>
                      <LoadingCards />
                    </div>
                  ))}
                </div>
              )}
              {productsResponse?.products && !isValidating && (
                <div className="mb-4 grid gap-4 grid-cols-1 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                  {productsResponse?.products.map((product: IProduct) => (
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
                      <ChevronRightIcon
                        className="h-3 w-3"
                        aria-hidden="true"
                      />
                    </button>
                  </nav>
                </div>
              </div>
            </>
          )}
          {isAdmin && (
            <ProductsTable
              productsResponse={productsResponse?.products ?? []}
              isLoadingProducts={isValidating}
              paginationProps={{
                currentPage: pageIndex,
                totalPages: totalPages,
                pageSize: pageSize,
                totalCount: productsResponse?.allProductsCount,
                onPageChange: (page) => {
                  router.push(`/admin?page=${page.page}&pageSize=${pageSize}`);
                },
                loading: isValidating,
              }}
            />
          )}
        </div>
      </section>
    </Suspense>
  );
};

export default ProductsList;

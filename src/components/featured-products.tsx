"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";
import { fetcher } from "@/sanity/client";
import { allHotDealsPaginatedQuery } from "@/sanity/groq";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { IProduct } from "@/types";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { truncateText } from "@/utils";

export default function FeaturedProducts() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = parseInt(searchParams.get("pageSize") as string) || 12;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const pageIndex = parseInt(page as string) || 1;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const [encodedText, setEncodedText] = useState<string>("");

  function paramsForQuery() {
    return {
      pageIndex: (pageIndex - 1) * pageSize,
      limit: pageIndex * pageSize,
      publishStatus: "published", // Assuming you want only published products
    };
  }

  const fetchPosts = () =>
    fetcher([allHotDealsPaginatedQuery, paramsForQuery()]);

  const { data: hotDeals } = useSWR<{ hotDeals: IProduct[] }>(
    "hotDeals",
    async () => {
      const [hotDeals] = await Promise.all([fetchPosts()]);
      return { hotDeals };
    },
    {
      revalidateOnFocus: false,
    }
  );

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -140, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 140, behavior: "smooth" });
    }
  };

  const openFullscreen = (image: string) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <>
      <section className="mx-auto max-w-screen-xl px-4 2xl:px-0 py-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Hot Deals</h2>
          <p className="text-gray-600 text-sm">
            Discover our top picks just for you
          </p>
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6 p-0 bg-white shadow-md"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-2 w-2" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-6 w-6 p-0 bg-white shadow-md"
            onClick={scrollRight}
          >
            <ChevronRight className="h-2 w-2" />
          </Button>

          {/* Products Container */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-8"
          >
            {hotDeals?.hotDeals.map((product) => (
              <Card
                key={product._id}
                className="flex-none w-28 snap-start cursor-pointer"
                onClick={() => {
                  setEncodedText(
                    encodeURIComponent(
                      `Hi, I would like to know more about this product (${product.title}${product?.price ? " || GHs " + product?.price : ""}) \n ${siteUrl}/hot-deal/${product.slug.current}`
                    )
                  );

                  openFullscreen(product.imageUrl);
                }}
              >
                <CardContent className="p-1">
                  <div className="relative">
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={400}
                      className="w-full h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    />
                    {/* <Badge
                      variant="secondary"
                      className="absolute top-1 left-1 text-xs px-1 py-0.5 text-[10px]"
                    >
                      {}
                    </Badge> */}
                    <div className="absolute bottom-0 left-0 w-full bg-black/30 text-white text-[0.6rem] px-2 py-1 rounded-b-lg">
                      {truncateText(product.title, 30)}
                    </div>
                    {/* <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-3 w-3" />
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            // Close modal only if the click is outside the content area
            if (e.target === e.currentTarget) {
              closeFullscreen();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeFullscreen();
            }
          }}
        >
          <div className="relative fullscreen-product max-w-full max-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 h-10 w-10 p-0 bg-white/50 hover:bg-white/30 text-white"
              onClick={closeFullscreen}
            >
              <X className="h-6 w-6 " />
            </Button>
            <Image
              src={fullscreenImage || "/placeholder.svg"}
              alt="Product image"
              width={500}
              height={500}
              className="max-w-full max-h-full object-contain"
            />
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                target="_blank"
                href={`https://wa.me/233241801505?text=${encodedText}`}
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
              >
                <ChatBubbleIcon className="w-5 h-5 me-2" />
                Chat Seller to buy
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

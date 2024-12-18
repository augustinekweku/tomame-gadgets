import { IProduct } from "@/types";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React from "react";
import { PortableText } from "@portabletext/react";
import { TypedObject } from "sanity";
import Link from "next/link";
import { extractImageUrls, truncateText } from "@/utils";
import ProductDetailsImagesGallery from "./ProductDetailsImagesGallery";

type ProductDeatilsProps = {
  product: IProduct;
};
const ProductDetails = ({ product }: ProductDeatilsProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const encodedText = encodeURIComponent(
    `Hi, I would like to know more about this product (${product.title} || GHs${product.price}) \n ${siteUrl}/product/${product.slug.current}`
  );

  function getImages() {
    const images = extractImageUrls(product);
    return images ? images : [];
  }
  return (
    <div>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8 ">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <Link
                      href="/"
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
                      All products
                    </Link>
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
                        {truncateText(product.title, 20)}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg ">
              <img
                className="w-full dark:hidden"
                src={
                  product.imageUrl
                    ? product.imageUrl
                    : "/images/placeholder.jpg"
                }
                alt=""
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  GH₵ {product.price}
                </p>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href={`https://wa.me/233241801505?text=${encodedText}`}
                  title=""
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                >
                  <ChatBubbleIcon className="w-5 h-5 me-2" />
                  Chat Seller to buy
                </a>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              {getImages()?.length && (
                <div>
                  <ProductDetailsImagesGallery images={getImages()} />
                </div>
              )}
              <div className="mb-6 text-gray-500 dark:text-gray-400 mt-10">
                <PortableText
                  value={product.body as unknown as TypedObject | TypedObject[]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;

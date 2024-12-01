import { IProduct } from "@/types";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React from "react";
import { PortableText } from "@portabletext/react";
import { TypedObject } from "sanity";

type ProductDeatilsProps = {
  product: IProduct;
};
const ProductDetails = async ({ product }: ProductDeatilsProps) => {
  // const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // const encodedText = encodeURIComponent(
  //   `Hi, I would like to know more about this product \n ${siteUrl}/product/${product.slug.current}`
  // );
  return (
    <div>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
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
                  GH ₵ {product.price}
                </p>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  // href={`https://wa.me/233241801505?text=${encodedText}`}
                  title=""
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                >
                  <ChatBubbleIcon className="w-5 h-5 me-2" />
                  Chat Seller to buy
                </a>

                <a
                  href="#"
                  title=""
                  className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  role="button"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
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
                  Add to cart
                </a>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <div className="mb-6 text-gray-500 dark:text-gray-400">
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

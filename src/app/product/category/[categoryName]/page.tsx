import ProductListContainer from "@/app/ProductListContainer";
import { CATEGORIES } from "@/constants";
import React from "react";

function getCategoryBannerMap(categoryName: string) {
  const category = CATEGORIES[categoryName as keyof typeof CATEGORIES];
  if (category) {
    return category.banner;
  } else {
    return "/images/slider-3.jpeg";
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const categoryName = (await params).categoryName;

  return (
    <div className="container">
      <div
        className="relative h-48 lg:h-60 rounded-b-lg bg-cover bg-center bg-no-repeat shadow-lg"
        style={{
          backgroundImage: `url(${getCategoryBannerMap(categoryName)})`,
          backgroundPosition: "center center",
        }}
      ></div>
      <div className=" flex flex-col items-start justify-center space-y-4 py-4 px-4 sm:flex-row sm:space-y-0 md:justify-between lg:px-0">
        <div className="max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800">
            {" "}
            {CATEGORIES[categoryName as keyof typeof CATEGORIES]?.name ??
              "All Products"}
          </h1>
          <p className="mt-2 text-gray-600">
            {CATEGORIES[categoryName as keyof typeof CATEGORIES]?.description ??
              "All products in this category"}
          </p>
        </div>
      </div>

      <main>
        <div id="shop">
          <ProductListContainer category={categoryName} />
        </div>
      </main>
    </div>
  );
}

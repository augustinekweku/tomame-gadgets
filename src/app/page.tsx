// import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
// import Link from "next/link";
import { IProduct } from "@/types";
import ProductListContainer from "./ProductListContainer";
import { Metadata } from "next";
import HomePageSlider from "@/components/HomePageSlider";
import FeaturedProducts from "@/components/featured-products";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && publishStatus == "published"
]|order(publishedAt desc)[0...10]{_id, title, slug, "imageUrl": image.asset->url, price,  publishedAt}`;

const options = { next: { revalidate: 30 } };

export const metadata: Metadata = {
  title: "Brox Gadgets",
  description:
    "Buy your Iphones, Laptops, Macbooks, Samsung, Console games, etc. at affordable prices at Brox Gadgets.",
  keywords: "Brox Gadgets, Iphones, Laptops, Macbooks, Samsung, Console games",
  icons: "/images/favicon.png",
};

export default async function Home() {
  const posts = await client.fetch<IProduct[]>(POSTS_QUERY, {}, options);

  return (
    <div>
      <div>
        {/* <HomePageSlider /> */}
        <FeaturedProducts />
      </div>
      <div id="shop">
        <ProductListContainer products={posts} />
      </div>
    </div>
  );
}

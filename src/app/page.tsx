// import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
// import Link from "next/link";
import { IProduct } from "@/types";
import ProductListContainer from "./ProductListContainer";
import { Metadata } from "next";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...10]{_id, title, slug, "imageUrl": image.asset->url, price,  publishedAt}`;

const options = { next: { revalidate: 30 } };

export const metadata: Metadata = {
  title: "Brox Gadgets",
  description:
    "Buy your Iphones, Laptops, Macbooks, Samsung, Console games, etc. at affordable prices.",
  keywords: "Iphones, Laptops, Macbooks, Samsung, Console games",
};

export default async function Home() {
  const posts = await client.fetch<IProduct[]>(POSTS_QUERY, {}, options);

  return (
    <div>
      <ProductListContainer products={posts} />
    </div>
  );
}

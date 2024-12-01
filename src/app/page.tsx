import ProductsList from "@/components/ProductsList";
// import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
// import Link from "next/link";
import { IProduct } from "@/types";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...2]{_id, title, slug, "imageUrl": image.asset->url, price,  publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const posts = await client.fetch<IProduct[]>(POSTS_QUERY, {}, options);

  return (
    <div>
      <ProductsList products={posts} />
    </div>
  );
}

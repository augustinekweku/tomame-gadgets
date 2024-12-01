import ProductDetails from "@/components/ProductDetails";
import { getPostBySlug } from "@/sanity/client";
import Head from "next/head";
import { IProduct } from "@/types";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getPostBySlug(slug);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {generateMetaData(product)}
      <ProductDetails product={product} />
    </main>
  );
}

export function generateMetaData(product: IProduct) {
  const { title, price, imageUrl } = product;

  const metaTitle = `${title} || GHS ${price}`;

  return (
    <Head>
      <title>{metaTitle}</title>
      {imageUrl && <link rel="icon" type="image/png" href={imageUrl} />}
    </Head>
  );
}

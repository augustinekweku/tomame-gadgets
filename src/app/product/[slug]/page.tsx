import { getPostBySlug } from "@/sanity/client";
import ProductDetailsContainer from "../ProductDetailsContainer";
import Head from "next/head";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { IProduct } from "@/types";
import { formatNumberWithCommas } from "@/utils";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product: IProduct = await getPostBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.title} || GHS ${formatNumberWithCommas(product.price)}`,
    openGraph: {
      images: [product.imageUrl, ...previousImages],
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getPostBySlug(slug);
  if (!product.title) {
    return redirect("/not-found");
  }
  const { title, price, imageUrl } = product;

  const metaTitle = `${title} || GHS ${price}`;

  return (
    <>
      <Head key={slug}>
        <title>{metaTitle}</title>
        {imageUrl && <link rel="icon" type="image/png" href={imageUrl} />}
      </Head>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <ProductDetailsContainer product={product} />
      </main>
    </>
  );
}

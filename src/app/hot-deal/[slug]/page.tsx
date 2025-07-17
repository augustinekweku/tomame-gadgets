import { getHotDealBySlug, getPostBySlug } from "@/sanity/client";
import Head from "next/head";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { IProduct } from "@/types";
import ProductDetailsContainer from "@/app/product/ProductDetailsContainer";

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
    title: `${product.title} `,
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
  const product = await getHotDealBySlug(slug);
  if (!product.title) {
    return redirect("/not-found");
  }
  const { title, imageUrl } = product;

  const metaTitle = `${title}`;

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

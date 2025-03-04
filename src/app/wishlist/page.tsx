"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { IProduct } from "@/types";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import Link from "next/link";
import { formatNumberWithCommas } from "@/utils";

export default function WishListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEYS.wishlist);
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <div className="container">
      <div className="lg:w-2/3 mx-auto max-sm:border-none lg:border my-4 lg:p-4 rounded-lg">
        <h4 className="font-bold text-primary text-base lg:text-2xl mb-3">
          Wishlist <span>({products.length})</span>
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {!!products.length &&
            products.map((product, index) => (
              <div key={index} className="border-b pb-3">
                <Link
                  href={`/product/${product.slug.current}`}
                  className="flex justify-between"
                >
                  <div className="flex">
                    <Image
                      src={product.imageUrl}
                      className="rounded-lg border object-cover mr-2 h-[90px] flex-none"
                      alt={product.title}
                      width={100}
                      height={100}
                    />
                    <div className="mt-1 flex flex-col">
                      <p className="text-sm lg:text-base mb-1 lg:w-3/4 pr-2">
                        {product.title} <br />
                      </p>
                      <p className="text-base lg:text-2xl font-semibold lg:hidden mb-1 lg:text-nowrap">
                        GHC {product.price}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm lg:text-lg font-semibold text-nowrap">
                      GHC {formatNumberWithCommas(product.price)}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center mt-2">
                  <Button
                    variant="default"
                    size={"sm"}
                    className="font-bold !py-2  w-[100px] flex-none"
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="ghost"
                    size={"sm"}
                    className="text-primary font-bold"
                    onClick={() => {
                      const updatedProducts = products.filter(
                        (_, i) => i !== index
                      );
                      setProducts(updatedProducts);
                      localStorage.setItem(
                        "wishlistProducts",
                        JSON.stringify(updatedProducts)
                      );
                    }}
                  >
                    <Trash2 size={24} />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          {!products.length && (
            <div className="flex h-40 items-center justify-center flex-col my-4">
              <EmptyState title="No products in your wishlist!" />
              <Button
                className="mt-3"
                variant="default"
                onClick={() => {
                  router.push("/");
                }}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

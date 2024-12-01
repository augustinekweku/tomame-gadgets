"use client";

import ProductDetails from "@/components/ProductDetails";
import { IProduct } from "@/types";
import { Suspense } from "react";

interface Iprops {
  product: IProduct;
}

const ProductDetailsContainer = ({ product }: Iprops) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails product={product} />
    </Suspense>
  );
};

export default ProductDetailsContainer;

import ProductsList from "@/components/ProductsList";
import React, { Suspense } from "react";
import { IProduct } from "@/types";

interface IProps {
  products: IProduct[];
}

const ProductListContainer = ({ products }: IProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">Loading...</div>
      }
    >
      <ProductsList products={products} />
    </Suspense>
  );
};

export default ProductListContainer;

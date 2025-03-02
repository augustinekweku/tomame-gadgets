import ProductsList from "@/components/ProductsList";
import React, { Suspense } from "react";
import { IProduct } from "@/types";

interface IProps {
  products?: IProduct[];
  category?: string;
}

const ProductListContainer = ({ products, category }: IProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">Loading...</div>
      }
    >
      <ProductsList products={products} category={category} />
    </Suspense>
  );
};

export default ProductListContainer;

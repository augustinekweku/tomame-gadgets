"use client";
import ProductsList from "@/components/ProductsList";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-gray-50">
        <ProductsList isSearching />
      </div>
    </Suspense>
  );
}

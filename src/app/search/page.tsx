"use client";
import ProductsList from "@/components/ProductsList";

export default function SearchPage() {
  return (
    <div className="bg-gray-50">
      <ProductsList isSearching />
    </div>
  );
}

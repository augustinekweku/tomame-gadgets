"use client";
import ProductsList from "@/components/ProductsList";

export default function SearchPage() {
  return (
    <div className="container">
      <ProductsList isSearching />
    </div>
  );
}

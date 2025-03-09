"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import { useProductsTableColumns } from "./Columns";
import { IProduct } from "@/types";
import { PaginationProps } from "../TablePagination";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { ProductModal } from "../Modals/ProductModal";
import { useState } from "react";
import { SearchForm } from "../SearchForm";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

type Props = Readonly<{
  productsResponse: IProduct[];
  isLoadingProducts: boolean;
  paginationProps: PaginationProps;
}>;

export function ProductsTable({
  productsResponse,
  isLoadingProducts,
  paginationProps,
}: Props) {
  const ProductsTableColumns = useProductsTableColumns({
    onViewProduct(product) {
      setSelectedProduct(product);
      setOpenProductModal(true);
    },
  });
  const [getQueryString, pushRoute] = useUpdateSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [openProductModal, setOpenProductModal] = useState(false);
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div>
      <ProductModal
        open={openProductModal}
        openOpenChange={() => setOpenProductModal(!openProductModal)}
        product={selectedProduct}
      />
      <Tabs defaultValue="all" className="tabsss">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active" disabled>
              Active
            </TabsTrigger>
            <TabsTrigger value="archived" className="" disabled>
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  <span className="text-gray-400">Page Size</span> (
                  {paginationProps.pageSize})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                {[5, 10, 25, 50, 100].map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onSelect={() => {
                      pushRoute(
                        getQueryString("pageSize", size as unknown as string)
                      );
                      pushRoute(getQueryString("page", "1"));
                    }}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent value="all">
          <Card className="overflow-hidden p-0">
            <CardHeader className="px-2 py-4">
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
              <div className="h-9">
                <SearchForm customClass="" isAdmin />
              </div>
              {q && (
                <div className="flex items-center gap-2 ">
                  <p className="text-xs">
                    Showing Search results for <strong>{q}</strong>
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      pushRoute(getQueryString("q", ""));
                    }}
                    className="!p-1 text-xs h-5"
                  >
                    Clear Search
                    <X className="h-2 w-2 font-semibold" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <DataTable
                columns={ProductsTableColumns}
                data={productsResponse}
                isLoading={isLoadingProducts}
                paginationProps={paginationProps}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card className="overflow-hidden ">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="card-content">
              <DataTable
                columns={ProductsTableColumns}
                data={productsResponse}
                isLoading={isLoadingProducts}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

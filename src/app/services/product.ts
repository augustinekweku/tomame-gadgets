import { IProduct } from "@/types";

async function publishProduct(product: IProduct): Promise<void> {
  await fetch("/api/publish-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}

const ProductServices = {
  publishProduct,
};

export default ProductServices;

// app/api/services/productService.ts

import { IProduct } from "@/types";
import sanityClient from "@sanity/client";

// Configure Sanity client
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2021-03-25",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false, // Set to false for write operations
});

// Create a new product
export async function createProduct(
  product: Omit<IProduct, "_id">
): Promise<IProduct> {
  try {
    const newProduct = await client.create({
      _type: "product",
      title: product.title,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
      body: product.body,
      publishStatus: product.publishStatus,
      publishedAt: product.publishedAt,
    });

    return {
      _id: newProduct._id,
      ...newProduct,
    };
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
}

// Get a product by ID
export async function getProductById(id: number): Promise<IProduct> {
  try {
    const query = `*[_type == "product" && _id == $id][0]`;
    const product = await client.fetch(query, { id });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

// Get all products
export async function getAllProducts(): Promise<IProduct[]> {
  try {
    const query = `*[_type == "product"]{
      _id,
      title,
      slug,
      price,
      imageUrl,
      body,
      publishStatus,
      publishedAt
    }`;
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

// Update a product
export async function updateProduct(
  id: number,
  product: Partial<IProduct>
): Promise<IProduct> {
  try {
    const updatedProduct = await client
      .patch(id.toString())
      .set({
        ...(product.title && { title: product.title }),
        ...(product.slug && { slug: product.slug }),
        ...(product.price && { price: product.price }),
        ...(product.imageUrl && { imageUrl: product.imageUrl }),
        ...(product.body && { body: product.body }),
        ...(product.publishStatus && { publishStatus: product.publishStatus }),
        ...(product.publishedAt && { publishedAt: product.publishedAt }),
      })
      .commit();

    return updatedProduct;
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

// Update publish status specifically
export async function updatePublishStatus(
  id: number,
  status: "published" | "archived"
): Promise<IProduct> {
  try {
    const updatedProduct = await client
      .patch(id.toString())
      .set({
        publishStatus: status,
        publishedAt:
          status === "published" ? new Date().toISOString() : undefined,
      })
      .commit();

    return updatedProduct;
  } catch (error) {
    throw new Error(`Failed to update publish status: ${error.message}`);
  }
}

// Delete a product
export async function deleteProduct(id: number): Promise<void> {
  try {
    await client.delete(id.toString());
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

import { createClient, QueryParams } from "next-sanity";
import {
  allProductsCountQuery,
  allProductsPaginatedQuery,
  searchquery,
  singlequery,
} from "./groq";

export const client = createClient({
  projectId: "pijooh83",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export const fetcher = async ([query, params]: [string, QueryParams]) => {
  return client ? client.fetch(query, params) : [];
};

export async function getPostBySlug(slug: string) {
  if (client) {
    return (
      (await client.fetch(
        singlequery,
        { slug },
        {
          cache: "no-cache",
        }
      )) || {}
    );
  }
  return {};
}

export async function getPaginatedPosts(limit: number) {
  if (client) {
    return (
      (await client.fetch(allProductsPaginatedQuery, {
        pageIndex: 0,
        limit: limit,
      })) || {}
    );
  }
  return {};
}

//search query
export async function searchProducts(q: string) {
  if (client) {
    return (
      (await client.fetch(
        searchquery,
        { q },
        {
          cache: "no-cache",
        }
      )) || {}
    );
  }
  return {};
}

// get all products count
export async function getAllProductsCount() {
  if (client) {
    return (await client.fetch(allProductsCountQuery)) || {};
  }
  return {};
}

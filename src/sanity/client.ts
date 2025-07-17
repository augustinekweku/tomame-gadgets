import { createClient, QueryParams } from "next-sanity";
import {
  allHotDealsPaginatedQuery,
  allProductsCountQuery,
  allProductsPaginatedQuery,
  searchquery,
  singleHotDeal,
  singlequery,
} from "./groq";

export const client = createClient({
  projectId: "pijooh83",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    process.env.SANITY_API_TOKEN ??
    "skn7WnW8hExuqVAMGdyvCC8u1OrejuSqmtuR1LfgHea3L1hCvaT5GPcFMus1WDrjhUvfyBrO3qyKb7LwkuAfffnlbhtHDwA8i4iNOvylml6kojNR8wRYQPYzMtmAUPVaLPqL4e0p8hTJ1W9mgiGmmx4VC3GQYiBoNyITVDuHS4ESFU1rfU3C",
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
export async function getHotDealBySlug(slug: string) {
  if (client) {
    return (
      (await client.fetch(
        singleHotDeal,
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
export async function getPaginatedHotDeals(limit: number) {
  if (client) {
    return (
      (await client.fetch(allHotDealsPaginatedQuery, {
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

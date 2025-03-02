import { groq } from "next-sanity";

// Single Post
export const singlequery = groq`
*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
     "imageUrl2": image2.asset->url, "imageUrl3": image3.asset->url, "imageUrl4": image4.asset->url,
    price,
    body,
    publishedAt
}
`;

// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get  paginated posts by category
export const paginatedByCategoryquery = groq`
*[_type == "product" && category == $category]   | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt
}
`;

// Get paginated posts

export const allProductsPaginatedQuery = groq`
*[_type == "product"] | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt
}
`;

// search query with pagination
export const searchquery = groq`
*[_type == "product" && title match $q] | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt
}
`;

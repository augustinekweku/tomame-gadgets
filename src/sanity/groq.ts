import { groq } from "next-sanity";

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    price,
    body,
    publishedAt
}
`;

// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    _id,
    body,
    publishedAt
}
`;

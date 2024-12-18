import { groq } from "next-sanity";

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
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

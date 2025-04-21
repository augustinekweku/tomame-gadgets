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
    publishedAt,
    condition,
}
`;

// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get  paginated posts by category
export const paginatedByCategoryquery = groq`
*[_type == "product" && category == $category && publishStatus == $publishStatus]   | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt,
    condition,


}
`;
export const paginatedByCategoryqueryForAdmin = groq`
*[_type == "product" && category == $category ]   | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt,
    condition


}
`;

// Get paginated posts

export const allProductsPaginatedQuery = groq`
*[_type == "product"  && publishStatus == $publishStatus] | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt,
    condition,

}
`;
export const allProductsPaginatedQueryForAdmin = groq`
*[_type == "product" ] | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt,
    condition
}
`;

// search query with pagination
export const searchquery = groq`
*[_type == "product" && title match $q && publishStatus == $publishStatus] | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt,
    condition
}
`;
export const searchqueryForAdmin = groq`
*[_type == "product" && title match $q] | order(publishedAt desc) [$pageIndex...$limit] {
    "imageUrl": image.asset->url,
    price,
    slug,
    title,
    category,
    _id,
    body,
    publishedAt,
    condition
}
`;

//search query count all products
export const searchCountAllQuery = groq`
count(*[_type == "product" && title match $q && publishStatus == $publishStatus])
`;
export const searchCountAllQueryForAdmin = groq`
count(*[_type == "product" && title match $q])
`;

//get all products count
export const allProductsCountQuery = groq`
count(*[_type == "product" && publishStatus == $publishStatus])
`;
export const allProductsCountQueryForAdmin = groq`
count(*[_type == "product"])
`;

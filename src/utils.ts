import { IProduct } from "./types";

export function truncateText(text: string, length: number) {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export const extractImageUrls = (data: IProduct): string[] => {
  return Object.keys(data)
    .filter(
      (key) =>
        key.startsWith("imageUrl") && data[key as keyof IProduct] !== null
    )
    .map((key) => data[key as keyof IProduct]) as string[];
};

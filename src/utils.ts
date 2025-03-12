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

export function formatNumberWithCommas(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const getSessionMaxAge = () => {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(0, 15);
  targetTime.setDate(targetTime.getDate() + 1);

  const difference = targetTime.getTime() - now.getTime();
  return Math.floor(difference / 1000);
};

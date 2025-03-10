"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useUpdateSearchParams(): [
  (name: string, value: string) => string,
  (queryString: string) => void,
] {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as unknown as string);
  const router = useRouter();

  function createQueryString(name: string, value: string) {
    params.set(name, value);
    return params.toString();
  }

  function pushRoute(queryString: string) {
    router.push(pathname + "?" + queryString, { scroll: false });
  }
  return [createQueryString, pushRoute];
}

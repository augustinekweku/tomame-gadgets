import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        height: "calc(100vh - 340px)",
      }}
      className="flex flex-col items-center justify-center text-center p-4"
    >
      <Image src="/images/empty-box.png" height={200} width={200} alt="404" />
      <h1 className="text-2xl font-bold my-2">
        Sorry, we could not find any matching results
      </h1>
      <p className="text-gray-500 mb-4">
        The page you are looking for does not exist or was recently deleted.
      </p>
      <Link href="/">
        <Button variant={"default"}>Go to Homepage</Button>
      </Link>
    </div>
  );
}

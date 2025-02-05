import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        height: "calc(100vh - 340px)",
      }}
      className="flex flex-col items-center justify-center text-center p-4"
    >
      <FolderOpen className="w-24 h-24 text-gray-500" />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-4">
        The page you are looking for does not exist or was recently deleted.
      </p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}

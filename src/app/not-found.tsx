import NotFound from "@/components/NotFound";
import { Suspense } from "react";

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFound />
    </Suspense>
  );
}

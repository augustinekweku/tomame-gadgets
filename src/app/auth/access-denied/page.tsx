import { AccessDenied } from "@/components/AccessDenied";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <div className="h-dvh flex items-center justify-center">
        <AccessDenied />
      </div>
    </Suspense>
  );
}

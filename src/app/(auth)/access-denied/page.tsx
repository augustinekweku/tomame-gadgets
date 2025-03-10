import AccessDenied from "@/components/AccessDenied";
import React, { Suspense } from "react";

export default function UserAccessDenied() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">Loading...</div>
      }
    >
      <AccessDenied />
    </Suspense>
  );
}

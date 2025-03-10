"use client";
import { SignOutButton } from "@clerk/nextjs";
import React, { Suspense } from "react";

const AccessDenied = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1 className="text-3xl font-bold text-center">Access Denied</h1>
        <p className="mt-3  text-center text-sm">
          Sign out and sign in with an authorized account
        </p>
        <div className="border border-1 p-3  rounded mt-3">
          <SignOutButton />
        </div>
      </div>
    </Suspense>
  );
};

export default AccessDenied;

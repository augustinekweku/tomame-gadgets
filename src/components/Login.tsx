"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function Login() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  return (
    <div
      className="flex items-center justify-center py-12"
      style={{
        minHeight: "calc(100vh - 19rem)",
      }}
    >
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="mx-auto h-10 w-auto"
          />

          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-muted">Login to your account to continue</p>
        </div>
        <div className="grid gap-4">
          <Button
            onClick={() => {
              setIsLoadingGoogle(true);
              signIn("google", {
                callbackUrl: "/admin",
              });
            }}
            variant="outline"
            className="w-full"
            isLoading={isLoadingGoogle}
            disabled={isLoadingGoogle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="mr-2 h-4 w-4"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.29 1.22 8.14 3.22l6.07-6.07C34.64 3.24 29.74 1 24 1 14.94 1 7.48 6.48 4.24 14.26l7.43 5.76C13.3 14.1 18.2 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24c0-1.64-.14-3.22-.4-4.75H24v9.5h12.7c-.55 2.95-2.18 5.45-4.6 7.12l7.43 5.76C43.52 37.52 46.5 31.2 46.5 24z"
              />
              <path
                fill="#FBBC05"
                d="M10.67 28.02c-.78-2.34-.78-4.84 0-7.18l-7.43-5.76C1.1 18.1 0 20.94 0 24s1.1 5.9 3.24 8.92l7.43-5.76z"
              />
              <path
                fill="#34A853"
                d="M24 46.5c5.74 0 10.64-1.9 14.2-5.14l-7.43-5.76c-2.02 1.36-4.56 2.18-7.43 2.18-5.8 0-10.7-4.6-12.33-10.52l-7.43 5.76C7.48 41.52 14.94 46.5 24 46.5z"
              />
            </svg>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

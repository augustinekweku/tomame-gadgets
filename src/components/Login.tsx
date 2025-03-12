"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function Login() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams?.get("callbackUrl");
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted">
              Welcome! Login to your account to continue
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              onClick={() => {
                setIsLoadingGoogle(true);
                signIn("google", {
                  callbackUrl: callbackURL ?? `${window.location.origin}`,
                });
              }}
              variant="default"
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
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {/* <Image
          src=""
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
}

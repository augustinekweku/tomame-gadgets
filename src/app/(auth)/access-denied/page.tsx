import { SignOutButton } from "@clerk/nextjs";
import React from "react";

const UserAccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">Access Denied</h1>
      <p className="mt-3  text-center text-sm">
        Sign out and sign in with an authorized account
      </p>
      <div className="border border-1 p-3  rounded mt-3">
        <SignOutButton />
      </div>
    </div>
  );
};

export default UserAccessDenied;

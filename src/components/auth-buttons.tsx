'use client'

import { SignInButton, SignUpButton, useUser, SignOutButton } from "@clerk/nextjs";
   
export default function AuthButtons() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <SignOutButton>
        <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          Sign Out
        </button>
      </SignOutButton>
    );
  }

  return (
    <div className="flex gap-4">
      <SignInButton mode="modal">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Sign Up
        </button>
      </SignUpButton>
    </div>
  );
}
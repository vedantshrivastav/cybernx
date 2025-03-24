"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp 
        path="/sign-up"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white dark:bg-gray-800 shadow-lg",
          },
        }}
      />
    </div>
  );
}
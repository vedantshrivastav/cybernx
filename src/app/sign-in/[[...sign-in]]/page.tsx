import { SignIn } from "@clerk/nextjs";
   
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn path="sing-in"
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
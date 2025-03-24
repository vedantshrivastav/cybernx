'use client'
// import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useState } from "react";
import LandingPage from "@/components/LandingPage";
export default function Home() {
  // const { userId, isLoaded } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  // if (!isLoaded) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  // if (!userId) {
  //   redirect("/sign-in");
  // }
  
  return <LandingPage/>;
}
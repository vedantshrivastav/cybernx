'use client'
import AuthButtons from "@/components/auth-buttons";
import { Suspense, useEffect, useState } from "react";
import './globals.css';
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import { DarkModeProvider } from "@/components/darkModeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <DarkModeProvider>
          {/* Add Header Here */}
          <Header />  
          <main>
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
        </DarkModeProvider>
      </body>
    </html>
  );
}

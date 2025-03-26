'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "@/components/darkModeContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();

  // Ensure component is mounted before rendering client-side specific content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogoClick = () => {
    router.push('/dashboard');
  };

  // If not mounted, return null or a placeholder
  if (!isMounted) {
    return (
      <header className="w-full py-4">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className={`text-2xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            <span
              onClick={handleLogoClick}
              className="text-blue-600 cursor-pointer"
            >
              Vendor&apos;s
            </span>
            {' '}
            <span
              onClick={handleLogoClick}
              className="text-blue-600 cursor-pointer"
            >
              Hub
            </span>
          </h1>
        </div>
      </header>
    );
  }

  return (
      <header className={`border-b  ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"} py-4`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className={`text-2xl md:text-5xl font-bold mb-6  ${darkMode ? "text-white" : "text-gray-900"}`}>
          <span
            onClick={handleLogoClick}
            className="text-blue-600 cursor-pointer"
          >
            Vendor&apos;s
          </span>
          {' '}
          <span
            onClick={handleLogoClick}
            className="text-blue-600 cursor-pointer"
          >
            Hub
          </span>
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}
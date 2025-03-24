import { Sun, Moon } from "lucide-react";
import AuthButtons from "@/components/auth-buttons";
import { useDarkMode } from "@/components/darkModeContext";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className={`border-b ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} w-full py-4`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand - Updated with same styling as hero heading */}
        <h1 className={`text-2xl md:text-5xl font-bold mb-6  ${darkMode ? "text-white" : "text-gray-900"}`}>
        <span className="text-blue-600">Vendor's</span> Hub
        </h1>

        {/* Navigation & Theme Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>

          {/* <AuthButtons /> */}
        </div>
      </div>
    </header>
  );
}
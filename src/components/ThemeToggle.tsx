// src/components/ThemeToggle.tsx
import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { Moon, Sun } from "lucide-react"; // Import icons from lucide-react

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center cursor-pointer"
    >
      {/* Dark Mode Icon (Moon) */}
      <Sun
        className={`transition-all duration-300 ease-in-out ${
          theme === "light" ? "text-yellow-500" : "text-gray-500"
        }`}
      />
      
      {/* Toggle Switch */}
      <div className="relative w-12 h-6 mx-3 rounded-full bg-gray-400">
        <div
          className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out transform ${
            theme === "light" ? "translate-x-0" : "translate-x-6"
          }`}
        />
      </div>
      
      {/* Light Mode Icon (Sun) */}
      <Moon
        className={`transition-all duration-300 ease-in-out ${
          theme === "dark" ? "text-yellow-500" : "text-gray-500"
        }`}
      />
    </div>
  );
};

export default ThemeToggle;

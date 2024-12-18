import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


interface SearchBarProps {
  placeholder: string;
  onSubmit: (data: { searchQuery: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleReset = () => {
    setSearchQuery("");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!searchQuery.trim()) {
      setError("Asset name is required.");
      return;
    }

    setLoading(true);

    // Simulate submission and handle navigation or custom action
    try {
      onSubmit({ searchQuery });
    } catch (err) {
      console.error("Error during search submission", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-3 dark:bg-gray-900 justify-between flex-row border-2 rounded-full p-3 ${
        error ? "border-blue-600" : "border-gray-300"
      }`}
    >
      <Search
        strokeWidth={2.5}
        size={30}
        className="ml-1 text-blue-600 hidden md:block"
      />

      <div className="flex-1">
        <Input
          value={searchQuery}
          onChange={handleInputChange}
          aria-invalid={!!error}
          className="border-none shadow-none text-xl focus-visible:ring-0"
          placeholder={placeholder}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      <Button
        onClick={handleReset}
        type="button"
        variant="outline"
        className="rounded-full"
      >
        Reset
      </Button>

      <Button
        type="submit"
        className="rounded-full bg-blue-600"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};

export default SearchBar;

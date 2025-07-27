import React from "react";
import { Search } from "lucide-react";

const SearchButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-lg"
    >
      <Search className="w-5 h-5" />
      <span>{loading ? "Searching flights..." : "Search"}</span>
    </button>
  );
};

export default SearchButton;

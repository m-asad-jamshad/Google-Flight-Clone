import React from "react";

const LoadingState = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600">Searching for the best flights...</p>
      <p className="text-sm text-gray-500 mt-2">Using Sky Scrapper API...</p>
    </div>
  );
};

export default LoadingState;

import React from "react";
import { AlertCircle } from "lucide-react";

const StatusBanner = ({ isApiKeyConfigured }) => {
  if (!isApiKeyConfigured) {
    return (
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div>
            <p className="text-yellow-800 font-medium">RapidAPI Key Required</p>
            <p className="text-yellow-700 text-sm mt-1">
              To use live flight search, please:
              <br />
              1. Add VITE_RAPIDAPI_KEY=your_key_here to .env file
              <br />
              2. Restart the development server
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-green-500 mt-0.5" />
        <div>
          <p className="text-center text-green-800 font-medium">
            RapidAPI is connected
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusBanner;

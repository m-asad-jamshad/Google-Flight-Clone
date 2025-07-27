import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start space-x-2">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-red-700 text-sm">{error}</p>
          {error.includes("CAPTCHA") && (
            <div className="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded">
              <p>
                <strong>CAPTCHA Detected:</strong> The API is preventing
                automated requests.
              </p>
              <p className="mt-1">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc ml-4 mt-1">
                <li>Wait 10-15 minutes before trying again</li>
                <li>Try searching for different routes</li>
                <li>Consider using a paid API plan for higher limits</li>
                <li>Contact RapidAPI support if this persists</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

import React from "react";
import { Plane } from "lucide-react";

const NoResults = ({ isApiKeyConfigured }) => {
  return (
    <div className="text-center py-16">
      <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        Ready to search flights
      </h3>
      <p className="text-gray-600">
        Enter your travel details above to find the best flights
      </p>
      <div className="mt-4 text-sm text-gray-500">
        <p>💡 Try searching for popular routes like:</p>
        <p>New York → Los Angeles • London → Paris • Tokyo → Seoul</p>
      </div>
    </div>
  );
};

export default NoResults;

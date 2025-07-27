import React from "react";
import FlightCard from "./FlightCard";

const FlightResults = ({
  flights,
  searchForm,
  sortBy,
  onSortChange,
  onSearchAgain,
}) => {
  return (
    <div>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {flights.length} flight{flights.length !== 1 ? "s" : ""} found
          </h2>
          <p className="text-gray-600 mt-1">
            {searchForm.from.split(" (")[0]} → {searchForm.to.split(" (")[0]} •{" "}
            {searchForm.departure}
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="best">Best</option>
            <option value="price">Cheapest</option>
            <option value="duration">Fastest</option>
            <option value="departure">Earliest departure</option>
          </select>
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button
          onClick={onSearchAgain}
          className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Search again
        </button>
      </div>
    </div>
  );
};

export default FlightResults;

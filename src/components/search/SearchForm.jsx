import React from "react";
import { ArrowRightLeft, Calendar } from "lucide-react";
import TripTypeSelector from "./TripTypeSelector";
import AirportInput from "./AirportInput";
import SearchButton from "./SearchButton";

const SearchForm = ({
  searchForm,
  onInputChange,
  onSwapLocations,
  onSearchFlights,
  airports,
  airportLoading,
  showSuggestions,
  onSelectAirport,
  onFocusAirport,
  onBlurAirport,
  loading,
  isApiKeyConfigured,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Trip Type Selector */}
      <TripTypeSelector
        tripType={searchForm.tripType}
        onTripTypeChange={(value) => onInputChange("tripType", value)}
      />

      {/* Search Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* From */}
        <AirportInput
          label="From"
          placeholder="Where from?"
          value={searchForm.from}
          onChange={(e) => onInputChange("from", e.target.value)}
          onFocus={() => onFocusAirport("from")}
          onBlur={() => onBlurAirport("from")}
          suggestions={airports.from}
          showSuggestions={showSuggestions.from}
          onSelectAirport={(airport) => onSelectAirport("from", airport)}
          loading={airportLoading.from}
        />

        {/* Swap Button */}
        <div className="flex items-end pb-3 justify-center">
          <button
            onClick={onSwapLocations}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors border border-gray-300"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* To */}
        <AirportInput
          label="To"
          placeholder="Where to?"
          value={searchForm.to}
          onChange={(e) => onInputChange("to", e.target.value)}
          onFocus={() => onFocusAirport("to")}
          onBlur={() => onBlurAirport("to")}
          suggestions={airports.to}
          showSuggestions={showSuggestions.to}
          onSelectAirport={(airport) => onSelectAirport("to", airport)}
          loading={airportLoading.to}
        />

        {/* Departure */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departure
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={searchForm.departure}
              onChange={(e) => onInputChange("departure", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Return or Passengers */}
        {searchForm.tripType === "roundtrip" ? (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Return
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={searchForm.return}
                onChange={(e) => onInputChange("return", e.target.value)}
                min={
                  searchForm.departure || new Date().toISOString().split("T")[0]
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passengers
            </label>
            <select
              value={searchForm.passengers}
              onChange={(e) =>
                onInputChange("passengers", parseInt(e.target.value))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} passenger{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Passengers for Round Trip */}
      {searchForm.tripType === "roundtrip" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passengers
            </label>
            <select
              value={searchForm.passengers}
              onChange={(e) =>
                onInputChange("passengers", parseInt(e.target.value))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} passenger{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Search Button */}
      <SearchButton
        onClick={onSearchFlights}
        loading={loading}
        disabled={!isApiKeyConfigured}
      />
    </div>
  );
};

export default SearchForm;

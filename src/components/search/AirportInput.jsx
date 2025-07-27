import React from "react";
import { MapPin } from "lucide-react";

const AirportInput = ({
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  suggestions = [],
  showSuggestions,
  onSelectAirport,
  loading = false,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
        {/* Airport Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((airport, index) => (
              <div
                key={index}
                onClick={() => onSelectAirport(airport)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-gray-900">
                  {airport.presentation?.suggestionTitle || airport.name}
                </div>
                <div className="text-sm text-gray-600">
                  {airport.presentation?.subtitle || airport.type}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportInput;

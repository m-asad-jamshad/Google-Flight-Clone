import React from "react";
import { Plane, Clock, Wifi, Utensils } from "lucide-react";

const FlightCard = ({ flight }) => {
  const getStopsText = (stops) => {
    if (stops === 0) return "Nonstop";
    return `${stops} stop${stops > 1 ? "s" : ""}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        {/* Flight Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="w-8 h-8">
              {flight.logo ? (
                <img
                  src={flight.logo}
                  alt={flight.airline}
                  className="w-8 h-8 rounded object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-sm font-medium text-blue-700"
                style={{ display: flight.logo ? "none" : "flex" }}
              >
                {flight.airline.charAt(0)}
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">{flight.airline}</p>
              <p className="text-sm text-gray-600">
                {typeof flight.flightNumber === "string"
                  ? flight.flightNumber
                  : "Flight"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 mt-4 lg:mt-0">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900">
                {typeof flight.departure?.time === "string"
                  ? flight.departure.time
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                {typeof flight.departure?.airport === "string"
                  ? flight.departure.airport
                  : "N/A"}
              </p>
            </div>

            <div className="flex-1 relative px-4">
              <div className="border-t border-gray-300 relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-2">
                  <Plane className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="text-sm text-gray-600">
                  {typeof flight.duration === "string"
                    ? flight.duration
                    : "N/A"}
                </p>
                <p className="text-xs text-gray-500">
                  {getStopsText(flight.stops)}
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900">
                {typeof flight.arrival?.time === "string"
                  ? flight.arrival.time
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                {typeof flight.arrival?.airport === "string"
                  ? flight.arrival.airport
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Additional Flight Details */}
          <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Wifi className="w-4 h-4" />
              <span>Wi-Fi</span>
            </div>
            <div className="flex items-center space-x-1">
              <Utensils className="w-4 h-4" />
              <span>Meals</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>On-time</span>
            </div>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex flex-col items-end space-y-3 mt-6 lg:mt-0 lg:ml-6">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {typeof flight.formattedPrice === "string"
                ? flight.formattedPrice
                : "$0"}
            </p>
            <p className="text-sm text-gray-600">per person</p>
          </div>
          <a
            href={flight.deepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block text-center min-w-24"
          >
            Select
          </a>
          <p className="text-xs text-gray-500">Free cancellation</p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;

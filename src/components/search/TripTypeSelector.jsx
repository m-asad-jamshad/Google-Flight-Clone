import React from "react";

const TripTypeSelector = ({ tripType, onTripTypeChange }) => {
  return (
    <div className="flex space-x-6 mb-6">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="tripType"
          value="roundtrip"
          checked={tripType === "roundtrip"}
          onChange={(e) => onTripTypeChange(e.target.value)}
          className="mr-2 text-blue-600"
        />
        <span className="text-sm font-medium">Round trip</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="tripType"
          value="oneway"
          checked={tripType === "oneway"}
          onChange={(e) => onTripTypeChange(e.target.value)}
          className="mr-2 text-blue-600"
        />
        <span className="text-sm font-medium">One way</span>
      </label>
    </div>
  );
};

export default TripTypeSelector;

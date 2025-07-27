import React, { useState, useEffect } from "react";

// Layout components
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// Search components
import SearchForm from "./search/SearchForm";

// Results components
import FlightResults from "./results/FlightResults";
import LoadingState from "./results/LoadingState";
import NoResults from "./results/NoResults";

// Shared components
import StatusBanner from "./shared/StatusBanner";
import ErrorMessage from "./shared/ErrorMessage";

// Custom hooks
import useAirportSearch from "./hooks/useAirportSearch";
import useFlightSearch from "./hooks/useFlightSearch";

const GoogleFlights = () => {
  // Form state
  const [searchForm, setSearchForm] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: 1,
    tripType: "roundtrip",
    fromSkyId: "",
    toSkyId: "",
    fromEntityId: "",
    toEntityId: "",
  });

  // UI state
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState("best");

  // API configuration
  const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
  const API_HOST = "sky-scrapper.p.rapidapi.com";
  const isApiKeyConfigured = API_KEY && API_KEY !== "YOUR_RAPIDAPI_KEY_HERE";

  // Debug logging
  console.log("GoogleFlights render:", {
    API_KEY: !!API_KEY,
    isApiKeyConfigured,
    searchForm,
  });

  // Custom hooks
  const {
    airports,
    airportLoading,
    searchPlaces,
    updateAirports,
    clearAirportLoading,
  } = useAirportSearch(API_KEY, API_HOST, isApiKeyConfigured);

  const { flights, loading, error, searchFlights, setError } = useFlightSearch(
    API_KEY,
    API_HOST,
    isApiKeyConfigured
  );

  // Debounced airport search
  useEffect(() => {
    console.log("From useEffect triggered:", searchForm.from);

    if (!searchForm.from.includes("(") && searchForm.from.length >= 2) {
      const timer = setTimeout(async () => {
        console.log("Searching for airports:", searchForm.from);
        const results = await searchPlaces(searchForm.from, "from");
        console.log("Airport search results:", results);
        updateAirports("from", results);
        setShowFromSuggestions(results.length > 0);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShowFromSuggestions(false);
      clearAirportLoading("from");
    }
  }, [searchForm.from, searchPlaces, updateAirports, clearAirportLoading]);

  useEffect(() => {
    console.log("To useEffect triggered:", searchForm.to);

    if (!searchForm.to.includes("(") && searchForm.to.length >= 2) {
      const timer = setTimeout(async () => {
        console.log("Searching for airports:", searchForm.to);
        const results = await searchPlaces(searchForm.to, "to");
        console.log("Airport search results:", results);
        updateAirports("to", results);
        setShowToSuggestions(results.length > 0);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShowToSuggestions(false);
      clearAirportLoading("to");
    }
  }, [searchForm.to, searchPlaces, updateAirports, clearAirportLoading]);

  // Event handlers
  const handleInputChange = (field, value) => {
    console.log("Input change:", field, value);
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectAirport = (field, airport) => {
    console.log("Selecting airport:", field, airport);

    const displayName =
      airport.presentation?.suggestionTitle ||
      `${airport.name} (${airport.iata})`;
    const skyId =
      airport.navigation?.relevantFlightParams?.skyId || airport.skyId;
    const entityId =
      airport.navigation?.relevantFlightParams?.entityId || airport.entityId;

    console.log("Selected airport data:", { displayName, skyId, entityId });

    setSearchForm((prev) => ({
      ...prev,
      [field]: displayName,
      [`${field}SkyId`]: skyId,
      [`${field}EntityId`]: entityId,
    }));

    setShowFromSuggestions(false);
    setShowToSuggestions(false);
  };

  const swapLocations = () => {
    console.log("Swapping locations");
    setSearchForm((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
      fromSkyId: prev.toSkyId,
      toSkyId: prev.fromSkyId,
      fromEntityId: prev.toEntityId,
      toEntityId: prev.fromEntityId,
    }));
  };

  const handleSearchFlights = () => {
    console.log("Searching flights with form:", searchForm);
    searchFlights(searchForm, sortBy);
  };

  const handleFocusAirport = (field) => {
    console.log("Focus airport:", field);
    if (field === "from" && searchForm.from.length >= 2) {
      setShowFromSuggestions(true);
    } else if (field === "to" && searchForm.to.length >= 2) {
      setShowToSuggestions(true);
    }
  };

  const handleBlurAirport = (field) => {
    console.log("Blur airport:", field);
    setTimeout(() => {
      if (field === "from") {
        setShowFromSuggestions(false);
      } else if (field === "to") {
        setShowToSuggestions(false);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* API Status Banner */}
        <StatusBanner isApiKeyConfigured={isApiKeyConfigured} />

        {/* Search Form */}
        <SearchForm
          searchForm={searchForm}
          onInputChange={handleInputChange}
          onSwapLocations={swapLocations}
          onSearchFlights={handleSearchFlights}
          airports={airports}
          airportLoading={airportLoading}
          showSuggestions={{
            from: showFromSuggestions,
            to: showToSuggestions,
          }}
          onSelectAirport={selectAirport}
          onFocusAirport={handleFocusAirport}
          onBlurAirport={handleBlurAirport}
          loading={loading}
          isApiKeyConfigured={isApiKeyConfigured}
        />

        {/* Error Message */}
        <ErrorMessage error={error} />

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Flight Results */}
        {flights.length > 0 && !loading && (
          <FlightResults
            flights={flights}
            searchForm={searchForm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSearchAgain={handleSearchFlights}
          />
        )}

        {/* No Results State */}
        {!loading && flights.length === 0 && !error && (
          <NoResults isApiKeyConfigured={isApiKeyConfigured} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GoogleFlights;

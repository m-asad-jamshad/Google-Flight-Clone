import { useState, useCallback } from "react";

const useAirportSearch = (apiKey, apiHost, isApiKeyConfigured) => {
  const [airports, setAirports] = useState({ from: [], to: [] });
  const [airportLoading, setAirportLoading] = useState({
    from: false,
    to: false,
  });

  const searchPlaces = useCallback(
    async (query, field) => {
      if (!query || query.length < 2 || !isApiKeyConfigured) {
        console.log("Skipping airport search:", {
          query: query?.length,
          isApiKeyConfigured,
        });
        return [];
      }

      console.log("Starting airport search for:", query, "field:", field);

      // Set loading state for the specific field
      setAirportLoading((prev) => ({ ...prev, [field]: true }));

      try {
        const url = `https://${apiHost}/api/v1/flights/searchAirport?query=${encodeURIComponent(
          query
        )}&locale=en-US`;

        console.log("Airport search URL:", url);
        console.log("API Key configured:", !!apiKey);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": apiHost,
          },
        });

        console.log(`Airport search response status: ${response.status}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Airport search error:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Airport search response:", data);

        if (data.status && data.data && Array.isArray(data.data)) {
          return data.data.slice(0, 8);
        }

        return [];
      } catch (error) {
        console.error("Error searching airports:", error);
        return [];
      } finally {
        // Clear loading state for the specific field
        setAirportLoading((prev) => ({ ...prev, [field]: false }));
      }
    },
    [apiKey, apiHost, isApiKeyConfigured]
  );

  const updateAirports = useCallback((field, results) => {
    console.log("Updating airports for field:", field, "results:", results);
    setAirports((prev) => ({ ...prev, [field]: results }));
  }, []);

  const clearAirportLoading = useCallback((field) => {
    setAirportLoading((prev) => ({ ...prev, [field]: false }));
  }, []);

  return {
    airports,
    airportLoading,
    searchPlaces,
    updateAirports,
    clearAirportLoading,
  };
};

export default useAirportSearch;

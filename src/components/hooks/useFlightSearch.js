import { useState } from "react";

const useFlightSearch = (apiKey, apiHost, isApiKeyConfigured) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const transformFlightData = (apiFlights) => {
    if (!Array.isArray(apiFlights)) return [];

    return apiFlights
      .map((itinerary, index) => {
        try {
          const leg = itinerary.legs?.[0];
          if (!leg) return null;

          const segments = leg.segments || [];
          const firstSegment = segments[0];

          // Safely extract price information
          let formattedPrice = "$0";
          let rawPrice = 0;

          if (itinerary.price) {
            if (typeof itinerary.price === "string") {
              formattedPrice = itinerary.price;
              rawPrice = parseInt(itinerary.price.replace(/[^0-9]/g, "")) || 0;
            } else if (typeof itinerary.price === "object") {
              formattedPrice =
                itinerary.price.formatted || `$${itinerary.price.raw || 0}`;
              rawPrice = itinerary.price.raw || 0;
            } else if (typeof itinerary.price === "number") {
              rawPrice = itinerary.price;
              formattedPrice = `$${itinerary.price}`;
            }
          }

          let flightNumber = "N/A";
          if (segments.length > 0) {
            const validFlightNumbers = segments
              .map((s) => s.flightNumber)
              .filter((fn) => fn && typeof fn === "string");
            flightNumber = validFlightNumbers.join(", ") || "N/A";
          }

          // Safely extract times
          let departureTime = "N/A";
          let arrivalTime = "N/A";

          try {
            if (leg.departure) {
              departureTime = new Date(leg.departure).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              );
            }
            if (leg.arrival) {
              arrivalTime = new Date(leg.arrival).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });
            }
          } catch (timeError) {
            console.warn("Error parsing flight times:", timeError);
          }

          return {
            id: itinerary.id || `flight-${index}`,
            airline: firstSegment?.marketingCarrier?.name || "Unknown Airline",
            logo: firstSegment?.marketingCarrier?.logoUrl || null,
            flightNumber: flightNumber,
            departure: {
              time: departureTime,
              airport: leg.originPlace?.displayCode || "N/A",
              city: leg.originPlace?.name || "N/A",
            },
            arrival: {
              time: arrivalTime,
              airport: leg.destinationPlace?.displayCode || "N/A",
              city: leg.destinationPlace?.name || "N/A",
            },
            duration: leg.durationInMinutes
              ? `${Math.floor(leg.durationInMinutes / 60)}h ${
                  leg.durationInMinutes % 60
                }m`
              : "N/A",
            stops: leg.stopCount || 0,
            price: rawPrice,
            formattedPrice: formattedPrice,
            deepLink: itinerary.agents?.[0]?.url || "#",
            segments: segments,
          };
        } catch (transformError) {
          console.error(
            "Error transforming flight data:",
            transformError,
            itinerary
          );
          return null;
        }
      })
      .filter(Boolean);
  };

  const searchFlights = async (searchForm, sortBy) => {
    if (!isApiKeyConfigured) {
      setError("Please configure your RapidAPI key in the .env file");
      return;
    }

    if (!searchForm.fromSkyId || !searchForm.toSkyId || !searchForm.departure) {
      setError("Please select valid airports and departure date");
      return;
    }

    setLoading(true);
    setError(null);
    setFlights([]);

    try {
      const params = new URLSearchParams({
        originSkyId: searchForm.fromSkyId,
        destinationSkyId: searchForm.toSkyId,
        originEntityId: searchForm.fromEntityId || searchForm.fromSkyId,
        destinationEntityId: searchForm.toEntityId || searchForm.toSkyId,
        date: searchForm.departure,
        cabinClass: "economy",
        adults: searchForm.passengers.toString(),
        sortBy: sortBy,
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      });

      if (searchForm.tripType === "roundtrip" && searchForm.return) {
        params.append("returnDate", searchForm.return);
      }

      const url = `https://${apiHost}/api/v1/flights/searchFlights?${params.toString()}`;

      console.log("Flight search URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
      });

      console.log(`Flight search response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Flight search response:", data);

      if (data.status === false && data.message?.action === "captcha") {
        setError(
          "API is requesting CAPTCHA verification. This usually happens when there are too many requests. Please try again in a few minutes or contact support."
        );
        return;
      }

      if (data.status === false) {
        setError(
          data.message?.page ||
            data.message ||
            "Flight search is temporarily unavailable. Please try again later."
        );
        return;
      }

      if (data.status && data.data?.itineraries) {
        const transformedFlights = transformFlightData(data.data.itineraries);
        setFlights(transformedFlights);

        if (transformedFlights.length === 0) {
          setError(
            "No flights found for your search criteria. Try different dates or destinations."
          );
        }
      } else {
        setError(
          "No flights found for your search criteria. Please try different dates or airports."
        );
      }
    } catch (error) {
      console.error("Flight search error:", error);
      setError(`Search failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    flights,
    loading,
    error,
    searchFlights,
    setError,
  };
};

export default useFlightSearch;

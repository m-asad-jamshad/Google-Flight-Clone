import { useState } from "react";

const useDemoData = () => {
  const [demoMode, setDemoMode] = useState(false);

  const mockAirports = [
    {
      presentation: {
        suggestionTitle: "New York (JFK)",
        subtitle: "John F. Kennedy International Airport",
      },
      navigation: {
        relevantFlightParams: {
          skyId: "JFK",
          entityId: "27537542",
        },
      },
    },
    {
      presentation: {
        suggestionTitle: "Los Angeles (LAX)",
        subtitle: "Los Angeles International Airport",
      },
      navigation: {
        relevantFlightParams: {
          skyId: "LAX",
          entityId: "27539793",
        },
      },
    },
    {
      presentation: {
        suggestionTitle: "London (LHR)",
        subtitle: "Heathrow Airport",
      },
      navigation: {
        relevantFlightParams: {
          skyId: "LHR",
          entityId: "27544008",
        },
      },
    },
    {
      presentation: {
        suggestionTitle: "Paris (CDG)",
        subtitle: "Charles de Gaulle Airport",
      },
      navigation: {
        relevantFlightParams: {
          skyId: "CDG",
          entityId: "27539733",
        },
      },
    },
    {
      presentation: {
        suggestionTitle: "Tokyo (NRT)",
        subtitle: "Narita International Airport",
      },
      navigation: {
        relevantFlightParams: {
          skyId: "NRT",
          entityId: "27547204",
        },
      },
    },
  ];

  const mockFlights = [
    {
      id: "1",
      airline: "American Airlines",
      logo: "https://logos.skyscnr.com/images/airlines/favicon/AA.png",
      flightNumber: "AA 123",
      departure: {
        time: "8:00 AM",
        airport: "JFK",
        city: "New York",
      },
      arrival: {
        time: "11:30 AM",
        airport: "LAX",
        city: "Los Angeles",
      },
      duration: "5h 30m",
      stops: 0,
      price: 299,
      formattedPrice: "$299",
      deepLink: "https://www.aa.com",
      segments: [],
    },
    {
      id: "2",
      airline: "Delta Air Lines",
      logo: "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
      flightNumber: "DL 456",
      departure: {
        time: "2:15 PM",
        airport: "JFK",
        city: "New York",
      },
      arrival: {
        time: "8:45 PM",
        airport: "LAX",
        city: "Los Angeles",
      },
      duration: "6h 30m",
      stops: 1,
      price: 249,
      formattedPrice: "$249",
      deepLink: "https://www.delta.com",
      segments: [],
    },
    {
      id: "3",
      airline: "United Airlines",
      logo: "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
      flightNumber: "UA 789",
      departure: {
        time: "6:30 PM",
        airport: "JFK",
        city: "New York",
      },
      arrival: {
        time: "10:00 PM",
        airport: "LAX",
        city: "Los Angeles",
      },
      duration: "5h 30m",
      stops: 0,
      price: 349,
      formattedPrice: "$349",
      deepLink: "https://www.united.com",
      segments: [],
    },
  ];

  const getDemoAirports = (query) => {
    if (!query || query.length < 2) return [];

    return mockAirports.filter((airport) =>
      airport.presentation.suggestionTitle
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  };

  const getDemoFlights = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFlights);
      }, 1500); // Simulate API delay
    });
  };

  return {
    demoMode,
    setDemoMode,
    getDemoAirports,
    getDemoFlights,
  };
};

export default useDemoData;

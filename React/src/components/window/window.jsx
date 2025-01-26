import React, { useState, useEffect } from "react";
import "./window.scss";

const Window = () => {
  const [cities, setCities] = useState("Tashkent"); // Initial city is Tashkent
  const [weatherData, setWeatherData] = useState(null); // Store weather data
  const [loading, setLoading] = useState(false); // Loading state for API request
  const [error, setError] = useState(""); // Error state for catching API errors

  const [icon, setIcon] = useState("sun.png");

  const apiKey = "08062ed01eab1520af9a2745c7486fe3"; // Your OpenWeatherMap API key

  const formatLocalTime = (timestamp, timezoneOffset) => {
    const localTime = new Date((timestamp + timezoneOffset) * 1000); // convert to milliseconds
    // Format the time to exclude seconds
    return localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Optional: Use 12-hour format
    });
  };

  // Function to get weather data from OpenWeatherMap API
  const getWeatherData = (city) => {
    setLoading(true); // Start loading
    setError(""); // Reset previous errors

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError("City not found");
          setLoading(false);
        } else {
          setWeatherData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData(cities);
  };

  const handleInputChange = (e) => {
    setCities(e.target.value);
    if (error) {
      setError("");
    }
  };

  // UseEffect to fetch data initially when the component mounts
  useEffect(() => {
    getWeatherData(cities);
    console.log(weatherData);
  }, []); // Empty dependency array means it runs only on mount
  useEffect(() => {
    if (weatherData) {
      const descriptions = weatherData.weather[0].description;
      if (descriptions.includes("cloud")) {
        setIcon("cloud.png");
      } else if (descriptions.includes("rain")) {
        setIcon("rain.png");
      } else {
        setIcon("sun.png");
      }
    }
  }, [weatherData]); // Add weatherData as a dependency

  // Show loading spinner or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no weather data exists yet, return a message
  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  const celcius = weatherData.main.temp - 273.15;
  const fixedCelcius = celcius.toFixed(2);
  const localTime = formatLocalTime(weatherData.dt, weatherData.timezone);
  return (
    <div className="window">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cities}
          onChange={handleInputChange} // Reset error when typing
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <>
          <h1>{weatherData.name}</h1>
          <p>{weatherData.weather[0].description}</p>
          <img
            className={`emoji ${icon === "sun.png" ? "spin" : ""}`}
            src={icon}
            alt="Dynamic Weather Icon"
          />
          <p>Temperature: {fixedCelcius}°C</p>
          <p>Local Time: {localTime}</p>
        </>
      )}
    </div>
  );
};

export default Window;

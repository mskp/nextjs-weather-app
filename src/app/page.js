"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("Delhi");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({
    city: "",
    temp: "",
    humidity: "",
  });

  useEffect(() => {
    if (search) {
      fetchWeather();
    }
    else {
      setWeatherInfo({
        city: "",
        temp: "",
        humidity: "",
      });
    }
  }, [search]);



  const handleOnChange = (event) => {
    setSearch(event.target.value);
    setWeatherInfo({
      city: "",
      temp: "",
      humidity: "",
    });
  };

  const fetchWeather = async () => {
    if (!search) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?city=${search}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_HOST,
          },
        }
      );

      if (!response.ok) {
        // Handle HTTP errors gracefully
        throw new Error("Network response was not OK");
      }
  
      const data = await response.json();
      const tempInCelsius = data?.temp;
      const isValidTemp = !isNaN(tempInCelsius) && tempInCelsius !== null;
  
      setWeatherInfo({
        city: search,
        temp: isValidTemp ? `${tempInCelsius}°C` : "", // Set to an empty string if temperature is not valid
        humidity: data?.humidity,
      });
    } catch (error) {
      setWeatherInfo({
        city: "",
        temp: "",
        humidity: "",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="w-full max-w-sm p-4 bg-gray-700 rounded-lg shadow">
        <div className="text-center">
          <h5 className="text-2xl font-bold text-red-600">
            Weather<span className="text-purple-600">Up</span>
          </h5>
        </div>
        <div className="mt-4">
          <input
            onChange={handleOnChange}
            type="search"
            value={search}
            className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search for city"
            aria-label="Search"
          />
        </div>

        <ul className="mt-4 space-y-2 text-white">
          <li>
            <span className="font-bold">Temperature: </span>
            {(isLoading && !weatherInfo.temp) ? "Loading..." : weatherInfo.temp}
          </li>
          <li>
            <span className="font-bold">Humidity: </span>
            {(isLoading && !weatherInfo.humidity) ? "Loading..." : weatherInfo.humidity}
          </li>
        </ul>

      </div>

    </main>
  );
}

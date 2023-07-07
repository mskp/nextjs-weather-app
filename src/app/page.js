"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("Delhi");
  useEffect(() => {
    fetchWeather();
  }, []);

  const [weatherInfo, setWeatherInfo] = useState({
    city: "",
    temp: "",
    humidity: "",
  });

  const handleOnChange = (event) => {
    setSearch(event.target.value);
    setWeatherInfo({
      city: "",
      temp: "",
      humidity: "",
    });
  };

  const fetchWeather = async () => {
    try {
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
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      setWeatherInfo({
        city: search,
        temp: data?.temp,
        humidity: data?.humidity,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow">
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
        <button
          className="mt-2 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={fetchWeather}
        >
          <span>🔍</span>
        </button>
        <ul className="mt-4 space-y-2">
          <li className="text-gray-600">
            <span className="font-bold">City:</span> {search}
          </li>
          <li className="text-gray-600">
            <span className="font-bold">Temperature:</span>
            {weatherInfo.temp ? weatherInfo.temp + "°C" : ""}
          </li>
          <li className="text-gray-600">
            <span className="font-bold">Humidity:</span> {weatherInfo.humidity}
          </li>
        </ul>
      </div>
    </main>
  );
}

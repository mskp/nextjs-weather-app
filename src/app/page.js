"use client"

import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("Vrindavan");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({
    city: "",
  });

  useEffect(() => {
    if (search) {
      fetchWeather();
    }
  }, []);

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
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setWeatherInfo({
        city: search,
        ...data,
      });
    } catch (error) {
      console.error(error);
      setWeatherInfo({
        city: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatKey = (key) => {
    return key.replace(/_/g, " ").replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="w-full max-w-sm p-4 bg-gray-700 rounded-lg shadow">
        <div className="text-center">
          <h5 className="text-2xl font-bold text-red-600">
            Weather<span className="text-purple-600">Up</span>
          </h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="search"
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search for city"
              aria-label="Search"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span>🔍</span>
          </button>
        </form>

        <ul className="mt-4 space-y-2 text-white">
          {isLoading ? (
            <li>Loading...</li>
          ) : (
            Object.entries(weatherInfo).map(([key, value]) => (
              <li key={key}>
                <span className="font-bold">{formatKey(key)}: </span>
                {typeof value === "number" ? value + (key.includes("temp") ? "°C" : "") : value}
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}

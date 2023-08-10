"use client"

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({});
  const keys = ["Cloud Percentage", "Temperature in celsius", "Feels Like", "Humidity", "Min. Temperature", "Max. Temperature", "Wind Speed", "Wind Degrees", "Sunrise", "Sunrise"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(data)
      setWeatherInfo(data);
    } catch (error) {
      console.error(error);
      setWeatherInfo({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-sm p-4 border rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="search"
              className="w-full py-4 px-4 border text-lg bg-black text-white rounded-md shadow-sm outline-none focus:border-red-400"
              placeholder="Search for city"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 w-full py-2 px-4 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 outline-none"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        <ul className="mt-4 space-y-2 text-white flex flex-col">
          {/* {weatherInfo} */}
          {keys.map((key, index) => (
            // <div className="">
            <li key={index} className="text-center flex flex-col">
              <div className="flex-flex-col mb-4">
                <p className="font-bold mb-2">{key}</p>
                <p className="capitalize">{(isLoading || !Object.values(weatherInfo)[index]) ? "_ _ _" : Object.values(weatherInfo)[index]}</p>
              </div>
            </li>
            // </div>
          ))}
        </ul>
      </div>
    </main>
  );
}

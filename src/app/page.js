"use client"

import { useState } from "react";
import moment from "moment-timezone";

function formatTime(timestamp) {
  const istDatetime = moment.unix(timestamp).tz('Asia/Kolkata');
  const formattedDatetime = istDatetime.format('HH:mm A');
  return formattedDatetime;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({}); 0
  const keys = [
    "Cloud Percentage",
    "Temperature (°C)",
    "Feels Like", "Humidity",
    "Min. Temperature",
    "Max. Temperature",
    "Wind Speed",
    "Wind Degrees",
    "Sunrise",
    "Sunset"
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

      if (!response.ok) throw new Error("Some error occured while fetching data");

      const data = await response.json();
      console.log(data) // To remove
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
      <div className="w-full max-w-sm p-4 lg:border rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="search"
              className="w-full py-4 px-4 border text-lg bg-black text-white rounded-md shadow-sm outline-none focus:border-indigo-400"
              placeholder="Search for city"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 w-full py-2 px-4 bg-neutral-700 text-white rounded-lg hover:opacity-80 outline-none"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        <ul className="mt-4 space-y-2 text-white flex flex-col">
          {keys.map((key, index) => (
            <li key={index} className="text-center flex flex-col">
              <div className="flex-flex-col mb-4">
                <p className="font-bold mb-2">{key}</p>
                <p className="capitalize">
                  {(isLoading || (Object.values(weatherInfo)[index]) === undefined) ?
                    "_ _ _" :
                    ((key === "Sunrise" || key === "Sunset")) ? formatTime(Object.values(weatherInfo)[index]) : Object.values(weatherInfo)[index]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

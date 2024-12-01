"use client";
import React, { useEffect, useState } from "react";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=6a6d4ebc86c86ed1b4dd7bccceab6470`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }

                const data = await response.json();
                console.log("Weather data:", data);
                setWeather(data);
            } catch (err) {
                console.error("Weather fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return <div>Loading weather data...</div>;
    }

    if (error) {
        return <div>Error fetching weather: {error}</div>;
    }

    if (!weather || !weather.main) {
        return <div>Error: Weather data is unavailable</div>;
    }

    return (
        <div>
            <h2>Current Weather</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
        </div>
    );
};

export default Weather;

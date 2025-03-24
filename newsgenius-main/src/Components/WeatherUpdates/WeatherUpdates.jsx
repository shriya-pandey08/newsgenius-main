import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherUpdates.css'; // Import the CSS for styling

const WeatherUpdates = () => {
  const [city, setCity] = useState('Bareilly');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  const API_KEY = '1c750b33b29f216197a88ee4167404cf'; // Replace with your OpenWeatherMap API key

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
      fetchAirQualityData(response.data.coord.lat, response.data.coord.lon);
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  const fetchAirQualityData = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      setAirQuality(response.data);
    } catch (err) {
      console.error('Error fetching air quality data', err);
    }
  };

     // Fetch weather data for Bareilly when the component mounts
  useEffect(() => {
    fetchWeatherData(city);
  }, []); // Empty dependency array ensures this runs only once on mount


  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="weather-updates p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Weather Updates</h2>
      <form onSubmit={handleSearch} className="my-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-full p-2 w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white rounded-full p-2 w-full">Search</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h3 className="font-bold">{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
      {airQuality && (
        <div className="air-quality-info mt-4">
          <h3 className="font-bold">Air Quality</h3>
          <p>AQI: {airQuality.list[0].main.aqi}</p>
          <p>CO: {airQuality.list[0].components.co} µg/m³</p>
          <p>NO: {airQuality.list[0].components.no} µg/m³</p>
          <p>NO2: {airQuality.list[0].components.no2} µg/m³</p>
          <p>O3: {airQuality.list[0].components.o3} µg/m³</p>
          <p>SO2: {airQuality.list[0].components.so2} µg/m³</p>
          <p>PM2.5: {airQuality.list[0].components.pm2_5} µg/m³</p>
          <p>PM10: {airQuality.list[0].components.pm10} µg/m³</p>
          <p>NH3: {airQuality.list[0].components.nh3} µg/m³</p>
        </div>
      )}
    </div>
  );
};

export default WeatherUpdates;
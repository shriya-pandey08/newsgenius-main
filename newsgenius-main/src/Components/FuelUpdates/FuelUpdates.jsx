import React, { useState, useEffect } from "react";
import axios from "axios";
import './Fuel.css';

const FuelUpdates = () => {
  const [city, setCity] = useState("Uttar-Pradesh");
  const [fuelData, setFuelData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "61ee0b571969ae9090994cd44a7986f23518fce1693322234"; // Replace with your API key
  const API_URL = `https://www.nixinfo.in/api/dpa-price-today-and-yesterday-state-capitals-v5?state_name=${city}&api_key=${API_KEY}`;


  const fetchFuelData = async (city) => {
    try {
        const response = await axios.get(API_URL);
      setFuelData(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch fuel data");
      setFuelData(null);
    }
  };

  useEffect(() => {
    fetchFuelData(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchFuelData(city);
    }
  };

  return (
    <div className="fuel-updates p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Fuel Updates</h2>
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
      {fuelData && (
        <div className="fuel-info">
          <h3 className="font-bold">{fuelData.city}</h3>
          <p>Petrol: ₹{fuelData.petrol}</p>
          <p>Diesel: ₹{fuelData.diesel}</p>
        </div>
      )}
    </div>
  );
};

export default FuelUpdates;
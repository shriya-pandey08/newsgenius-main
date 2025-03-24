import React, { useState, useEffect } from "react";
import axios from "axios";
import './Currency.css';

const CurrencyConversion = () => {
  const [amount, setAmount] = useState(100); // Default amount set to 100
  const [convertedAmounts, setConvertedAmounts] = useState({ USD: null, EUR: null, GBP: null });
  const [error, setError] = useState(null);

  const fetchConversionRates = async () => {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/INR`);
      const rates = response.data.rates;
      setConvertedAmounts({
        USD: (amount * rates.USD).toFixed(2),
        EUR: (amount * rates.EUR).toFixed(2),
        GBP: (amount * rates.GBP).toFixed(2),
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch conversion rates");
      setConvertedAmounts({ USD: null, EUR: null, GBP: null });
    }
  };

  useEffect(() => {
    fetchConversionRates(); // Fetch rates on component mount
  }, []);

  const handleConvert = (e) => {
    e.preventDefault();
    fetchConversionRates(); // Fetch rates when converting
  };

  return (
    <div className="currency-conversion p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Currency Conversion</h2>
      <form onSubmit={handleConvert} className="my-4">
        <input
          type="number"
          placeholder="Enter amount in Rupees"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded-full p-2 w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white rounded-full p-2 w-full">Convert</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {convertedAmounts.USD && (
        <div className="conversion-info">
          <h3 className="font-bold">Converted Amounts:</h3>
          <p>USD: ${convertedAmounts.USD}</p>
          <p>EUR: €{convertedAmounts.EUR}</p>
          <p>GBP: £{convertedAmounts.GBP}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConversion;

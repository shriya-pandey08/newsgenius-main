import React from "react";
import './Horoscope.css';

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const Horoscope = () => {
  return (
    <div className="horoscope-section p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Daily Horoscope</h2>
      <div className="zodiac-grid">
        {zodiacSigns.map((sign) => (
          <button 
            key={sign} 
            onClick={() => window.open(`https://timesofindia.indiatimes.com/astrology/horoscope/${sign.toLowerCase()}/daily-horoscope-today-january-20-2025-your-charisma-will-draw-people-to-you/articleshow/117376261.cms`, '_blank')} 
            className="zodiac-button"
          >
            {sign}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Horoscope;

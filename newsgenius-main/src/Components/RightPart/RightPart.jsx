import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WeatherUpdates from "../WeatherUpdates/WeatherUpdates";
import FuelUpdates from "../FuelUpdates/FuelUpdates";
import CurrencyConversion from "../Currency/Currency"; // Importing the CurrencyConversion component
import Horoscope from "../Horoscope/Horoscope"; // Importing the Horoscope component
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";

const RightPart = ({ theme, toggleTheme }) => {
  const [openSubscriptionModal, setOpenSubscriptionModal] = React.useState(false);
  
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

  return (
    <div className={`right-part ${theme}`}>
      <div className="relative flex items-center">
        <input
          type="text"
          className="py-3 rounded-full text-gray-500 w-full pl-12"
          placeholder="Search..."
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className={theme === "dark" ? "text-white" : "text-gray-500"} />
        </div>
        <Button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </Button>
      </div>
      <section className="my-5">
        <h1 className="text-xl font-bold">Get Verified</h1>
        <h1 className="font-bold my-2">Subscribe to unlock new features</h1>
        <Button sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }} 
        variant="contained"
        onClick={handleOpenSubscriptionModal}
        >
          Get Verified
        </Button>
      </section>
      <section className="mt-7 space-y-5">
        <h1 className="font-bold text-xl py-1">What's Trending new ..</h1>
        <div>
          <p className="text-sm">Fifa Women World Cup Updates</p>
          <p className="font-bold">Political Updates</p>
        </div>
        {[1, 1, 1].map((item, index) => (
          <div className="flex justify-between w-full" key={index}>
            <div>
              <p>Entertainment.Trending</p>
              <p className="font-bold">#TheMarvels</p>
              <p>34.3k Articles</p>
            </div>
            <MoreHorizIcon />
          </div>
        ))}
      </section>
      <section>
        <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal}/>
      </section>
      <WeatherUpdates />
      <FuelUpdates />
      <CurrencyConversion /> {/* Adding the CurrencyConversion component */}
      <Horoscope /> {/* Adding the Horoscope component */}
    </div>
  );
};

export default RightPart;

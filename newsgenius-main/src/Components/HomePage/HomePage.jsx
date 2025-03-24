import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import ArticleDetails from "../ArticleDetails/ArticleDetails";

const HomePage = ({ theme, toggleTheme }) => {
  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      <Grid item xs={12} lg={6} className="px-5 lg:px-9 hidden lg:block w-full relative">
        <Routes>
          <Route path="/" element={<HomeSection theme={theme} />}></Route>
          <Route path="/profile/:id" element={<Profile theme={theme} />}></Route>
          <Route path="/home" element={<HomeSection theme={theme} />}></Route>
          <Route path="/articledetails/:id" element={<ArticleDetails theme={theme} />}></Route>
        </Routes>
      </Grid>

      <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
        <RightPart theme={theme} toggleTheme={toggleTheme} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
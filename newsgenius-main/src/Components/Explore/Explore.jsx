import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import TopStories from "./TopStories";


const Explore = ({ theme, toggleTheme }) => {
  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      <Grid item xs={12} lg={9} className="px-5 lg:px-9 hidden lg:block w-full relative">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <TopStories />
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Explore Page</h1>
             
            </div>
          </Grid>
        </Grid>
      </Grid>

    </Grid>

  );
};

export default Explore;

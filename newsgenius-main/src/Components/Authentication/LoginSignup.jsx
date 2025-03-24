import React, { useState } from "react";
import { Box, useTheme, Button } from "@mui/material";

import Login from "./Login";
import Signup from "./Signup";

const LoginSignup = () => {
  const theme = useTheme();
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: theme.palette.background.default }}>
      {/* Left Column - Image */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <img 
          src="/logo.jpg" 
          alt="News Genius Logo" 
          className="max-w-full h-auto rounded-lg shadow-2xl"
        />
      </div>

      {/* Right Column - Content */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">
            Don't Just Read the News, Be Part of It!
          </h2>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
            Unlock Exclusive Stories - Sign Up Today!
          </h2>
        </div>

        <Box className="w-full max-w-md p-8 rounded-lg shadow-lg" sx={{ backgroundColor: theme.palette.background.paper }}>
          {showLogin ? (
            <>
              <Login />
              <Box className="mt-4 text-center">
                <Button 
                  color="primary" 
                  onClick={() => setShowLogin(false)}
                  sx={{ textTransform: 'none' }}
                >
                  Don't have an account? Sign Up
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Signup />
              <Box className="mt-4 text-center">
                <Button 
                  color="primary" 
                  onClick={() => setShowLogin(true)}
                  sx={{ textTransform: 'none' }}
                >
                  Already have an account? Login
                </Button>
              </Box>
            </>
          )}
        </Box>
      </div>
    </div>
  );
};

export default LoginSignup;

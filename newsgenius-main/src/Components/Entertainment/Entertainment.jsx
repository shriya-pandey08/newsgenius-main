import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TheatersIcon from '@mui/icons-material/Theaters';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';
import './Entertainment.css';
import { getEntertainmentHeadlines, getBollywoodNews, getHollywoodNews, getTollywoodNews, getUpcomingReleases } from '../../utils/entertainmentAPI';

const Entertainment = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entertainment, setEntertainment] = useState({
    headlines: [],
    bollywood: [],
    hollywood: [],
    tollywood: [],
    upcoming: []
  });
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    // Load data from our API utilities
    const fetchEntertainmentData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [headlines, bollywood, hollywood, tollywood, upcoming] = await Promise.all([
          getEntertainmentHeadlines(),
          getBollywoodNews(),
          getHollywoodNews(),
          getTollywoodNews(),
          getUpcomingReleases()
        ]);
        
        setEntertainment({
          headlines,
          bollywood,
          hollywood,
          tollywood,
          upcoming
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching entertainment data:", error);
        setError("Failed to load entertainment content. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchEntertainmentData();
  }, []);

  if (loading) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading entertainment content...</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
            <Button onClick={() => window.location.reload()} sx={{ ml: 2 }}>
              Retry
            </Button>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      {/* Mobile Navigation Header - only visible on small screens */}
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 1,
          p: 1,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <IconButton onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6">Entertainment</Typography>
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Navigation - conditionally rendered */}
      {showMobileNav && (
        <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%' }}>
          <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
        </Box>
      )}

      {/* Desktop Navigation */}
      <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>Entertainment News</Typography>
          
          {/* Headlines Ticker */}
          <Box className="ticker-wrap" sx={{ mb: 4 }}>
            <div className="ticker">
              {entertainment.headlines.map((headline, index) => (
                <div className="ticker-item" key={index}>{headline}</div>
              ))}
            </div>
          </Box>
          
          {/* Upcoming Releases */}
          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 2 }}>
            <TheatersIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Upcoming Releases
          </Typography>
          <Grid container spacing={2}>
            {entertainment.upcoming.map((release) => (
              <Grid item xs={12} sm={6} md={4} key={release.id}>
                <Box
                  className="movie-card"
                  onClick={() => navigate(`/entertainment/details/${release.id}/${release.category || 'entertainment'}`)}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    height: 200,
                    backgroundImage: `url(${release.image || 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      zIndex: 1
                    }
                  }}
                >
                  <Box 
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.7)',
                      p: 1,
                      zIndex: 2
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>
                      {release.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                      {release.releaseDate}
                    </Typography>
                    <Box 
                      className={release.type === 'Movie' ? 'movie-badge' : 'series-badge'}
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: 10,
                        px: 1,
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {release.type}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          {/* Bollywood News */}
          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 2 }}>
            <MovieIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Bollywood News
          </Typography>
          <Grid container spacing={2}>
            {entertainment.bollywood.map((news) => (
              <Grid item xs={12} sm={6} key={news.id}>
                <NewsCard news={news} />
              </Grid>
            ))}
          </Grid>
          
          {/* Hollywood News */}
          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 2 }}>
            <LiveTvIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Hollywood News
          </Typography>
          <Grid container spacing={2}>
            {entertainment.hollywood.map((news) => (
              <Grid item xs={12} sm={6} key={news.id}>
                <NewsCard news={news} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const NewsCard = ({ news }) => {
  const navigate = useNavigate();
  
  return (
    <Box 
      sx={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/entertainment/details/${news.id}/${news.category || 'entertainment'}`)}
    >
      <img 
        src={news.image} 
        alt={news.title} 
        style={{ 
          width: '100%', 
          height: '180px', 
          objectFit: 'cover' 
        }} 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop";
        }}
      />
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {news.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Entertainment;
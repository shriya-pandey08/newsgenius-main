import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TheatersIcon from '@mui/icons-material/Theaters';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import './Entertainment.css';
import { 
  getEntertainmentHeadlines, 
  getBollywoodNews, 
  getHollywoodNews, 
  getTollywoodNews, 
  getUpcomingReleases 
} from '../../utils/entertainmentAPI';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import { useNavigate, useParams } from 'react-router-dom';
import FuelUpdates from '../FuelUpdates/FuelUpdates';

const Entertainment = ({ theme }) => {
  const navigate = useNavigate();
  const { category, tag } = useParams(); // Get category or tag from URL if present
  const [headlines, setHeadlines] = useState([]);
  const [bollywoodNews, setBollywoodNews] = useState([]);
  const [hollywoodNews, setHollywoodNews] = useState([]);
  const [tollywoodNews, setTollywoodNews] = useState([]);
  const [upcomingReleases, setUpcomingReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(category || "all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Mobile navigation
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Set initial category from URL params if available
  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
      setShowFilters(true);
    }
  }, [category]);

  // Fetch entertainment news and data
  useEffect(() => {
    const fetchEntertainmentData = async () => {
      try {
        // Fetch all data concurrently for better performance
        const [
          headlinesData,
          bollywoodData,
          hollywoodData,
          tollywoodData,
          releasesData
        ] = await Promise.all([
          getEntertainmentHeadlines(),
          getBollywoodNews(),
          getHollywoodNews(),
          getTollywoodNews(),
          getUpcomingReleases()
        ]);
        
        // Update state with fetched data
        setHeadlines(headlinesData);
        setBollywoodNews(bollywoodData);
        setHollywoodNews(hollywoodData);
        setTollywoodNews(tollywoodData);
        setUpcomingReleases(releasesData);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching entertainment data:", error);
        setError("Failed to load entertainment news. Please try again later.");
        setLoading(false);
      }
    };

    fetchEntertainmentData();
  }, []);

  // Handle search functionality
  const handleSearch = (searchTerm, results) => {
    setSearchResults(results);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchResults(null); // Clear search results when changing category
    
    // Update URL to reflect the selected category
    if (category === "all") {
      navigate('/entertainment');
    } else {
      navigate(`/entertainment/category/${category}`);
    }
  };

  const filterContentByCategory = (contentArray, category) => {
    // If there's a tag parameter, filter by tag
    if (tag) {
      return contentArray.filter(item => {
        const title = item.title.toLowerCase();
        const description = (item.description || "").toLowerCase();
        return title.includes(tag.toLowerCase()) || description.includes(tag.toLowerCase());
      });
    }
    
    if (category === "all") return contentArray;
    
    // This would be more sophisticated in a real app with proper categorization
    // This is just a simple mock implementation
    const categoryMapping = {
      "movies": ["movie", "film", "cinema", "bollywood", "hollywood", "tollywood"],
      "tv": ["tv", "series", "show", "netflix", "disney+", "streaming"],
      "music": ["music", "song", "album", "concert", "singer"],
      "celebrities": ["actor", "actress", "star", "celebrity"]
    };
    
    return contentArray.filter(item => {
      const title = item.title.toLowerCase();
      const description = (item.description || "").toLowerCase();
      const terms = categoryMapping[category] || [];
      
      return terms.some(term => title.includes(term) || description.includes(term));
    });
  };

  const NewsCard = ({ news }) => (
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
      onClick={() => navigate(`/entertainment/details/${news.id}`)}
    >
      <Box sx={{ 
        width: '100%', 
        height: '180px', 
        backgroundImage: `url(${news.image || 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 1
        }
      }} />
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {news.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          {news.category} • {news.datePublished || 'Recent'}
        </Typography>
      </Box>
    </Box>
  );

  const ReleaseCard = ({ release }) => (
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
      onClick={() => navigate(`/entertainment/details/${release.id}`)}
    >
      <Box sx={{ 
        width: '100%', 
        height: '160px', 
        backgroundImage: `url(${release.image || 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 1
        }
      }} />
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {release.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
          <Typography variant="body2" color="text.secondary">
            {release.releaseDate}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              bgcolor: release.type === 'Movie' ? 'primary.main' : 'secondary.main',
              color: 'white',
              px: 1,
              borderRadius: '4px'
            }}
          >
            {release.type}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
          <Navigation theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
          <Navigation theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        </Grid>
      </Grid>
    );
  }

  // Filter content by selected category
  const filteredBollywood = filterContentByCategory(bollywoodNews, currentCategory);
  const filteredHollywood = filterContentByCategory(hollywoodNews, currentCategory);
  const filteredTollywood = filterContentByCategory(tollywoodNews, currentCategory);
  const filteredReleases = filterContentByCategory(upcomingReleases, currentCategory);

  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      {/* Mobile Navigation Header - Only visible on small screens */}
      <Box 
        sx={{ 
          display: { xs: 'flex', lg: 'none' }, 
          width: '100%', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          mt: 1
        }}
      >
        <IconButton onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Entertainment
        </Typography>
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>
      
      {/* Conditional Mobile Navigation */}
      {showMobileNav && (
        <Box sx={{ 
          display: { xs: 'block', lg: 'none' }, 
          width: '100%',
          mb: 3,
          p: 2,
          border: '1px solid #eee',
          borderRadius: '8px'
        }}>
          <Navigation theme={theme} />
        </Box>
      )}

      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
        {/* Entertainment Header and Ticker */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <TheatersIcon sx={{ mr: 1 }} fontSize="large" />
              Entertainment {tag && <span style={{ fontWeight: 'normal', fontSize: '0.7em', marginLeft: '8px' }}>#{tag}</span>}
            </Typography>
            <Button 
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Box>
          
          {/* Headlines Ticker */}
          <Box 
            sx={{ 
              bgcolor: 'rgba(25, 118, 210, 0.08)', 
              p: 1.5, 
              borderRadius: '4px',
              border: '1px solid rgba(25, 118, 210, 0.2)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div className="ticker-wrap">
              <div className="ticker">
                {headlines.map((headline, index) => (
                  <div key={index} className="ticker-item">
                    {headline}
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Box>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Category Filters */}
        {showFilters && (
          <CategoryFilter 
            currentCategory={currentCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        )}

        {/* Search Results */}
        {searchResults && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Results
            </Typography>
            {searchResults.length === 0 ? (
              <Alert severity="info">No results found</Alert>
            ) : (
              <Box>
                {searchResults.map((result) => (
                  <Box 
                    key={result.id} 
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      border: '1px solid #ddd', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
                    }}
                    onClick={() => navigate(`/entertainment/category/${result.type === 'movie' ? 'movies' : result.type === 'celebrity' ? 'celebrities' : 'all'}`)}
                  >
                    <Typography variant="h6">{result.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{result.category}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Upcoming Releases Section */}
        {!searchResults && filteredReleases.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <LiveTvIcon sx={{ mr: 1 }} />
              Upcoming Movies & Shows
            </Typography>
            
            <Grid container spacing={3}>
              {filteredReleases.map((release) => (
                <Grid item xs={12} sm={6} md={4} key={release.id}>
                  <ReleaseCard release={release} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Bollywood Section */}
        {!searchResults && filteredBollywood.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} />
              Bollywood News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredBollywood.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Hollywood Section */}
        {!searchResults && filteredHollywood.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} />
              Hollywood News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredHollywood.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Tollywood Section */}
        {!searchResults && filteredTollywood.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} />
              Tollywood News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredTollywood.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* No results message */}
        {!searchResults && filteredBollywood.length === 0 && filteredHollywood.length === 0 && filteredTollywood.length === 0 && filteredReleases.length === 0 && (
          <Alert severity="info" sx={{ mt: 4 }}>
            No entertainment content found for this category. Try selecting a different category.
          </Alert>
        )}

        {/* Related Articles */}
        <Grid item xs={12} lg={3} sx={{ 
          mt: { xs: 4, lg: 4 },
          pl: { xs: 2, lg: 2 },
          pr: { xs: 2, lg: 0 }
        }}>
          {/* Fuel Updates Section */}
          <Box sx={{ mb: 4 }}>
            <FuelUpdates />
          </Box>

          <Typography variant="h6" gutterBottom>Related Articles</Typography>
          {relatedArticles && relatedArticles.map((related) => (
            <Box 
              key={related.id}
              sx={{ 
                mb: 2,
                cursor: 'pointer',
                '&:hover': {
                  '& .title': {
                    color: 'primary.main'
                  }
                }
              }}
              onClick={() => navigate(`/entertainment/details/${related.id}`)}
            >
              <Box 
                component="img"
                src={related.image}
                alt={related.title}
                sx={{ 
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 1
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <Typography 
                variant="subtitle2" 
                className="title"
                sx={{ 
                  fontWeight: 'bold',
                  transition: 'color 0.2s'
                }}
              >
                {related.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {related.publishDate}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Entertainment; 
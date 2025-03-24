import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  CircularProgress,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Fade
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";

/**
 * SearchBar component for the Entertainment section
 */
const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl) && searchResults.length > 0;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // In a real app, this would call an API endpoint
    // This is a mock implementation
    setTimeout(() => {
      const mockResults = [
        {
          id: "search1",
          title: `Result for "${searchTerm}" in movies`,
          type: "movie",
          category: "Movies"
        },
        {
          id: "search2",
          title: `Top "${searchTerm}" news`,
          type: "article",
          category: "Entertainment News"
        },
        {
          id: "search3",
          title: `Celebrities related to "${searchTerm}"`,
          type: "celebrity",
          category: "Celebrities"
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
      onSearch && onSearch(searchTerm, mockResults);
    }, 500);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setAnchorEl(e.currentTarget);
    
    if (!value.trim()) {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setAnchorEl(null);
  };

  const handleResultClick = (result) => {
    clearSearch();
    
    // Navigate based on result type
    if (result.type === "movie") {
      navigate(`/entertainment/category/movies`);
    } else if (result.type === "article") {
      navigate(`/entertainment/tag/${searchTerm.toLowerCase()}`);
    } else if (result.type === "celebrity") {
      navigate(`/entertainment/category/celebrities`);
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          placeholder="Search entertainment news, movies, celebrities..."
          variant="outlined"
          size="medium"
          value={searchTerm}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {isSearching ? (
                  <CircularProgress size={20} />
                ) : searchTerm ? (
                  <IconButton
                    aria-label="clear search"
                    onClick={clearSearch}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                ) : null}
              </InputAdornment>
            ),
            sx: {
              borderRadius: '8px'
            }
          }}
        />
      </form>

      <Popper 
        open={open} 
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        style={{ width: anchorEl ? anchorEl.clientWidth : null, zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={3} sx={{ mt: 1, maxHeight: 300, overflow: 'auto' }}>
              <List>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        Results for "{searchTerm}"
                      </Typography>
                    } 
                  />
                </ListItem>
                <Divider />
                {searchResults.map((result, index) => (
                  <ListItem 
                    key={result.id} 
                    button
                    onClick={() => handleResultClick(result)}
                  >
                    <ListItemText 
                      primary={result.title}
                      secondary={result.category}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default SearchBar; 
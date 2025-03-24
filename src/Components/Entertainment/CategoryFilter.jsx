import React from "react";
import { Box, Tabs, Tab, styled } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CelebrationIcon from '@mui/icons-material/Celebration';

// Custom styled Tab component
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(3),
  color: 'rgba(0, 0, 0, 0.7)',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

/**
 * CategoryFilter component for filtering entertainment news by category
 */
const CategoryFilter = ({ currentCategory, onCategoryChange }) => {
  const handleChange = (event, newValue) => {
    onCategoryChange(newValue);
  };

  // Entertainment news categories
  const categories = [
    { value: "all", label: "All", icon: <CelebrationIcon fontSize="small" /> },
    { value: "movies", label: "Movies", icon: <MovieIcon fontSize="small" /> },
    { value: "tv", label: "TV Shows", icon: <LiveTvIcon fontSize="small" /> },
    { value: "music", label: "Music", icon: <MusicNoteIcon fontSize="small" /> },
    { value: "celebrities", label: "Celebrities", icon: <TheaterComedyIcon fontSize="small" /> }
  ];

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs
        value={currentCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="entertainment categories"
      >
        {categories.map((category) => (
          <StyledTab 
            key={category.value}
            value={category.value}
            label={category.label}
            icon={category.icon}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryFilter; 
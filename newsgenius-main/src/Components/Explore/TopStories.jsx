import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import TrendingNews from './TrendingNews';



const TopStories = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'AIzaSyAC5pnDAiBMLW-XYPc1BBZCURNbdjD2Ab4'; // YouTube API key

  const maxResults = 5;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet',
              chart: 'mostPopular',
              regionCode: 'IN',
              maxResults: maxResults,
              key: API_KEY
            }
          }
        );
        setVideos(response.data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Error loading videos: {error}
    </Alert>
  );


  return (
    <>
      <Box sx={{ mt: 4 }}>



      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Top Stories
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          '& > *:nth-child(n+4)': {
            gridColumn: { md: 'span 1' }
          },
          '& > *:nth-child(4), & > *:nth-child(5)': {
            gridColumn: { md: 'span 1.5' }
          }
        }}>



          {videos.map((video) => (
            <Box
              key={video.id}
              sx={{
                flex: 1,
                height: 300,
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '12px',

                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}


            >
              <Box
                component="iframe"
                width="100%"
                height="100%"
                style={{ border: 'none', width: '100%', height: '100%' }}



              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
                sx={{ borderRadius: 2 }}
              />
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                overflow: 'hidden'
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {video.snippet.title}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#666',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {video.snippet.description}
                </Typography>
              </Box>


            </Box>
          ))}
        </Box>
      </Box>


      </Box>
      <TrendingNews />
    </>
  );

};


export default TopStories;

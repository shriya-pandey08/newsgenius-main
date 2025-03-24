import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { load } from 'cheerio';


import { Box, Typography, CircularProgress, Alert } from '@mui/material';




import { useNavigate } from 'react-router-dom';

const TrendingNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const ABP_NEWS_URL = 'https://www.abplive.com/news';







  useEffect(() => {
    const fetchArticles = async () => {











      try {
        console.log('Fetching articles from ABP Live...');
        const { data } = await axios.get(ABP_NEWS_URL);
        const $ = load(data);

        
        const articles = [];
        
        $('.other_news li').each((i, el) => {
          const title = $(el).find('h3').text().trim();
          const url = $(el).find('a').attr('href');
          const image = $(el).find('img').attr('src');
          const description = $(el).find('p').text().trim();
          
          if (title && url) {
            articles.push({
              title,
              description: description || 'No description available',
              url: `https://www.abplive.com${url}`,
              urlToImage: image || '/logo.jpg',
              section: 'News'
            });
          }
        });

        if (articles.length === 0) {
          throw new Error('No articles found on ABP Live');
        }
        
        console.log('Successfully fetched articles from ABP Live');
        setArticles(articles.slice(0, 10)); // Limit to 10 articles
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load trending news');
      } finally {
        setLoading(false);
      }

    };

    fetchArticles();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Error loading articles: {error}
    </Alert>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Trending News
      </Typography>

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
        {articles.map((article) => (
          <Box
            key={article.url}
            sx={{
              flex: 1,
              height: 300,
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              cursor: 'pointer'
            }}
            onClick={() => window.open(article.url, '_blank')}
          >
            <img 
              src={article.urlToImage || '/logo.jpg'} 
              alt={article.title}
              style={{ 
                width: '100%', 
                height: '150px', 
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {article.title}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: '#666',
                ml: 1,
                whiteSpace: 'nowrap'
              }}>
                {article.section}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ 
              color: '#666',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {article.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrendingNews;

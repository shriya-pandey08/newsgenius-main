import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './EntertainmentDetails.css';

const EntertainmentDetails = ({ theme }) => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  useEffect(() => {
    // Simulating loading article data
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would fetch from an API based on the ID
        // For now, we'll simulate with a delay and mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for the article
        const mockArticle = {
          id: id,
          title: "Avatar 3: New Details Revealed About the 2025 Release",
          image: "https://cdn.pixabay.com/photo/2019/06/27/19/34/fantasy-4302632_1280.jpg",
          publishDate: "March 18, 2024",
          author: "Film Correspondent",
          content: `
            <p>Director James Cameron has shared exciting new details about the highly anticipated "Avatar 3," scheduled for release in December 2025. This third installment in the groundbreaking franchise promises to expand the world of Pandora in unexpected ways.</p>
            
            <p>"We're introducing a new clan of Na'vi that represents a different element," Cameron revealed in a recent interview. "The first two films explored the forest and water, and now we're going to be showing audiences a different side of Pandora with a focus on fire and ash."</p>
            
            <p>The filmmaker confirmed that production on the motion capture elements has been completed, with visual effects work now in full swing at Weta Digital. Early footage shown to select industry insiders has reportedly left them stunned at the continued technical innovation.</p>
            
            <p>"The level of detail and realism has again taken a significant leap forward," said one source who viewed early test footage. "What Cameron is doing with volumetric capture and the new rendering systems is going to change how films are made, just as the first Avatar did."</p>
            
            <p>Several cast members are returning, including Sam Worthington, Zoe Saldaña, and Sigourney Weaver in her new role introduced in "Avatar: The Way of Water." New additions to the cast include Michelle Yeoh and David Thewlis, though details about their characters remain under wraps.</p>
            
            <p>Cameron also addressed the film's lengthy development, noting that the simultaneous work on multiple sequels has allowed for a more cohesive overall story. "When audiences see parts 3, 4, and 5, they'll understand why we approached it this way. It's really one connected saga."</p>
            
            <p>The first "Avatar" film remains the highest-grossing film of all time with $2.9 billion worldwide, while the 2022 sequel "Avatar: The Way of Water" crossed the $2.3 billion mark. Disney, which acquired the franchise through its purchase of 20th Century Fox, has high expectations for the continued performance of the series.</p>
            
            <p>"Avatar 3" will push technological boundaries with new underwater performance capture techniques and higher frame rate presentation options. Cameron has also hinted that the film will feature sequences on Earth, giving audiences context about the ongoing resource crisis that drives human exploitation of Pandora.</p>
            
            <p>"Each film needs to be a standalone adventure but also fit into the larger narrative," Cameron explained. "We're building toward something truly epic by the fifth film."</p>
            
            <p>"Avatar 3" is scheduled for release on December 19, 2025, with the fourth and fifth installments planned for 2029 and 2031 respectively.</p>
          `,
          category: "Hollywood",
          tags: ["Avatar 3", "James Cameron", "Sci-Fi", "2025 Films", "Disney"]
        };
        
        setArticle(mockArticle);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article data:", error);
        setError("Failed to load article details. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchArticleData();
  }, [id, type]);
  
  const toggleLike = () => {
    setLiked(!liked);
    
    // In a real app, you would send this to an API or update localStorage
    // For example:
    // const userId = localStorage.getItem('userId');
    // if (userId) {
    //   const userLikesKey = `user_${userId}_likes`;
    //   const userLikes = JSON.parse(localStorage.getItem(userLikesKey) || '{}');
    //   
    //   if (!liked) {
    //     userLikes[article.id] = true;
    //   } else {
    //     delete userLikes[article.id];
    //   }
    //   
    //   localStorage.setItem(userLikesKey, JSON.stringify(userLikes));
    // }
  };
  
  const toggleSave = () => {
    setSaved(!saved);
    
    // Similar to like functionality, would update in a real app
  };

  if (loading) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Navigation activePage="entertainment" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading article...</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Navigation activePage="entertainment" theme={theme} />
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
        <IconButton onClick={() => navigate('/entertainment')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Article Details</Typography>
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Navigation - conditionally rendered */}
      {showMobileNav && (
        <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%' }}>
          <Navigation activePage="entertainment" theme={theme} />
        </Box>
      )}

      {/* Desktop Navigation */}
      <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Navigation activePage="entertainment" theme={theme} />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} lg={6.5} className="w-full relative px-2 sm:px-4 md:px-5">
        {article && (
          <Box sx={{ mt: 4 }}>
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={() => navigate('/entertainment')}
              sx={{ mb: 2 }}
            >
              Back to Entertainment
            </Button>
            
            <Typography variant="h4" gutterBottom>
              {article.title}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                By {article.author} | {article.publishDate}
              </Typography>
              
              <Box>
                <IconButton onClick={toggleLike} size="small">
                  {liked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <IconButton onClick={toggleSave} size="small">
                  {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
            
            <Box 
              component="img" 
              src={article.image} 
              alt={article.title}
              sx={{ 
                width: '100%', 
                height: { xs: 200, sm: 300, md: 400 }, 
                objectFit: 'cover',
                borderRadius: 1,
                mb: 3 
              }} 
            />
            
            <Box 
              dangerouslySetInnerHTML={{ __html: article.content }} 
              sx={{ 
                '& p': { 
                  mb: 2, 
                  lineHeight: 1.7 
                } 
              }}
            />
            
            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Tags:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {article.tags.map((tag, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      bgcolor: 'action.hover', 
                      px: 1.5, 
                      py: 0.5, 
                      borderRadius: 1,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.selected'
                      }
                    }}
                    onClick={() => navigate(`/entertainment/tag/${tag}`)}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Grid>
      
      {/* Related Articles Space (could be implemented in future) */}
      <Grid item xs={12} lg={2.5} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Box sx={{ mt: 4, pl: 2 }}>
          <Typography variant="h6" gutterBottom>Related Articles</Typography>
          <Typography variant="body2" color="text.secondary">
            More related content will appear here.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EntertainmentDetails; 
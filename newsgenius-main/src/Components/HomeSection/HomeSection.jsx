import { Avatar, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import PostCard from './PostCard';
import { articleAPI } from '../../config/api.config';
import Carousel from '../Carousel/Carousel';
import axios from 'axios';
import ArticleCreation from './ArticleCreation';

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Text is required")
});

const HomeSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headlines, setHeadlines] = useState([]);

  // Fetch news headlines
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=9e76e457ea734bd79ae1f3b784796948'
        );
        setHeadlines(response.data.articles.map((article) => article.title));
      } catch (err) {
        console.error('Error fetching headlines:', err);
      }
    };

    fetchHeadlines();
  }, []);

  // Fetch all articles (from localStorage in this implementation)
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch articles from localStorage instead of API for demo
        let storedArticles = [];
        try {
          const articlesData = localStorage.getItem('articles');
          if (articlesData) {
            storedArticles = JSON.parse(articlesData);
          }
        } catch (err) {
          console.error('Error parsing stored articles:', err);
        }
        
        setArticles(storedArticles);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to fetch articles');
        setArticles([]);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Handle article creation
  const handleArticleCreated = (newArticle) => {
    setArticles([newArticle, ...articles]);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
        {/* Scrolling headlines */}
        <div
          style={{
            backgroundColor: 'darkred',
            color: 'gold',
            padding: '5px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginBottom: '20px',
            fontSize: '20px',
          }}
        >
          <marquee behavior="scroll" direction="left">
            {headlines.length > 0
              ? headlines.join(' | ')
              : 'Loading headlines...'}
          </marquee>
        </div>
      </section>

      <Carousel />

      {/* Article Creation Component */}
      <ArticleCreation onArticleCreated={handleArticleCreated} />

      {loading ? (
        <div className="text-center py-4">Loading articles...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-4">No articles found</div>
      ) : (
        <div className="space-y-5">
          {articles.map((article) => (
            <PostCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeSection;

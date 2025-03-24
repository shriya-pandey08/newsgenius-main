import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carousel.css';

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch news images from NewsAPI
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=9e76e457ea734bd79ae1f3b784796948'
        );
        const articlesWithImages = response.data.articles.filter(
          (article) => article.urlToImage && article.urlToImage.startsWith('http')
        );
        setImages(articlesWithImages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to fetch images. Please try again later.');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Automatically change the image every 3 seconds
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (loading) {
    return (
      <div className="carousel-container loading">
        <div className="loading-text">Loading images...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carousel-container error">
        <div className="error-text">{error}</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="carousel-container no-images">
        <div className="no-images-text">No images available</div>
      </div>
    );
  }

  const currentArticle = images[currentIndex];

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <img
          src={currentArticle.urlToImage}
          alt={currentArticle.title}
          className="carousel-image"
        />
        <div className="carousel-overlay">
          <h2 className="carousel-title">{currentArticle.title}</h2>
          <p className="carousel-description">{currentArticle.description}</p>
          <a
            href={currentArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="carousel-link"
          >
            Read More
          </a>
        </div>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
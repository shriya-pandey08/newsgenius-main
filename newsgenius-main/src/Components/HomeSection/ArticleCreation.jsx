import React, { useState, useRef } from 'react';
import { Avatar, Button, Popover, CircularProgress } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { articleAPI } from '../../config/api.config';
// Remove emoji-mart imports that are causing issues
// import data from '@emoji-mart/data';
// import Picker from '@emoji-mart/react';
import './ArticleCreation.css';

// Simple emoji list for our custom picker
const EMOJI_LIST = [
  { id: 1, emoji: '😀', name: 'Smile' },
  { id: 2, emoji: '😂', name: 'Joy' },
  { id: 3, emoji: '❤️', name: 'Heart' },
  { id: 4, emoji: '👍', name: 'Thumbs Up' },
  { id: 5, emoji: '🎉', name: 'Party' },
  { id: 6, emoji: '🔥', name: 'Fire' },
  { id: 7, emoji: '😍', name: 'Heart Eyes' },
  { id: 8, emoji: '😊', name: 'Smiling' },
  { id: 9, emoji: '🙏', name: 'Pray' },
  { id: 10, emoji: '👏', name: 'Clap' },
  { id: 11, emoji: '🤔', name: 'Thinking' },
  { id: 12, emoji: '😢', name: 'Cry' },
  { id: 13, emoji: '😎', name: 'Cool' },
  { id: 14, emoji: '🤣', name: 'ROFL' },
  { id: 15, emoji: '😘', name: 'Kiss' },
  { id: 16, emoji: '🥰', name: 'Love' },
  { id: 17, emoji: '🤷‍♂️', name: 'Shrug' },
  { id: 18, emoji: '👋', name: 'Wave' },
  { id: 19, emoji: '🙄', name: 'Eye Roll' },
  { id: 20, emoji: '💯', name: '100' },
  { id: 21, emoji: '💪', name: 'Muscle' },
  { id: 22, emoji: '🤦‍♂️', name: 'Facepalm' },
  { id: 23, emoji: '😴', name: 'Sleep' },
  { id: 24, emoji: '🌟', name: 'Star' },
];

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Text is required")
});

const ArticleCreation = ({ onArticleCreated }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [anchorElEmoji, setAnchorElEmoji] = useState(null);
  const [anchorElLocation, setAnchorElLocation] = useState(null);
  const [anchorElMedia, setAnchorElMedia] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState([
    { id: 1, url: 'https://source.unsplash.com/random/800x600/?news' },
    { id: 2, url: 'https://source.unsplash.com/random/800x600/?journalism' },
    { id: 3, url: 'https://source.unsplash.com/random/800x600/?media' },
    { id: 4, url: 'https://source.unsplash.com/random/800x600/?reporter' },
    { id: 5, url: 'https://source.unsplash.com/random/800x600/?newspaper' },
    { id: 6, url: 'https://source.unsplash.com/random/800x600/?channel' }
  ]);
  
  const fileInputRef = useRef(null);
  const userName = localStorage.getItem('userName') || 'User';
  const userImage = localStorage.getItem('userProfile') ? 
    JSON.parse(localStorage.getItem('userProfile')).image : 
    'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png';
  
  const predefinedLocations = [
    { id: 1, name: 'New York, USA' },
    { id: 2, name: 'London, UK' },
    { id: 3, name: 'Tokyo, Japan' },
    { id: 4, name: 'Paris, France' },
    { id: 5, name: 'Sydney, Australia' },
    { id: 6, name: 'Mumbai, India' },
    { id: 7, name: 'Current Location', getCurrentLocation: true }
  ];

  const handleEmojiClick = (event) => {
    setAnchorElEmoji(event.currentTarget);
  };

  const handleLocationClick = (event) => {
    setAnchorElLocation(event.currentTarget);
  };

  const handleMediaClick = (event) => {
    setAnchorElMedia(event.currentTarget);
  };

  const handleCloseEmoji = () => {
    setAnchorElEmoji(null);
  };
  
  const handleCloseLocation = () => {
    setAnchorElLocation(null);
  };
  
  const handleCloseMedia = () => {
    setAnchorElMedia(null);
  };

  const handleEmojiSelect = (emoji) => {
    // Modified to work with our simple emoji implementation
    formik.setFieldValue('content', formik.values.content + emoji);
    handleCloseEmoji();
  };

  const handleLocationSelect = (location) => {
    if (location.getCurrentLocation) {
      // Get user's current location using browser geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setSelectedLocation({
              name: 'Current Location',
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            });
            handleCloseLocation();
          },
          (error) => {
            console.error('Error getting location:', error);
            setSelectedLocation({ name: 'Location unavailable' });
            handleCloseLocation();
          }
        );
      } else {
        setSelectedLocation({ name: 'Geolocation not supported' });
        handleCloseLocation();
      }
    } else {
      setSelectedLocation(location);
      handleCloseLocation();
    }
  };

  const handleMediaSelect = (mediaItem) => {
    setPreviewImage(mediaItem.url);
    formik.setFieldValue('imageUrl', mediaItem.url);
    setMediaLibraryOpen(false);
    handleCloseMedia();
  };

  const handleDeviceMediaSelect = () => {
    fileInputRef.current.click();
    handleCloseMedia();
  };

  const handleMediaLibraryToggle = () => {
    setMediaLibraryOpen(!mediaLibraryOpen);
    handleCloseMedia();
  };
  
  const handleClearImage = () => {
    setPreviewImage(null);
    formik.setFieldValue('imageUrl', '');
    formik.setFieldValue('imageFile', null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        formik.setFieldValue('imageFile', file);
        formik.setFieldValue('imageUrl', reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setUploading(true);
      setError('');
      
      // Create article data
      const articleData = {
        content: values.content,
        image: values.imageUrl,
        location: selectedLocation ? selectedLocation.name : null,
        createdAt: new Date().toISOString(),
        user: {
          id: localStorage.getItem('userId'),
          fullName: userName,
          image: userImage
        }
      };
      
      // Store article in localStorage
      let articles = [];
      try {
        const storedArticles = localStorage.getItem('articles');
        if (storedArticles) {
          articles = JSON.parse(storedArticles);
        }
      } catch (err) {
        console.error('Error parsing stored articles:', err);
      }
      
      // Add new article with unique ID
      const newArticle = {
        ...articleData,
        id: Date.now().toString(),
      };
      
      // Log the article structure before saving
      console.log('Saving new article:', newArticle);
      
      articles.unshift(newArticle); // Add to beginning of array
      localStorage.setItem('articles', JSON.stringify(articles));
      
      // Call the parent's callback with the new article
      if (onArticleCreated) {
        onArticleCreated(newArticle);
      }
      
      // Reset form
      resetForm();
      setPreviewImage(null);
      setSelectedLocation(null);
      
    } catch (err) {
      console.error('Error creating article:', err);
      setError('Failed to create article. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      content: '',
      imageUrl: '',
      imageFile: null
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div className="article-creation-container p-5 bg-white rounded-lg shadow mb-5">
      <div className="flex space-x-4">
        <Avatar src={userImage} alt={userName} />
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div>
            <textarea
              name="content"
              placeholder="What's happening?"
              className="w-full p-2 bg-transparent outline-none border-b min-h-[80px] resize-none"
              {...formik.getFieldProps('content')}
            />
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 text-sm">{formik.errors.content}</div>
            )}
          </div>
          
          {previewImage && (
            <div className="relative mt-3">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full max-h-[300px] object-cover rounded-lg"
              />
              <button 
                type="button" 
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-60 rounded-full p-1 text-white"
                onClick={handleClearImage}
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          )}
          
          {selectedLocation && (
            <div className="mt-2 flex items-center text-blue-500">
              <FmdGoodIcon fontSize="small" className="mr-1" />
              <span className="text-sm">{selectedLocation.name}</span>
              <button 
                type="button" 
                className="ml-2 text-gray-500"
                onClick={() => setSelectedLocation(null)}
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          )}
          
          {mediaLibraryOpen && (
            <div className="media-library mt-3 grid grid-cols-3 gap-2">
              {mediaItems.map((item) => (
                <div 
                  key={item.id} 
                  className="cursor-pointer relative rounded-lg overflow-hidden h-24"
                  onClick={() => handleMediaSelect(item)}
                >
                  <img 
                    src={item.url} 
                    alt={`Media ${item.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4 items-center">
              <button 
                type="button" 
                className="text-blue-500 hover:bg-blue-50 rounded-full p-2 transition-colors"
                onClick={handleMediaClick}
              >
                <ImageIcon />
              </button>
              
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              
              <button 
                type="button"
                className="text-blue-500 hover:bg-blue-50 rounded-full p-2 transition-colors"
                onClick={handleLocationClick}
              >
                <FmdGoodIcon />
              </button>
              
              <button 
                type="button"
                className="text-blue-500 hover:bg-blue-50 rounded-full p-2 transition-colors"
                onClick={handleEmojiClick}
              >
                <TagFacesIcon />
              </button>
            </div>
            
            <Button
              variant="contained"
              type="submit"
              disabled={!formik.values.content || uploading}
              className="rounded-full"
            >
              {uploading ? <CircularProgress size={24} /> : 'Post'}
            </Button>
          </div>
          
          <Popover
            open={Boolean(anchorElEmoji)}
            anchorEl={anchorElEmoji}
            onClose={handleCloseEmoji}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {/* Custom Emoji Picker instead of emoji-mart */}
            <div className="custom-emoji-picker p-3">
              <h3 className="text-sm font-medium mb-2">Choose an emoji</h3>
              <div className="grid grid-cols-6 gap-2">
                {EMOJI_LIST.map((item) => (
                  <div 
                    key={item.id}
                    className="emoji-item cursor-pointer text-2xl hover:bg-gray-100 p-1 rounded"
                    onClick={() => handleEmojiSelect(item.emoji)}
                    title={item.name}
                  >
                    {item.emoji}
                  </div>
                ))}
              </div>
            </div>
          </Popover>
          
          <Popover
            open={Boolean(anchorElMedia)}
            anchorEl={anchorElMedia}
            onClose={handleCloseMedia}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div className="media-options p-3 max-w-xs">
              <h3 className="font-medium mb-2">Add media</h3>
              <div className="space-y-2">
                <div 
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center"
                  onClick={handleDeviceMediaSelect}
                >
                  <AddPhotoAlternateIcon fontSize="small" className="mr-2 text-gray-500" />
                  <span>Upload from device</span>
                </div>
                <div 
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center"
                  onClick={handleMediaLibraryToggle}
                >
                  <PhotoLibraryIcon fontSize="small" className="mr-2 text-gray-500" />
                  <span>Choose from library</span>
                </div>
              </div>
            </div>
          </Popover>
          
          <Popover
            open={Boolean(anchorElLocation)}
            anchorEl={anchorElLocation}
            onClose={handleCloseLocation}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div className="location-picker p-3 max-w-xs">
              <h3 className="font-medium mb-2">Choose location</h3>
              <div className="space-y-1">
                {predefinedLocations.map((location) => (
                  <div 
                    key={location.id}
                    className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <FmdGoodIcon fontSize="small" className="mr-2 text-gray-500" />
                    <span>{location.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Popover>
        </form>
      </div>
    </div>
  );
};

export default ArticleCreation; 
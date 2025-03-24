import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't override Content-Type if it's already set to FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Authentication API endpoints
export const authAPI = {
  signup: (data) => {
    // Create a request object that matches the backend expectations
    const requestData = {
      name: data.username,
      email: data.email,
      password: data.password,
      role: data.role.toLowerCase(),
      // Only add these if they exist
      ...(data.bio && { bio: data.bio }),
      ...(data.channelName && { channelName: data.channelName }),
      ...(data.location && { location: data.location }),
      ...(data.mobile && { mobile: data.mobile }),
      ...(data.website && { website: data.website })
    };

    // Store image and background image data if available
    if (data.image) {
      requestData.image = data.image;
    }
    
    if (data.backgroundImage) {
      requestData.backgroundImage = data.backgroundImage;
    }
    
    console.log('Final signup request data:', requestData);
    
    // Mock implementation that simulates a successful signup and JWT token generation
    const mockUserId = `user_${Date.now()}`;
    const mockToken = `mock_token_${Date.now()}`;
    
    // Store user info in localStorage
    localStorage.setItem('userId', mockUserId);
    localStorage.setItem('userName', data.username);
    localStorage.setItem('userRole', data.role.toLowerCase());
    localStorage.setItem('token', mockToken);
    
    // Also store the full user data for profile generation
    const userInfo = {
      id: mockUserId,
      name: data.username,
      email: data.email,
      role: data.role.toLowerCase(),
      location: data.location || '',
      bio: data.bio || `Hello, I am ${data.username}`,
      channelName: data.channelName || '',
      mobile: data.mobile || '',
      website: data.website || '',
      image: data.image || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png",
      backgroundImage: data.backgroundImage || "https://cdn.pixabay.com/photo/2021/07/02/00/20/woman-6380562_640.jpg",
      isVerified: true,
      profession: data.profession || "Education",
      following: 0,
      followers: 0,
      rating: 4.0,
      joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    };
    
    // Store user info for profile creation
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // Get existing user profiles from localStorage or create new object
    let users = {};
    try {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }
    } catch (err) {
      console.error('Error parsing stored users:', err);
    }
    
    // Store user profile in the users object
    users[mockUserId] = userInfo;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Also set as userProfile for backward compatibility
    localStorage.setItem('userProfile', JSON.stringify(userInfo));
    
    return Promise.resolve({
      data: {
        token: mockToken,
        userId: mockUserId,
        userName: data.username,
        userRole: data.role.toLowerCase()
      }
    });
  },
  
  login: (data) => {
    // In a real implementation, we would validate credentials with the backend
    // For now, we'll simulate login by checking if the user exists
    
    try {
      // Get existing users from localStorage
      let users = {};
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          users = JSON.parse(storedUsers);
        }
      } catch (err) {
        console.error('Error parsing stored users:', err);
      }
      
      // Try to find existing user by email
      let existingUser = null;
      let existingUserId = null;
      
      // Look through all users to find a match by email
      Object.entries(users).forEach(([id, user]) => {
        if (user.email === data.email) {
          existingUser = user;
          existingUserId = id;
        }
      });
      
      // Generate tokens and IDs
      let userId, token;
      
      if (existingUser) {
        // Use existing user's ID
        userId = existingUserId;
        token = `mock_token_${Date.now()}`;
        console.log('Found existing user:', existingUser.name);
      } else {
        // Create new user
        userId = `user_${Date.now()}`;
        token = `mock_token_${Date.now()}`;
        
        // Create user info based on email (just mock data)
        const username = data.email.split('@')[0];
        
        // Create a default profile for the new user
        const userInfo = {
          id: userId,
          name: username,
          email: data.email,
          role: 'user', // Default role
          location: '',
          bio: `Hello, I am ${username}`,
          channelName: '',
          mobile: '',
          website: '',
          image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png",
          backgroundImage: "https://cdn.pixabay.com/photo/2021/07/02/00/20/woman-6380562_640.jpg",
          isVerified: false,
          profession: "Education",
          following: 0,
          followers: 0,
          rating: 4.0,
          joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        };
        
        // Store user profile in the users object
        users[userId] = userInfo;
        localStorage.setItem('users', JSON.stringify(users));
        
        existingUser = userInfo;
        console.log('Created new user:', username);
      }
      
      // Store user info in localStorage for session management
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', existingUser.name);
      localStorage.setItem('userRole', existingUser.role || 'user');
      localStorage.setItem('token', token);
      
      // Store user info for profile access
      localStorage.setItem('userInfo', JSON.stringify({
        id: userId,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role || 'user'
      }));
      
      // Set current user's profile for backward compatibility
      localStorage.setItem('userProfile', JSON.stringify(existingUser));
      
      return Promise.resolve({
        data: {
          token: token,
          userId: userId,
          userName: existingUser.name,
          userRole: existingUser.role || 'user'
        }
      });
    } catch (err) {
      console.error('Error during login:', err);
      return Promise.reject(new Error('Login failed'));
    }
  },
  verifyToken: () => api.get('/auth/verify'),
};

// Article API endpoints with role-based operations
export const articleAPI = {
  // Public operations
  getAllArticles: () => {
    // Mock implementation that returns articles from localStorage
    try {
      const storedArticles = localStorage.getItem('articles');
      const articles = storedArticles ? JSON.parse(storedArticles) : [];
      
      // Ensure all articles have proper date strings
      const sanitizedArticles = articles.map(article => {
        if (!article) return null;
        
        // Make a copy of the article to avoid modifying the original
        const sanitized = {...article};
        
        // Convert Date objects to ISO strings
        if (sanitized.createdAt && typeof sanitized.createdAt === 'object') {
          sanitized.createdAt = new Date(sanitized.createdAt).toISOString();
        }
        
        // If createdAt is missing, add a default
        if (!sanitized.createdAt) {
          sanitized.createdAt = new Date().toISOString();
        }
        
        // Ensure content is a string
        if (typeof sanitized.content !== 'string') {
          sanitized.content = String(sanitized.content || '');
        }
        
        return sanitized;
      }).filter(Boolean); // Remove any null articles
      
      // Sort by createdAt in descending order (newest first)
      sanitizedArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return Promise.resolve({ data: sanitizedArticles });
    } catch (err) {
      console.error('Error fetching articles from localStorage:', err);
      return Promise.reject(new Error('Failed to fetch articles'));
    }
  },
  
  getArticleById: (id) => {
    // Mock implementation that returns a specific article from localStorage
    try {
      const storedArticles = localStorage.getItem('articles');
      const articles = storedArticles ? JSON.parse(storedArticles) : [];
      const article = articles.find(article => article.id.toString() === id.toString());
      
      if (!article) {
        return Promise.reject(new Error('Article not found'));
      }
      
      return Promise.resolve({ data: article });
    } catch (err) {
      console.error('Error fetching article from localStorage:', err);
      return Promise.reject(new Error('Failed to fetch article'));
    }
  },
  
  // Reporter/Channel operations
  createArticle: (data) => {
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userImage = localStorage.getItem('userProfile') ? 
      JSON.parse(localStorage.getItem('userProfile')).image : 
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png';
    
    // For demo purposes, allow any user to create articles
    try {
      // Create article data
      const newArticle = {
        id: Date.now().toString(),
        content: data.content || (data instanceof FormData ? data.get('content') : ''),
        image: data.image || (data instanceof FormData ? data.get('image') : null),
        location: data.location || null,
        createdAt: new Date().toISOString(),
        user: {
          id: userId,
          fullName: userName,
          image: userImage
        }
      };
      
      // Store in localStorage
      let articles = [];
      const storedArticles = localStorage.getItem('articles');
      if (storedArticles) {
        articles = JSON.parse(storedArticles);
      }
      
      articles.unshift(newArticle); // Add to beginning of array
      localStorage.setItem('articles', JSON.stringify(articles));
      
      return Promise.resolve({ data: newArticle });
    } catch (err) {
      console.error('Error creating article:', err);
      return Promise.reject(new Error('Failed to create article'));
    }
  },
  
  updateArticle: (id, data) => {
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    
    // For demo purposes, only check if the user is the author of the article
    try {
      const storedArticles = localStorage.getItem('articles');
      if (!storedArticles) {
        return Promise.reject(new Error('No articles found'));
      }
      
      const articles = JSON.parse(storedArticles);
      const articleIndex = articles.findIndex(article => article.id.toString() === id.toString());
      
      if (articleIndex === -1) {
        return Promise.reject(new Error('Article not found'));
      }
      
      // Check if user is the author
      if (articles[articleIndex].user.id !== userId) {
        return Promise.reject(new Error('Unauthorized: You can only update your own articles'));
      }
      
      // Update article
      articles[articleIndex] = {
        ...articles[articleIndex],
        content: data.content || articles[articleIndex].content,
        image: data.image || articles[articleIndex].image,
        location: data.location || articles[articleIndex].location,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('articles', JSON.stringify(articles));
      
      return Promise.resolve({ data: articles[articleIndex] });
    } catch (err) {
      console.error('Error updating article:', err);
      return Promise.reject(new Error('Failed to update article'));
    }
  },
  
  deleteArticle: (id) => {
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    
    // For demo purposes, only check if the user is the author of the article
    try {
      const storedArticles = localStorage.getItem('articles');
      if (!storedArticles) {
        return Promise.reject(new Error('No articles found'));
      }
      
      const articles = JSON.parse(storedArticles);
      const articleIndex = articles.findIndex(article => article.id.toString() === id.toString());
      
      if (articleIndex === -1) {
        return Promise.reject(new Error('Article not found'));
      }
      
      // Check if user is the author
      if (articles[articleIndex].user.id !== userId) {
        return Promise.reject(new Error('Unauthorized: You can only delete your own articles'));
      }
      
      // Remove article
      articles.splice(articleIndex, 1);
      localStorage.setItem('articles', JSON.stringify(articles));
      
      return Promise.resolve({ success: true, message: 'Article deleted successfully' });
    } catch (err) {
      console.error('Error deleting article:', err);
      return Promise.reject(new Error('Failed to delete article'));
    }
  },
  
  getUserArticles: (userId) => {
    // Mock implementation that returns user's articles from localStorage
    try {
      const storedArticles = localStorage.getItem('articles');
      const articles = storedArticles ? JSON.parse(storedArticles) : [];
      
      // Filter articles by user ID
      const userArticles = articles.filter(article => 
        article.user && article.user.id === userId
      );
      
      // Sort by createdAt in descending order (newest first)
      userArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return Promise.resolve({ data: userArticles });
    } catch (err) {
      console.error('Error fetching user articles from localStorage:', err);
      return Promise.reject(new Error('Failed to fetch user articles'));
    }
  }
};

// Comment API endpoints
export const commentAPI = {
  getComments: (articleId) => {
    // Mock implementation that retrieves comments from localStorage
    try {
      const userId = localStorage.getItem('userId');
      let comments = [];
      const storedComments = localStorage.getItem('comments');
      
      if (storedComments) {
        const allComments = JSON.parse(storedComments);
        comments = allComments
          .filter(comment => comment.articleId === articleId)
          .map(comment => {
            // Process the comment to ensure content is valid
            const processedComment = {...comment};
            
            // Ensure content is a string
            if (typeof processedComment.content !== 'string') {
              processedComment.content = processedComment.content ? 
                String(processedComment.content) : 'Comment';
            }
            
            // Trim content and provide fallback if empty
            processedComment.content = processedComment.content.trim();
            if (!processedComment.content) {
              processedComment.content = 'Comment';
            }
            
            return processedComment;
          });
        
        // Check for user-specific comments to ensure consistency
        try {
          // Check if this user has comments for this article that aren't in the main comment list
          const userCommentsKey = `user_${userId}_comments`;
          const storedUserComments = localStorage.getItem(userCommentsKey);
          
          if (storedUserComments) {
            const userComments = JSON.parse(storedUserComments);
            const userCommentsForArticle = userComments.filter(c => c.articleId === articleId);
            
            // For each user comment, check if it's in the main comments array
            userCommentsForArticle.forEach(userComment => {
              if (!comments.some(c => c.id === userComment.commentId)) {
                // Comment missing from main list, add it
                const userName = localStorage.getItem('userName') || 'User';
                const userProfile = localStorage.getItem('userProfile');
                const userAvatar = userProfile ? JSON.parse(userProfile).image : null;
                
                const newComment = {
                  id: userComment.commentId,
                  articleId,
                  userId,
                  userName,
                  userAvatar,
                  content: userComment.content,
                  createdAt: userComment.createdAt || new Date().toISOString()
                };
                
                // Add to comments list
                comments.push(newComment);
                
                // Update main comments storage
                const allComments = storedComments ? JSON.parse(storedComments) : [];
                allComments.push(newComment);
                localStorage.setItem('comments', JSON.stringify(allComments));
                console.log(`Restored comment ${userComment.commentId} for article ${articleId}`);
              }
            });
          }
        } catch (err) {
          console.error('Error checking user-specific comments:', err);
        }
        
        // Sort by createdAt in ascending order (oldest first)
        comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
      
      return Promise.resolve({ data: comments });
    } catch (err) {
      console.error('Error getting comments:', err);
      return Promise.reject(new Error('Failed to get comments'));
    }
  },
  
  addComment: (articleId, data) => {
    // Mock implementation that adds a comment to localStorage
    try {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName') || 'User';
      const userProfile = localStorage.getItem('userProfile');
      const userAvatar = userProfile ? JSON.parse(userProfile).image : null;
      
      // Extract and validate content
      let content = '';
      
      console.log('Raw comment data received:', data, 'Type:', typeof data);
      
      // Direct handling for string input
      if (typeof data === 'string') {
        content = data;
      }
      // Handle FormData objects
      else if (data instanceof FormData) {
        content = data.get('content');
      }
      // Handle regular objects
      else if (typeof data === 'object' && data !== null) {
        if (typeof data.content === 'string') {
          content = data.content;
        } else if (data.content && typeof data.content === 'object') {
          try {
            content = JSON.stringify(data.content);
          } catch (e) {
            content = 'Comment';
          }
        } else if (data.content) {
          content = String(data.content);
        }
      }
      
      // Final content check
      if (typeof content !== 'string') {
        content = String(content || '');
      }
      
      // Trim content and provide fallback
      content = content.trim();
      if (!content) {
        content = 'Comment';
      }
      
      console.log('Final processed comment content:', content);
      
      // Create new comment
      const commentId = Date.now().toString();
      const newComment = {
        id: commentId,
        articleId,
        userId,
        userName,
        userAvatar,
        content,
        createdAt: new Date().toISOString()
      };
      
      // Add to localStorage
      let comments = [];
      const storedComments = localStorage.getItem('comments');
      if (storedComments) {
        comments = JSON.parse(storedComments);
      }
      
      comments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(comments));
      
      // Track user's comments for persistence
      try {
        const userCommentsKey = `user_${userId}_comments`;
        let userComments = [];
        const storedUserComments = localStorage.getItem(userCommentsKey);
        if (storedUserComments) {
          userComments = JSON.parse(storedUserComments);
        }
        
        userComments.push({
          commentId,
          articleId,
          content,
          createdAt: newComment.createdAt
        });
        
        localStorage.setItem(userCommentsKey, JSON.stringify(userComments));
        console.log(`Added comment ${commentId} to user ${userId}'s comments`);
      } catch (err) {
        console.error('Error updating user comments:', err);
      }
      
      return Promise.resolve({ data: newComment });
    } catch (err) {
      console.error('Error adding comment:', err);
      return Promise.reject(new Error('Failed to add comment'));
    }
  },
  
  updateComment: (articleId, commentId, data) => {
    // Mock implementation that updates a comment in localStorage
    try {
      const userId = localStorage.getItem('userId');
      
      // Get stored comments
      const storedComments = localStorage.getItem('comments');
      if (!storedComments) {
        return Promise.reject(new Error('No comments found'));
      }
      
      const comments = JSON.parse(storedComments);
      const commentIndex = comments.findIndex(
        comment => comment.id === commentId && comment.articleId === articleId
      );
      
      if (commentIndex === -1) {
        return Promise.reject(new Error('Comment not found'));
      }
      
      // Check if user is the author of the comment
      if (comments[commentIndex].userId !== userId) {
        return Promise.reject(new Error('Unauthorized: You can only update your own comments'));
      }
      
      // Update comment
      comments[commentIndex] = {
        ...comments[commentIndex],
        content: data.content,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('comments', JSON.stringify(comments));
      
      return Promise.resolve({ data: comments[commentIndex] });
    } catch (err) {
      console.error('Error updating comment:', err);
      return Promise.reject(new Error('Failed to update comment'));
    }
  },
  
  deleteComment: (articleId, commentId) => {
    // Mock implementation that deletes a comment from localStorage
    try {
      const userId = localStorage.getItem('userId');
      
      // Get stored comments
      const storedComments = localStorage.getItem('comments');
      if (!storedComments) {
        return Promise.reject(new Error('No comments found'));
      }
      
      const comments = JSON.parse(storedComments);
      const commentIndex = comments.findIndex(
        comment => comment.id === commentId && comment.articleId === articleId
      );
      
      if (commentIndex === -1) {
        return Promise.reject(new Error('Comment not found'));
      }
      
      // Check if user is the author of the comment
      if (comments[commentIndex].userId !== userId) {
        return Promise.reject(new Error('Unauthorized: You can only delete your own comments'));
      }
      
      // Remove comment
      comments.splice(commentIndex, 1);
      localStorage.setItem('comments', JSON.stringify(comments));
      
      return Promise.resolve({ success: true, message: 'Comment deleted successfully' });
    } catch (err) {
      console.error('Error deleting comment:', err);
      return Promise.reject(new Error('Failed to delete comment'));
    }
  },
};

// Reaction API endpoints (likes, shares)
export const reactionAPI = {
  likeArticle: (articleId) => {
    // Mock implementation that adds a like to localStorage
    try {
      const userId = localStorage.getItem('userId');
      
      // Get stored likes
      let likes = [];
      const storedLikes = localStorage.getItem('likes');
      if (storedLikes) {
        likes = JSON.parse(storedLikes);
      }
      
      // Check if user already liked the article
      const existingLike = likes.find(
        like => like.articleId === articleId && like.userId === userId
      );
      
      if (existingLike) {
        return Promise.resolve({ data: existingLike, message: 'Article already liked' });
      }
      
      // Add new like
      const newLike = {
        id: Date.now().toString(),
        articleId,
        userId,
        createdAt: new Date().toISOString()
      };
      
      likes.push(newLike);
      localStorage.setItem('likes', JSON.stringify(likes));
      
      // Update user's liked articles list for persistence
      try {
        const userLikesKey = `user_${userId}_likes`;
        let userLikes = [];
        const storedUserLikes = localStorage.getItem(userLikesKey);
        if (storedUserLikes) {
          userLikes = JSON.parse(storedUserLikes);
          
          if (!userLikes.includes(articleId)) {
            userLikes.push(articleId);
            localStorage.setItem(userLikesKey, JSON.stringify(userLikes));
            console.log(`Added article ${articleId} to user ${userId}'s likes`);
          }
        }
      } catch (err) {
        console.error('Error updating user likes:', err);
      }
      
      return Promise.resolve({ data: newLike });
    } catch (err) {
      console.error('Error liking article:', err);
      return Promise.reject(new Error('Failed to like article'));
    }
  },
  
  unlikeArticle: (articleId) => {
    // Mock implementation that removes a like from localStorage
    try {
      const userId = localStorage.getItem('userId');
      
      // Get stored likes
      const storedLikes = localStorage.getItem('likes');
      if (!storedLikes) {
        return Promise.resolve({ success: true, message: 'No likes found' });
      }
      
      const likes = JSON.parse(storedLikes);
      const likeIndex = likes.findIndex(
        like => like.articleId === articleId && like.userId === userId
      );
      
      if (likeIndex === -1) {
        return Promise.resolve({ success: true, message: 'Article not liked' });
      }
      
      // Remove like
      likes.splice(likeIndex, 1);
      localStorage.setItem('likes', JSON.stringify(likes));
      
      // Update user's liked articles list for persistence
      try {
        const userLikesKey = `user_${userId}_likes`;
        let userLikes = [];
        const storedUserLikes = localStorage.getItem(userLikesKey);
        if (storedUserLikes) {
          userLikes = JSON.parse(storedUserLikes);
          
          // Remove the article ID from user likes
          const articleIndex = userLikes.indexOf(articleId);
          if (articleIndex !== -1) {
            userLikes.splice(articleIndex, 1);
            localStorage.setItem(userLikesKey, JSON.stringify(userLikes));
            console.log(`Removed article ${articleId} from user ${userId}'s likes`);
          }
        }
      } catch (err) {
        console.error('Error updating user likes:', err);
      }
      
      return Promise.resolve({ success: true, message: 'Article unliked successfully' });
    } catch (err) {
      console.error('Error unliking article:', err);
      return Promise.reject(new Error('Failed to unlike article'));
    }
  },
  
  shareArticle: (articleId) => {
    // Mock implementation that adds a share to localStorage
    try {
      const userId = localStorage.getItem('userId');
      
      // Get stored shares
      let shares = [];
      const storedShares = localStorage.getItem('shares');
      if (storedShares) {
        shares = JSON.parse(storedShares);
      }
      
      // Add new share
      const newShare = {
        id: Date.now().toString(),
        articleId,
        userId,
        createdAt: new Date().toISOString()
      };
      
      shares.push(newShare);
      localStorage.setItem('shares', JSON.stringify(shares));
      
      return Promise.resolve({ data: newShare });
    } catch (err) {
      console.error('Error sharing article:', err);
      return Promise.reject(new Error('Failed to share article'));
    }
  },
  
  getLikes: (articleId) => {
    // Mock implementation that returns likes from localStorage
    try {
      const userId = localStorage.getItem('userId');
      const storedLikes = localStorage.getItem('likes');
      let likes = storedLikes ? JSON.parse(storedLikes) : [];
      
      // Filter likes by article ID
      likes = likes.filter(like => like.articleId === articleId);
      
      // Additional check for user-specific likes to ensure consistency
      try {
        const userLikesKey = `user_${userId}_likes`;
        const storedUserLikes = localStorage.getItem(userLikesKey);
        
        if (storedUserLikes) {
          const userLikes = JSON.parse(storedUserLikes);
          
          // Check if this article is in the user's likes but not in the main likes array
          if (userLikes.includes(articleId) && !likes.some(like => like.userId === userId)) {
            // Add it to the likes array
            const newLike = {
              id: Date.now().toString(),
              articleId,
              userId,
              createdAt: new Date().toISOString()
            };
            
            likes.push(newLike);
            
            // Update the main likes storage too
            const allLikes = storedLikes ? JSON.parse(storedLikes) : [];
            allLikes.push(newLike);
            localStorage.setItem('likes', JSON.stringify(allLikes));
            console.log(`Restored like for article ${articleId} from user ${userId}'s likes`);
          }
          
          // Check if this article is not in the user's likes but is in the main likes array
          if (!userLikes.includes(articleId) && likes.some(like => like.userId === userId)) {
            // Update user likes to include it
            userLikes.push(articleId);
            localStorage.setItem(userLikesKey, JSON.stringify(userLikes));
            console.log(`Added missing article ${articleId} to user ${userId}'s likes`);
          }
        }
      } catch (err) {
        console.error('Error checking user-specific likes:', err);
      }
      
      return Promise.resolve({ data: likes });
    } catch (err) {
      console.error('Error fetching likes from localStorage:', err);
      return Promise.reject(new Error('Failed to fetch likes'));
    }
  },
  
  getShares: (articleId) => {
    // Mock implementation that returns shares from localStorage
    try {
      const storedShares = localStorage.getItem('shares');
      let shares = storedShares ? JSON.parse(storedShares) : [];
      
      // Filter shares by article ID
      shares = shares.filter(share => share.articleId === articleId);
      
      return Promise.resolve({ data: shares });
    } catch (err) {
      console.error('Error fetching shares from localStorage:', err);
      return Promise.reject(new Error('Failed to fetch shares'));
    }
  },
};

// Channel API endpoints
export const channelAPI = {
  getAllChannels: () => api.get('/channels'),
  getChannelById: (id) => api.get(`/channels/${id}`),
  joinChannel: (channelId) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'reporter') {
      return Promise.reject(new Error('Unauthorized: Only reporters can join channels'));
    }
    return api.post(`/channels/${channelId}/join`);
  },
  leaveChannel: (channelId) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'reporter') {
      return Promise.reject(new Error('Unauthorized: Only reporters can leave channels'));
    }
    return api.post(`/channels/${channelId}/leave`);
  },
};

// User profile API endpoints
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (params) => {
    // Extract data and headers from params
    const data = params.data || params;
    
    // Get the current user ID
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return Promise.reject(new Error('No user ID found'));
    }
    
    // Get existing user profiles from localStorage or create new object
    let users = {};
    try {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }
    } catch (err) {
      console.error('Error parsing stored users:', err);
    }
    
    // Get current user's profile or create a new one
    let profileData = users[userId] || {};
    
    // Also check for backward compatibility
    if (Object.keys(profileData).length === 0) {
      try {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
          profileData = JSON.parse(storedProfile);
        }
      } catch (err) {
        console.error('Error parsing stored profile:', err);
      }
    }
    
    // Update profile data with new values
    if (data instanceof FormData) {
      // Handle FormData case
      const formEntries = {};
      for(const pair of data.entries()) {
        // Include all entries, including file entries
        formEntries[pair[0]] = pair[1];
      }
      
      profileData = {
        ...profileData,
        ...formEntries
      };
    } else {
      // Handle regular JSON data
      profileData = {
        ...profileData,
        ...data
      };
    }
    
    // Make sure image data is properly passed through
    if (data.image) {
      profileData.image = data.image;
    }
    
    if (data.backgroundImage) {
      profileData.backgroundImage = data.backgroundImage;
    }
    
    // Store the updated profile in the users object
    users[userId] = profileData;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Also update userProfile for backward compatibility
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // Update user name in localStorage for immediate reflection in UI
    if (profileData.name) {
      localStorage.setItem('userName', profileData.name);
    }
    
    // Return a resolved promise with a mock success response
    return Promise.resolve({
      data: {
        success: true,
        message: 'Profile updated successfully',
        userId: userId,
        ...profileData
      }
    });
  },
  getArticles: () => api.get('/users/articles'),
  getComments: () => api.get('/users/comments'),
  getLikedArticles: () => api.get('/users/likes'),
  getSharedArticles: () => api.get('/users/shares'),
};

export default api; 
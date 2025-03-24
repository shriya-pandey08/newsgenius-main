/**
 * Utility for synchronizing user data between logins
 * This ensures that user information like profile settings, comments, and likes
 * remains consistent across sessions
 */

/**
 * Main function to synchronize all user data
 * Call this when the app loads or after a user logs in
 */
const syncUserData = () => {
  try {
    const userId = localStorage.getItem('userId');
    
    // Only proceed if there's a logged-in user
    if (!userId) {
      console.log('No logged-in user found, skipping data sync');
      return;
    }
    
    console.log(`Syncing data for user ID: ${userId}`);
    
    // Sync user profile data
    syncUserProfile(userId);
    
    // Sync user likes data
    syncUserLikes(userId);
    
    // Sync user comments data
    syncUserComments(userId);
    
    console.log('User data synchronization complete');
  } catch (error) {
    console.error('Error syncing user data:', error);
  }
};

/**
 * Synchronize user profile data
 */
const syncUserProfile = (userId) => {
  try {
    // Get stored users from localStorage
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) return;
    
    const users = JSON.parse(storedUsers);
    
    // Find the current user
    const currentUser = users.find(user => user.id === userId);
    if (!currentUser) return;
    
    // Update user profile information in localStorage
    localStorage.setItem('userProfile', JSON.stringify(currentUser));
    localStorage.setItem('userName', currentUser.name || 'User');
    localStorage.setItem('userRole', currentUser.role || 'user');
    
    console.log('User profile synchronized successfully');
  } catch (error) {
    console.error('Error syncing user profile:', error);
  }
};

/**
 * Synchronize user likes data
 */
const syncUserLikes = (userId) => {
  try {
    // Get user-specific likes
    const userLikesKey = `user_${userId}_likes`;
    const userLikesData = localStorage.getItem(userLikesKey);
    
    if (!userLikesData) {
      console.log('No user-specific likes found');
      return;
    }
    
    const userLikes = JSON.parse(userLikesData);
    
    // Get all likes from localStorage
    const allLikesData = localStorage.getItem('article_likes');
    const allLikes = allLikesData ? JSON.parse(allLikesData) : {};
    
    // Merge user-specific likes with all likes
    let updated = false;
    Object.keys(userLikes).forEach(articleId => {
      if (!allLikes[articleId] || allLikes[articleId].indexOf(userId) === -1) {
        if (!allLikes[articleId]) {
          allLikes[articleId] = [];
        }
        
        if (allLikes[articleId].indexOf(userId) === -1) {
          allLikes[articleId].push(userId);
          updated = true;
        }
      }
    });
    
    // Update localStorage if changes were made
    if (updated) {
      localStorage.setItem('article_likes', JSON.stringify(allLikes));
      console.log('User likes synchronized successfully');
    } else {
      console.log('User likes already in sync');
    }
  } catch (error) {
    console.error('Error syncing user likes:', error);
  }
};

/**
 * Synchronize user comments data
 */
const syncUserComments = (userId) => {
  try {
    // Get user-specific comments
    const userCommentsKey = `user_${userId}_comments`;
    const userCommentsData = localStorage.getItem(userCommentsKey);
    
    if (!userCommentsData) {
      console.log('No user-specific comments found');
      return;
    }
    
    const userComments = JSON.parse(userCommentsData);
    
    // Get all comments from localStorage
    const allCommentsData = localStorage.getItem('comments');
    const allComments = allCommentsData ? JSON.parse(allCommentsData) : [];
    
    // Check each user comment to see if it's in the main comments list
    let commentsToAdd = [];
    userComments.forEach(userComment => {
      const exists = allComments.some(comment => 
        comment.id === userComment.id && comment.userId === userId
      );
      
      if (!exists) {
        commentsToAdd.push(userComment);
      }
    });
    
    // Update localStorage if changes were made
    if (commentsToAdd.length > 0) {
      allComments.push(...commentsToAdd);
      localStorage.setItem('comments', JSON.stringify(allComments));
      console.log(`Added ${commentsToAdd.length} user comments to main comments list`);
    } else {
      console.log('User comments already in sync');
    }
  } catch (error) {
    console.error('Error syncing user comments:', error);
  }
};

export default syncUserData; 